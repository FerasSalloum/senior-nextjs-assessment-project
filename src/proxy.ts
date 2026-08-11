import { auth } from "@/auth";
import { NextResponse } from "next/server";
// استبدل المسار أدناه بمسار ملف إعدادات NextAuth الخاص بك (مثلاً src/auth.ts)

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  
  // خاصية req.auth يوفرها NextAuth تلقائياً وتحتوي على بيانات المستخدم إذا كان مسجلاً للدخول
  const isLoggedIn = !!req.auth; 

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isApiRoute = pathname.startsWith("/api");

  // --- 1. حالة المستخدم غير مسجل الدخول ---
  if (!isLoggedIn) {
    if (isAuthPage) {
      return NextResponse.next(); // السماح بفتح صفحات الدخول والتسجيل
    }
    
    if (isApiRoute) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }
    
    // توجيه المستخدم لصفحة الدخول إذا حاول زيارة صفحة محمية
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // --- 2. حالة المستخدم مسجل الدخول بالفعل ---
  if (isLoggedIn) {
    // إذا حاول زيارة صفحة الدخول أو التسجيل، أعده إلى الصفحة الرئيسية
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // السماح بالمرور لأي صفحة أخرى
  return NextResponse.next();
});

// تحديد المسارات التي يشتغل عليها الـ Proxy
export const config = {
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