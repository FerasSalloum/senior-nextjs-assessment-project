"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import React from "react";

const ThemProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  );
};

export default ThemProvider;
