import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // Not signed in: go to Sign In, then come back to this page
  if (!session) {
    const { pathname, search } = request.nextUrl;
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect', `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: ['/services/:id', '/dashboard/:path*', '/payment/:path*'],
};
