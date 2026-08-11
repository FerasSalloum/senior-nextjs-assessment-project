"use client"
import { ReactNode } from "react";

const DarkButoon = ({
  text,
  icon,
}: {
  text: string | null;
  icon: ReactNode;
}): ReactNode => {
  return (
    <div
      className="grow p-4 space-y-2 overflow-auto"
    >
      <div className="w-full sm:w-auto px-6 py-3 rounded-xl dark:text-slate-300 dark:hover:text-white hover:bg-slate-800/60 font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer">
        {icon}
        {text && <span>{text}</span>}
      </div>
    </div>
  );
};

export default DarkButoon;
