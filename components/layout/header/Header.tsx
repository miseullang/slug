"use client";

import { useEffect, useState } from "react";
import CommandPalette from "../command-palette/CommandPalette";
import HeaderMenu from "./HeaderMenu";
import Image from "next/image";
import LOGO_WHITE from "@assets/logo/logo_white.svg";
import LOGO_BLACK from "@assets/logo/logo_black.svg";
import { Toggle } from "@/components/ui/toggle";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document === "undefined") return false;
    const persisted =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("theme")
        : null;
    if (persisted === "dark") return true;
    if (persisted === "light") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDarkMode);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  return (
    <header className="flex items-center justify-between p-5">
      <nav className="flex items-center gap-22 w-fit px-4 py-2 rounded-full transition-colors">
        <Toggle
          aria-label="다크 모드 전환"
          variant="outline"
          size="lg"
          pressed={isDarkMode}
          onPressedChange={setIsDarkMode}
          className="border-none shadow-none cursor-pointer transform-3d bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:border-transparent data-[state=on]:bg-transparent"
        >
          <h1 className="text-2xl font-bold">
            {isDarkMode ? (
              <Image src={LOGO_WHITE} alt="logo" width={80} />
            ) : (
              <Image src={LOGO_BLACK} alt="logo" width={80} />
            )}
          </h1>
          {isDarkMode ? (
            <MoonIcon className="w-6! h-6!  -translate-x-1 translate-y-1 text-white" />
          ) : (
            <SunIcon className="w-6! h-6!  -translate-x-1 translate-y-1 text-black" />
          )}
        </Toggle>

        <HeaderMenu isDarkMode={isDarkMode} />
      </nav>
      <CommandPalette />
    </header>
  );
}
