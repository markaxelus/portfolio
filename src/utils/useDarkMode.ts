import { useEffect, useState, useCallback } from "react";

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggle = useCallback(() => setIsDarkMode((prev) => !prev), []);

  return { isDarkMode, toggle } as const;
}
