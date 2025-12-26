"use client";

import { useEffect, useState } from "react";
import CommandPalette from "../command-palette/CommandPalette";
import HeaderMenu, { menuItems } from "./HeaderMenu";
import Image from "next/image";
import LOGO_WHITE from "@assets/logo/logo_white.svg";
import LOGO_BLACK from "@assets/logo/logo_black.svg";
import { Toggle } from "@/components/ui/toggle";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useThemeMode } from "@/lib/useThemeMode";
import Link from "next/link";

export default function Header() {
  const { isDarkMode, setTheme } = useThemeMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between px-5 py-3 fixed top-0 left-0 right-0 z-50 bg-white/2 dark:bg-background/2 backdrop-blur-sm">
        <div className="flex items-center gap-10 w-fit rounded-full transition-colors">
          <Toggle
            aria-label="다크 모드 전환"
            variant="outline"
            size="lg"
            pressed={isDarkMode}
            onPressedChange={setTheme}
            className="border-none shadow-none p-0 cursor-pointer transform-3d bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:border-transparent data-[state=on]:bg-transparent"
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

          <div className="hidden lg:block">
            <HeaderMenu />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CommandPalette />
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground transition hover:bg-gray-100"
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className="relative h-4 w-4">
              <span
                className={[
                  "absolute left-0 right-0 top-1/2 h-[1px] rounded-full bg-current transition-transform duration-200",
                  isMobileMenuOpen ? "rotate-45" : "-translate-y-[6px]",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 right-0 top-1/2 h-[1px] rounded-full bg-current transition-opacity duration-200",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 right-0 top-1/2 h-[1px] rounded-full bg-current transition-transform duration-200",
                  isMobileMenuOpen ? "-rotate-45" : "translate-y-[6px]",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-40 lg:hidden",
          "bg-white/95 backdrop-blur-sm dark:bg-background/95",
          "will-change-transform",
          isMobileMenuOpen ? "pointer-events-auto mobile-menu-open" : "pointer-events-none",
        ].join(" ")}
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          transform: `translateY(${isMobileMenuOpen ? "0%" : "-100%"})`,
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          aria-label="모바일 메뉴"
          className="flex h-full flex-col items-center justify-center gap-10 px-6"
        >
          {menuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-4xl tracking-tight text-foreground transition-[opacity,transform] duration-300 ease-in-out"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transitionDelay: isMobileMenuOpen ? `${500 + index * 250}ms` : "0ms",
                transform: `translateX(${isMobileMenuOpen ? "0%" : "100%"})`,

              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
