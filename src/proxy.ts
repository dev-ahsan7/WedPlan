import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth';

const roleDashboards = ['admin', 'vendor', 'customer'];

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Not signed in: go to Sign In, then come back to this page
  if (!session) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect', `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  // Blocked users can't use any private page
  if (session.user.isBlocked) {
    return NextResponse.redirect(new URL('/blocked', request.url));
  }

  // /dashboard/vendor, /dashboard/admin and /dashboard/customer belong to one role each.
  // Changing the URL by hand sends the user back to their own dashboard.
  const section = pathname.split('/')[2];
  if (roleDashboards.includes(section) && section !== session.user.role) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/services/:id', '/dashboard/:path*', '/payment/:path*'],
};
