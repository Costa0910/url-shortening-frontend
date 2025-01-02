"use client";

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// import React, { createContext, useContext, useState, useEffect } from "react";

// type Theme = "light" | "dark" | "system";

// interface ThemeContextProps {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
// }

// const ThemeContext = createContext<ThemeContextProps>({
//   theme: "system",
//   setTheme: () => {},
// });

// export const ThemeProvider = ({
//   attribute,
//   defaultTheme,
//   enableSystem,
//   children,
// }: {
//   attribute: string;
//   defaultTheme: Theme;
//   enableSystem: boolean;
//   children: React.ReactNode;
// }) => {
//   const [mounted, setMounted] = useState(false);
//   const [theme, setTheme] = useState<Theme>(defaultTheme);

//   // Only run after mounting to avoid SSR issues
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;
    
//     const storedTheme = localStorage.getItem("theme") as Theme;
//     if (storedTheme) {
//       setTheme(storedTheme);
//     }
//   }, [mounted]);

//   useEffect(() => {
//     if (!mounted || !enableSystem) return;

//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = (event: MediaQueryListEvent) => {
//       setTheme(event.matches ? "dark" : "light");
//     };
    
//     if (!localStorage.getItem("theme")) {
//       setTheme(mediaQuery.matches ? "dark" : "light");
//     }

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, [enableSystem, mounted]);

//   useEffect(() => {
//     if (attribute === "class") {
//       document.documentElement.setAttribute("color-scheme", theme);
//       document.documentElement.setAttribute(attribute, theme);
//       localStorage.setItem("theme", theme);
//     }
//   }, [theme, attribute]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
