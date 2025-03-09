import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole } from './types/UserRole';

export async function middleware(req: NextRequest) {
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
  const path = req.nextUrl.pathname;

  const authRoutes = ['/admin', '/moderator', '/profile', '/api/protected'];

  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  if (!isAuthRoute) {
    return NextResponse.next();
  }

  if (!token) {
    if (path.startsWith('/api/')) {
      return NextResponse.json(
        {error: 'Kimlik doğrulaması gerekli'},
        {status: 401}
      );
    }

    const loginUrl = new URL('/auth/signin', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = token.role as UserRole;

  // admin yolları koruma
  if (path.startsWith('/admin') && userRole !== UserRole.ADMIN) {
    return unauthorized(req, path);
  }

  // modator yolları koruma
  if (path.startsWith('/moderator') && ![UserRole.ADMIN, UserRole.MODERATOR].includes(userRole)) {
    return unauthorized(req, path);
  }

  // api yolları için rol kontrolü
  if (path.startsWith('/api/protected/admin') && userRole !== UserRole.ADMIN) {
    return NextResponse.json(
      {error: 'Bu işlem için admin yetkisi gereklidir'},
      {status: 403}
    );
  }

  if (path.startsWith('/api/protected/moderator') && ![UserRole.ADMIN, UserRole.MODERATOR].includes(userRole)) {
    return NextResponse.json(
      {error: 'Bu işlem için moderator yetkisi gereklidir'},
      {status: 403}
    );
  }

  return NextResponse.next();
}

function unauthorized(req: NextRequest, path: string) {
  if (path.startsWith('/api/')) {
    return NextResponse.json(
      {error: 'Yetkisiz erişim'},
      {status: 403}
    );
  }

  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/moderator/:path*',
    '/profile/:path*',
    '/api/protected/:path*',
  ],
};