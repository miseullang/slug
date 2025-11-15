"use client";

import Link from "next/link";
import CommandPalette from "../command-palette/CommandPalette";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <h1 className="text-4xl font-bold italic">SLUG</h1>
      </Link>

      <HeaderMenu />

      <CommandPalette />
    </header>
  );
}
