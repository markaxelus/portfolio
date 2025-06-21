import { useEffect, useState, useCallback } from 'react';

/**
 * useDarkMode – simple hook to keep a single source-of-truth for theme.
 * It returns the current boolean state and a toggle callback.
 */
export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount: read saved value or system preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = storedTheme ? storedTheme === 'dark' : prefersDark;
    setIsDarkMode(enabled);
  }, []);

  // Whenever state changes: reflect in DOM + storage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
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