import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes EXCEPT the login page
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    
    const sessionCookie = request.cookies.get('admin_session');
    
    // Check if cookie exists and matches our secret
    const secret = process.env.SESSION_SECRET || 'fallback-secret';
    
    if (!sessionCookie || sessionCookie.value !== secret) {
      // Not authenticated, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
