import {
  CreateTempUserMutation,
  CreateTempUserMutationVariables,
  LoginQuery,
  LoginQueryVariables,
} from '@/types/gql/graphql';
import { GraphQLClient, gql } from 'graphql-request';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
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
      try {
        if (!account?.id_token || !user.email) return false;

        const client = new GraphQLClient(process.env.BACKEND_URL);

        try {
          const data = await client.request<LoginQuery, LoginQueryVariables>(
            loginQuery,
            {
              token: account.id_token,
            },
          );
          if (data.login) {
            user.accessToken = data.login;
            return true;
          }
        } catch (error) {
          const tempToken = await client.request<
            CreateTempUserMutation,
            CreateTempUserMutationVariables
          >(createTempUserMutation, { mailaddress: user.email });

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
