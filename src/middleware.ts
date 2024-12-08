import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookie
  const token = request.cookies.get('token');

  // Izinkan akses ke halaman register jika token tidak ada
  if (!token && request.nextUrl.pathname === '/register') {
    return NextResponse.next();
  }

  // Redirect ke halaman login jika tidak ada token dan bukan halaman login atau register
  if (!token && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/products/:path*', '/login', '/register'],
};

