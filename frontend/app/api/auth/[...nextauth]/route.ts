import {
  CreateTempUserMutation,
  CreateTempUserMutationVariables,
  LoginQuery,
  LoginQueryVariables,
} from '@/types/gql/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { pipe } from 'effect';
import {
  gen,
  succeed,
  fail,
  tryPromise,
  catchTags,
  runPromise,
} from 'effect/Effect';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: 'ID', type: 'text' },
      },
      authorize: (credential) => {
        if (!credential?.id) return null;
        return {
          id: credential.id,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    async signIn({ user, account }) {
      const client = new GraphQLClient(process.env.BACKEND_URL);

      const loginUser = gen(function* () {
        const nullableToken =
          account?.provider === 'credentials'
            ? cookies().get('googleToken')?.value
            : account?.id_token;

        const token = yield* nullableToken
          ? succeed(nullableToken)
          : fail({ _tag: 'No token' } as const);

        const { login } = yield* tryPromise({
          try: () =>
            client.request<LoginQuery, LoginQueryVariables>(loginQuery, {
              token,
            }),
          catch: () => ({ _tag: 'User Not Found' } as const),
        });

        cookies().set('authorization', `Bearer ${login}`);

        return true;
      });

      const createTempUser = gen(function* () {
        const mailaddress = yield* user.email
          ? succeed(user.email)
          : fail({ _tag: 'No email' } as const);

        const { createTempUser } = yield* tryPromise(
          (): Promise<CreateTempUserMutation> =>
            client.request<
              CreateTempUserMutation,
              CreateTempUserMutationVariables
            >(createTempUserMutation, { mailaddress }),
        );

        const googleToken = yield* account?.id_token
          ? succeed(account.id_token)
          : fail({ _tag: 'No Google Token' } as const);

        cookies().set('googleToken', googleToken, {
          path: '/',
          maxAge: 10 * 60,
        });

        return `/signUp?tempToken=${createTempUser.token}`;
      }).pipe(
        catchTags({
          'No email': () => succeed(false),
          'No Google Token': () => succeed(false),
        }),
      );

      const result = pipe(
        loginUser,
        catchTags({
          'No token': () => succeed(false),
          'User Not Found': () => createTempUser,
        }),
      );

      return runPromise(result);
    },
    async redirect() {
      return '/home';
    },
  },
  events: {
    async signOut() {
      cookies().set('authorization', '', { maxAge: 0 });
    },
  },
});

export { handler as GET, handler as POST };

const loginQuery = gql`
  query Login($token: String!) {
    login(token: $token)
  }
`;

const createTempUserMutation = gql`
  mutation CreateTempUser($mailaddress: String!) {
    createTempUser(mailaddress: $mailaddress) {
      token
    }
  }
`;
