import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "img-src 'self' data: blob: https:",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'self'"
].join('; ');

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('Content-Security-Policy', csp);

  if (req.nextUrl.pathname.startsWith('/(admin)') || req.nextUrl.pathname.startsWith('/admin')) {
    const token = await getToken({ req, secret: process.env.SESSION_SECRET });
    if (!token) {
      const login = new URL('/en', req.url);
      return NextResponse.redirect(login);
    }
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|site.webmanifest).*)']
};
