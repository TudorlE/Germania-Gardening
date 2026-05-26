import { NextResponse, type NextRequest } from 'next/server';

const defaultLocale = 'de';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    return;
  }
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
