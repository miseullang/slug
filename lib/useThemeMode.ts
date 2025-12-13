"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export function useThemeMode() {
  const isClient = typeof window !== "undefined";

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (!isClient) return false;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return stored === "dark";
    return window.document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (!isClient) return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem(STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isClient, isDarkMode]);

  const setTheme = useCallback((value: boolean) => {
    setIsDarkMode(value);
  }, []);

  return { isDarkMode, setTheme, isReady: isClient };
}
