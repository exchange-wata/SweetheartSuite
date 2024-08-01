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
  andThen,
} from 'effect/Effect';
import { OAuth2Client } from 'google-auth-library';

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
    signIn: '/',
  },
  callbacks: {
    async signIn({ user, account }) {
      const client = new GraphQLClient(process.env.BACKEND_URL);

      const loginByMailaddress = (mailaddress: string) =>
        gen(function* () {
          const { login } = yield* tryPromise({
            try: () =>
              client.request<LoginQuery, LoginQueryVariables>(loginQuery, {
                mailaddress,
              }),
            catch: () => ({ _tag: 'User Not Found' } as const),
          });

          cookies().set('authorization', `Bearer ${login}`);

          return true;
        });

      const login = gen(function* () {
        if (account?.provider === 'google') {
          return yield* loginByMailaddress(user.email ?? '');
        }

        const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const mailaddress = yield* tryPromise(() =>
          googleClient.verifyIdToken({
            idToken: cookies().get('googleToken')?.value ?? '',
          }),
        ).pipe(andThen((ticket) => ticket.getPayload()?.email ?? ''));

        return yield* loginByMailaddress(mailaddress);
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
        login,
        catchTags({
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
  query Login($mailaddress: String!) {
    login(mailaddress: $mailaddress)
  }
`;

const createTempUserMutation = gql`
  mutation CreateTempUser($mailaddress: String!) {
    createTempUser(mailaddress: $mailaddress) {
      token
    }
  }
`;
