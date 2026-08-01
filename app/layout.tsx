// src/app/layout.tsx
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
// import { Header } from "@/components/layout/Header";
// import { Footer } from "@/components/layout/Footer";
import ThemProvider from "@/src/components/ThemProvider"; // استدعاء المزود
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import { getCurrentUser } from "@/src/lib/getuser";

const cairo = Cairo({ subsets: ["arabic"] });
const user = await getCurrentUser()
export const metadata: Metadata = {
  title: "نظام إدارة المهام الاحترافي",
  description: "تطبيق لتنظيم وتتبع المشاريع والمهام بكفاءة عالية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200`}
      >
        <ThemProvider>
          <Header initialUser={user}/>
          <main className="h-[calc(100vh-128px)] w-full">{children}</main>
          <Footer />
        </ThemProvider>
      </body>
    </html>
  );
}
