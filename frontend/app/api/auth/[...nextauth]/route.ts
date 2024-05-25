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
import { Effect, pipe } from 'effect';

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

      const login = pipe(
        Effect.succeed(
          account?.provider === 'credentials'
            ? cookies().get('googleToken')?.value
            : account?.id_token,
        ),
        Effect.flatMap((token) =>
          token
            ? Effect.succeed(token)
            : Effect.fail({ _tag: 'No token' } as const),
        ),
        Effect.flatMap((token) =>
          Effect.tryPromise({
            try: () =>
              client.request<LoginQuery, LoginQueryVariables>(loginQuery, {
                token,
              }),
            catch: () => ({ _tag: 'User Not Found' } as const),
          }),
        ),
        Effect.map(({ login }) => {
          user.accessToken = login;
          return true;
        }),
      );

      const createTempUser = Effect.Do.pipe(
        Effect.bind('mailaddress', () =>
          user.email
            ? Effect.succeed(user.email)
            : Effect.fail({ _tag: 'No email' } as const),
        ),
        Effect.bind('tempToken', ({ mailaddress }) =>
          Effect.tryPromise(() =>
            client.request<
              CreateTempUserMutation,
              CreateTempUserMutationVariables
            >(createTempUserMutation, { mailaddress }),
          ),
        ),
        Effect.bind('googleToken', () =>
          account?.id_token
            ? Effect.succeed(account.id_token)
            : Effect.fail({ _tag: 'No Google Token' } as const),
        ),
        Effect.let('signUpURL', ({ tempToken, googleToken }) => {
          cookies().set('googleToken', googleToken, {
            path: '/',
            maxAge: 10 * 60,
          });

          return `/signUp?tempToken=${tempToken?.createTempUser.token ?? ''}`;
        }),
      ).pipe(
        Effect.map(({ signUpURL }) => signUpURL),
        Effect.catchTags({
          'No email': () => Effect.succeed(false),
          'No Google Token': () => Effect.succeed(false),
        }),
      );

      const result = pipe(
        login,
        Effect.catchTags({
          'No token': () => Effect.succeed(false),
          'User Not Found': () => createTempUser,
        }),
      );

      return Effect.runPromise(result);
    },
    async jwt({ token, user }) {
      // 初回サインイン時にJWTをトークンに追加
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token.accessToken !== 'string')
        throw new Error('accessToken is not a string');

      // セッションにJWTを追加
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect() {
      return '/home';
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
