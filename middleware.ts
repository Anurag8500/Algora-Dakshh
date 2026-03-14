import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect dashboard routes
  const isDashboardRoute = pathname.startsWith("/user-dashboard") || pathname.startsWith("/developer-dashboard");
  
  if (!isDashboardRoute) {
    return NextResponse.next();
  }

  const walletAddress = request.cookies.get("walletAddress")?.value;
  const userRole = request.cookies.get("userRole")?.value;
  const onboardingCompleted = request.cookies.get("onboardingCompleted")?.value === "true";

  // 1. Verify wallet exists
  if (!walletAddress) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Check if role is missing
  if (!userRole) {
    return NextResponse.redirect(new URL("/select-role", request.url));
  }

  // 3. Check if profile is incomplete
  if (!onboardingCompleted) {
    return NextResponse.redirect(new URL("/complete-profile", request.url));
  }

  // 4. Check for correct role and dashboard
  if (pathname.startsWith("/user-dashboard") && userRole !== "user") {
    return NextResponse.redirect(new URL("/developer-dashboard", request.url));
  }

  if (pathname.startsWith("/developer-dashboard") && userRole !== "developer") {
    return NextResponse.redirect(new URL("/user-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user-dashboard/:path*",
    "/developer-dashboard/:path*",
  ],
};
