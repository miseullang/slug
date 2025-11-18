"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export function useThemeMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsReady(true);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setIsDarkMode(stored === "dark");
    } else {
      setIsDarkMode(window.document.documentElement.classList.contains("dark"));
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode, isReady]);

  const setTheme = useCallback((value: boolean) => {
    setIsDarkMode(value);
  }, []);

  return { isDarkMode, setTheme, isReady };
}
