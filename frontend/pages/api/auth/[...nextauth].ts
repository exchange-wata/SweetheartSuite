import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        // TODO バックエンドAPIを呼び出してJWTを取得
        const response = { jwt: 'jwt-token' };
        user.accessToken = response.jwt;
        return true;
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
  },
  secret: process.env.SECRET,
});
