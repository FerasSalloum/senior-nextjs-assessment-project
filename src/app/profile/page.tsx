"use client";

import React from "react";
import { User, Mail, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react"; // أو قم باستيراد دالة تسجيل الخروج الخاصة بك
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
      toast.success("تم تسجيل الخروج بنجاح")
    } catch (error) {
      toast.error(String(error))
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 transition-colors"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center gap-6">
        
        <div className="w-20 h-20 rounded-2xl dark:bg-cyan-950 dark:border-cyan-800 bg-cyan-100 border border-cyan-300 flex items-center justify-center dark:text-cyan-300 text-cyan-900 shrink-0 shadow-inner">
          <User className="w-10 h-10" />
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold dark:text-white text-black">
            الملف الشخصي
          </h1>
        </div>

        <div className="w-full flex flex-col gap-3">
          
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-300/60 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-slate-400/20 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            </div>
            <div className="flex flex-col overflow-hidden text-right">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                الاسم
              </span>
              <span className="text-sm font-bold dark:text-white text-black truncate">
                {user?.name || "اسم المستخدم"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-300/60 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-slate-400/20 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            </div>
            <div className="flex flex-col overflow-hidden text-right">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                البريد الإلكتروني
              </span>
              <span className="text-sm font-bold dark:text-white text-black truncate">
                {user?.email || "user@example.com"}
              </span>
            </div>
          </div>

        </div>

        <div
          onClick={handleLogout}
          className="p-3.5 border border-red-500/30 dark:border-red-900/50 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-950/30 dark:hover:bg-red-900/40 cursor-pointer rounded-xl w-full flex items-center justify-center gap-2 text-red-500 dark:text-red-400 font-semibold text-sm transition-all duration-200 mt-2 active:scale-[0.98]"
        >
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </div>

      </div>
    </div>
  );
}