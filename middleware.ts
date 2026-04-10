import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Paths that require no authentication
  if (pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/api/auth')) {
    if (token) {
      // If authenticating and trying to access login/register, redirect to dynamic dashboard
      return NextResponse.redirect(new URL(`/${(token.role as string).toLowerCase()}`, req.url));
    }
    return NextResponse.next();
  }

  // Paths requiring authentication
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = (token.role as string).toLowerCase();

  // Role-based route protection
  const roles = ['author', 'publisher', 'editor', 'admin', 'reader'];
  
  for (const role of roles) {
    if (pathname.startsWith(`/${role}`) && userRole !== role) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/author/:path*', '/publisher/:path*', '/editor/:path*', '/admin/:path*', '/reader/:path*', '/login', '/register'],
};
