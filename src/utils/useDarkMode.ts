import { useEffect, useState, useCallback } from 'react';

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedTheme = localStorage.getItem('theme');
    setIsDarkMode(storedTheme === 'dark');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    const applyTransition = () => {
      root.classList.add('theme-transition');
      window.setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 300); // duration should match CSS
    };

    applyTransition();

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Toggle callback kept stable
  const toggle = useCallback(() => setIsDarkMode((v) => !v), []);

  return { isDarkMode, toggle } as const;
} 