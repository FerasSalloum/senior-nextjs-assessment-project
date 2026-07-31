"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"
const ThemeToggle = () => {
    const {theme,setTheme}=useTheme();
    const isDark = theme === "dark"
    const toggleTheme = ()=>{
        setTheme(isDark?"ligth":"dark")
    }
  return (
    <button
    onClick={toggleTheme}
    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
      title={isDark ? "التحويل للمظهر الفاتح" : "التحويل للمظهر الداكن"}
      aria-label="تبديل المظهر"
    >
        {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  )
}

export default ThemeToggle
