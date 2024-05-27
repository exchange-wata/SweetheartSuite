import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({
      token,
      req: {
        nextUrl: { pathname },
      },
    }) {
      if (token) return true;

      if (
        pathname.includes('/api/auth') ||
        pathname === '/' ||
        pathname === '/signIn' ||
        pathname === '/signUp'
      )
        return true;

      return false;
    },
  },
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
