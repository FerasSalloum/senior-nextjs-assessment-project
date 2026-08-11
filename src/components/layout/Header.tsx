"use client";
import { LayoutDashboard, LogOut, Menu, Settings, User } from "lucide-react";
import {  useState } from "react";
import ThemeToggle from "../UI/ThemeToggle";
import Link from "next/link";
import MainButoon from "../UI/MainButoon";
import { signOut } from "next-auth/react";

const Header = ({
  initialUser,
}: {
  initialUser: {
    name: string | null | undefined;
    email: string | null | undefined;
  } | null;
}) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string | null | undefined;
    email: string | null | undefined;
  } | null>(initialUser);

  const handelLogout = async () => {
    try {
      setSideBarOpen(false);
      setUser(null);
      await signOut({
        callbackUrl: "/login",
      });
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <header className="bg-slate-300 dark:bg-slate-900 text-black dark:text-white border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 transition-colors h-16">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => {
                setSideBarOpen(!sideBarOpen);
              }}
              className="p-2 rounded-xl text-gray-800 dark:text-slate-300 hover:bg-gray-300 hover:text-white transition-colors"
              aria-label="فتح القائمة الجانبية"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-xl font-bold tracking-wide dark:text-cyan-200 text-cyan-700 dark:hover:text-cyan-100 hover:text-cyan-600 transition-colors"
            >
              JEST DOET
            </Link>
          </div>
        </div>
      </header>
      {sideBarOpen && (
        <div className="inset-0 z-20 flex ">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity z-20"
            onClick={() => {
              setSideBarOpen(false);
            }}
          />
          <aside className="p-4 border-b dark:border-slate-800 flex items-center justify-start gap-3 z-30 flex-col dark:bg-slate-900 bg-slate-300 h-[calc(100vh-64px)] fixed">
            <div className="flex gap-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex flex-col overflow-hidden text-right">
                  <span className="text-sm font-bold dark:text-white text-black truncate">
                    {user?.name}
                  </span>
                  <span className="text-xs dark:text-slate-400 text-black truncate">
                    {user?.email}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-10 h-10 ounded-xl dark:bg-cyan-950 dark:border-cyan-800 flex items-center justify-center dark:text-cyan-300 text-cyan-900 shrink-0">
                  <User className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <Link
                href="/"
                onClick={() => {
                  setSideBarOpen(false);
                }}
                className=""
              >
                <MainButoon text="الرئيسية" icon={<LayoutDashboard />} />
                <span></span>
              </Link>

              <Link
                href="/profile"
                onClick={() => {
                  setSideBarOpen(false);
                }}
              >
                <MainButoon text="الملف الشخصي" icon={<Settings />} />
                <span></span>
              </Link>
            </div>
            <div
              className="p-4 border-t dark:border-slate-800 border-slate-700 dark:bg-slate-950 bg-slate-700 cursor-pointer rounded-xl w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 py-2-5 text-sm font-medium transition-colors mt-auto"
              onClick={handelLogout}
            >
              <LogOut className="2-4 h-4" />
              <span>تسجيل الخروج</span>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
