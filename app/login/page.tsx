"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handelRegister = async () => {
    try {
      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (loginResult?.error) {
        console.log(loginResult?.error);
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center p-10 bg-[#0B0F19] scroll-auto">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-[#131825] border border-slate-800 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
          <span className="text-cyan-400 font-black text-[10px] tracking-widest leading-tight text-center">
            JEST
            <br />
            DOET
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">انشاء حساب</h1>
        <p className="text-sm text-slate-400">
          مرحباً بك في منصة المهام الفاخرة
        </p>
      </div>
      <div className="w-full max-w-md bg-[#131825]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handelRegister();
          }}
        >
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400 text-right px-1">
              الايميل
            </label>
            <div className="relative flex items-center bg-[#1A202C] rounded-xl border border-slate-800 focus-within:border-cyan-500/50 transition-colors overflow-hidden">
              <div className="absolute right-4 text-slate-500 pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="name@company.com"
                dir="ltr"
                className="w-full bg-transparent py-3.5 pl-4 pr-11 text-sm text-slate-200 placeholder-slate-500 outline-none text-left"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="space-y-2 pb-2">
            <label className="block text-xs font-semibold text-slate-400 text-right px-1">
              كلمة المرور
            </label>
            <div className="relative flex items-center bg-[#1A202C] rounded-xl border border-slate-800 focus-within:border-cyan-500/50 transition-colors overflow-hidden">
              <div className="absolute right-4 text-slate-500 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                dir="ltr"
                className="w-full bg-transparent py-3.5 pl-11 pr-11 text-sm text-slate-200 placeholder-slate-500 outline-none text-left tracking-widest font-sans"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 text-slate-500 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-200 hover:bg-cyan-300 text-slate-950 font-bold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(34,211,238,0.05)] hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          >
            <span>تسجيل الدخول</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="mt-8 text-xs font-medium">
        <span className="text-slate-400">ليس لديك حساب؟ </span>
        <Link
          href="/register"
          className="text-white hover:text-cyan-400 transition-colors"
        >
          انشاء حساب
        </Link>
      </div>
    </div>
  );
}
