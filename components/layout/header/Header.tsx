"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CommandPalette from "../command-palette/CommandPalette";
import HeaderMenu from "./HeaderMenu";
import Image from "next/image";
import LOGO_WHITE from "@assets/logo/logo_white.svg";
import LOGO_BLACK from "@assets/logo/logo_black.svg";
import { Toggle } from "@/components/ui/toggle";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <header className="flex items-center justify-between p-5">
      <nav className="flex items-center gap-8 bg-foreground w-fit px-4 py-2 rounded-full">
        <Link href="/" className="px-1.5">
          <h1 className="text-2xl font-bold">
            {isDarkMode ? (
              <Image src={LOGO_BLACK} alt="logo" width={60} />
            ) : (
              <Image src={LOGO_WHITE} alt="logo" width={60} />
            )}
          </h1>
        </Link>

        <HeaderMenu isDarkMode={isDarkMode} />

        <Toggle
          aria-label="다크 모드 전환"
          variant="outline"
          size="lg"
          pressed={isDarkMode}
          onPressedChange={setIsDarkMode}
          className="border-none bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:border-transparent data-[state=on]:bg-transparent data-[state=on]:text-white"
        >
          {isDarkMode ? (
            <MoonIcon className="w-6! h-6! text-gray-900" />
          ) : (
            <SunIcon className="w-6! h-6! text-white" />
          )}
        </Toggle>
      </nav>

      <CommandPalette />
    </header>
  );
}
