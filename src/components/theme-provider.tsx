"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps as NextThemesProviderProps } from "next-themes";
import type { Attribute } from "next-themes";

export interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ 
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
