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

export const AUTHORIZATION = 'authorization';

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
            cookies().set(AUTHORIZATION, `Bearer ${data.login}`);
            return true;
          }
        } catch (error) {
          if (!user.email || !account.id_token) return false;

          const tempToken = await client.request<
            CreateTempUserMutation,
            CreateTempUserMutationVariables
          >(createTempUserMutation, { mailaddress: user.email });

          cookies().set('googleToken', account.id_token, {
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
    async redirect() {
      return '/home';
    },
  },
  events: {
    async signOut() {
      cookies().set(AUTHORIZATION, '', { maxAge: 0 });
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
