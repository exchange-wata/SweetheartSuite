import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token')?.value;
  const { pathname } = req.nextUrl;

  if (
    pathname.includes('/api/auth') ||
    pathname === '/signIn' ||
    pathname === '/signUp' ||
    token
  ) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/' && pathname !== '/signIn') {
    const url = req.nextUrl.clone();
    url.pathname = '/signIn';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
