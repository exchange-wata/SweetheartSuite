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
import {
  gen,
  succeed,
  fail,
  tryPromise,
  catchTags,
  runPromise,
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
      return runPromise(
        gen(function* () {
          if (account?.provider === 'google')
            return yield* loginByMailaddress(user.email!).pipe(
              catchTags({
                'User Not Found': () => {
                  cookies().set(GOOGLE_TOKEN_COOKIE, account.id_token!, {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: true,
                    maxAge: 10 * 60,
                  });
                  return createTempUser(user.email!);
                },
              }),
            );

          const _ = cookies().get(GOOGLE_TOKEN_COOKIE)?.value;
          const googleToken = yield* _
            ? succeed(_)
            : fail({ _tag: 'no google token' } as const);

          const mailaddress = yield* veryfiyGoogleToken(googleToken);
          return yield* loginByMailaddress(mailaddress);
        }),
      );
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

    cookies().set('authorization', `Bearer ${login}`, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });

    return true;
  });

const veryfiyGoogleToken = (token: string) =>
  gen(function* () {
    const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = yield* tryPromise(() =>
      googleClient.verifyIdToken({
        idToken: token,
      }),
    );

    const mailaddress = ticket.getPayload()?.email;

    return yield* mailaddress
      ? succeed(mailaddress)
      : fail({ _tag: 'fail verify google token' } as const);
  });

const createTempUser = (mailaddress: string) =>
  gen(function* () {
    const { createTempUser } = yield* tryPromise(
      (): Promise<CreateTempUserMutation> =>
        client.request<CreateTempUserMutation, CreateTempUserMutationVariables>(
          createTempUserMutation,
          { mailaddress },
        ),
    );

    return `/signUp?tempToken=${createTempUser.token}`;
  });

const GOOGLE_TOKEN_COOKIE = 'googleToken' as const;

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
