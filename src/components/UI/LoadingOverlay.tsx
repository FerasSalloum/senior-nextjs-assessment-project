"use client";

import React, { useState, useEffect } from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
}

const LoadingOverlay = ({
  isLoading,
  text = "جاري التحميل",
}: LoadingOverlayProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300"
      dir="rtl"
    >
      <div className="flex flex-col items-center gap-5 p-8 rounded-2xl bg-slate-900/80 border border-slate-700/50 shadow-2xl">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-14 h-14 rounded-full bg-blue-500/20 animate-ping" />
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-slate-100 tracking-wide flex items-center justify-center gap-1">
            <span>{text}</span>
            <span className="inline-block w-6 text-right font-mono text-blue-400 text-xl font-bold">
              {dots}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoadingOverlay;
