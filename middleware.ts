import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // Redirect to dashboard if logged in user tries to access login or register pages
  if (token && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect to login if unauthenticated user tries to access dashboard
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
