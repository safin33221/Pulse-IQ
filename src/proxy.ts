import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("access_token")?.value;

    const isProtectedRoute = PROTECTED_ROUTES.some(
        (route) =>
            pathname === route || pathname.startsWith(`${route}/`),
    );

    // Not authenticated → dashboard → /
    if (isProtectedRoute && !accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Authenticated user → / → dashboard
    if (pathname === "/" && accessToken) {
        return NextResponse.redirect(
            new URL("/feed", request.url),
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/feed/:path*"],
};