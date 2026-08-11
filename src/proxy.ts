import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isApiRoute = pathname.startsWith("/api");

  // --- 1. حالة عدم وجود Token ---
  if (!token) {
    if (isAuthPage) {
      return NextResponse.next(); // السماح بفتح صفحات الدخول والتسجيل
    }
    
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }
    
    // إذا حاول زيارة صفحة عادية (مثل الرئيسية أو المشاريع) -> تحويله لصفحة الدخول
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // --- 2. حالة وجود Token (يجب التحقق منه) ---
  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const Key = new TextEncoder().encode(secretKey);
    await jwtVerify(token, Key);

    // التوكن سليم: إذا حاول فتح صفحة الدخول، أعده للرئيسية
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // السماح بالمرور لأي صفحة أخرى
    return NextResponse.next();
    
  } catch (error) {
    console.error("Proxy Token Error:", error);

    // إذا فشل التحقق (التوكن منتهي أو مزيف)
    if (isApiRoute) {
      const response = NextResponse.json(
        { error: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
      // مسح الكوكي التالف
      response.cookies.delete("token");
      return response;
    }

    // إذا كانت صفحة ويب، قم بمسح التوكن التالف وتحويله لتسجيل الدخول
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
};

export const config = {
  // أضفت لك مسارات المشاريع لضمان حمايتها
  matcher: [
    "/",
    "/project/:path*",
    "/profile/:path*",
    "/api/projects/:path*",
    "/api/tasks/:path*",
    "/login",
    "/register"
  ],
};