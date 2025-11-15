"use client";

import Link from "next/link";
import CommandPalette from "./CommandPalette";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <h1 className="text-4xl font-bold italic">SLUG</h1>
      </Link>

      <nav className="flex items-center gap-2">
        <CommandPalette />
      </nav>
    </header>
  );
}
