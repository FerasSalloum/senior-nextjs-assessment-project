import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthPage = pathname == "/login" || pathname == "/register";
  const isApiRoute = pathname.startsWith("/api") || pathname == "/";
  if (!token) {
    if (isAuthPage) {
      return NextResponse.next();
    }
    if (isApiRoute) {
      // return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (token) {
    try {
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
      const Key = new TextEncoder().encode(secretKey);
      await jwtVerify(token, Key);
      if (isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    } catch (error) {
      console.error("❌ Proxy Token Error:", error);
      return NextResponse.json(
        { error: "Unauthorized: Invalid or expired token" },
        { status: 401 },
      );
    }
  }
};
export const config = {
  matcher: ["/","/api/projects/:path*", "/api/tasks/:path*", "/login", "/register"],
};
