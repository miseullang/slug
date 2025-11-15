import Link from "next/link";
import { CommandLineIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 transition-colors flex items-center justify-between py-10 px-20">
      <p>copyright ©2025 All rights reserved by @miseullag</p>
      <nav>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              href="https://github.com/miseullang"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gray-100"
            >
              <CommandLineIcon className="w-5 h-5" />
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href="mailto:miseullag@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2  hover:text-gray-100"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Email
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
