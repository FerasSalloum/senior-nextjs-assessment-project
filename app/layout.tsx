import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import ThemProvider from "@/src/components/ThemProvider"; // استدعاء المزود
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import { auth } from "@/auth";

const cairo = Cairo({ subsets: ["arabic"] });
export const metadata: Metadata = {
  title: "نظام إدارة المهام ",
  description: "تطبيق لتنظيم وتتبع المشاريع والمهام بكفاءة ",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;
  const initialUser = { name: user?.name, email: user?.email };
  
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 scroll-smooth `}
      >
        <ThemProvider>
          <Header initialUser={initialUser} />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </ThemProvider>
      </body>
    </html>
  );
}
