import Link from "next/link";
import { CommandLineIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer
      className="w-full rounded-t-[50px] text-[#091b0f] shadow-inner shadow-white/40"
      style={{ background: "linear-gradient(135deg, #BBF351cc, #BBF35180)" }}
    >
      <div className="w-full rounded-t-[50px] border-t border-white/30 bg-gradient-to-br from-[#f9ffe680] via-[#ffffff30] to-transparent backdrop-blur-3xl shadow-[0_-25px_80px_rgba(187,243,81,0.3),inset_0_1px_0_rgba(255,255,255,0.45)] px-[10vw] py-10 pb-12 flex flex-wrap items-center justify-between gap-12">
        <div className="flex-1 min-w-[280px]">
          <p className="text-base leading-7 tracking-wide text-black/80">
            copyright ©2025 All rights reserved by @miseullag
          </p>
        </div>

        <nav className="flex flex-col gap-4 min-w-[220px]">
          <Link
            href="https://github.com/miseullang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-[#f8ffe5]/80 px-5 py-2 text-lg font-medium text-black shadow-inner shadow-white/40 transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <CommandLineIcon className="h-5 w-5" />
            GitHub
          </Link>
          <Link
            href="mailto:miseullag@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-white/50 bg-[#f8ffe5]/80 px-5 py-2 text-lg font-medium text-black shadow-inner shadow-white/40 transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            <EnvelopeIcon className="h-5 w-5" />
            Email
          </Link>
        </nav>
      </div>
    </footer>
  );
}
