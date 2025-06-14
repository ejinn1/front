import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)',
  ],
};

const AUTH_PAGES = ['/signup', '/signin'];

export const middleware = async (request: NextRequest) => {
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;

  const token = cookies.get('token');

  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
};
