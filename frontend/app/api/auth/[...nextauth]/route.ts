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
      if (!user || !account) return false;

      try {
        const token =
          account.provider === 'credentials'
            ? cookies().get('googleToken')?.value
            : account.id_token;
        if (!token) return false;

        const client = new GraphQLClient(process.env.BACKEND_URL);

        try {
          const data = await client.request<LoginQuery, LoginQueryVariables>(
            loginQuery,
            {
              token,
            },
          );
          if (data.login) {
            user.accessToken = data.login;
            return true;
          }
        } catch (error) {
          if (!user.email || !account.id_token) return false;

          const tempToken = await client.request<
            CreateTempUserMutation,
            CreateTempUserMutationVariables
          >(createTempUserMutation, { mailaddress: user.email });

          cookies().set('googleToken', account.id_token, {
            path: '/',
            maxAge: 10 * 60,
          });

          return `/signUp?tempToken=${tempToken?.createTempUser.token ?? ''}`;
        }

        return false;
      } catch (error) {
        console.error('Error during sign-in', error);
        return false;
      }
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
