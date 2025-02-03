import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const isAuthPage = request.nextUrl.pathname.startsWith('/login');
    const isProjectPage = request.nextUrl.pathname.startsWith('/projects/');

    if (isAuthPage) {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    if (!token && (request.nextUrl.pathname.startsWith('/dashboard') || isProjectPage)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Handle project page rewriting
    if (isProjectPage && token) {
        // Extract project ID from URL
        const projectId = request.nextUrl.pathname.split('/projects/')[1];

        // Create a new response that rewrites to dashboard
        const response = NextResponse.rewrite(new URL('/dashboard', request.url));

        // Set a custom header to pass the project ID
        response.headers.set('x-project-id', projectId);

        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/projects/:path*']
};