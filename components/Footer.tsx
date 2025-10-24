import Link from "next/link";
import {
  CommandLineIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link href="/" className="flex items-center gap-2">
              <CommandLineIcon className="w-5 h-5" />
              GitHub
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5" />
              Email
            </Link>
          </li>
          <li>
            <Link href="/contact" className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5" />
              Phone
            </Link>
          </li>
        </ul>
      </nav>
      copyright ©2025 All rights reserved by miseullag
    </footer>
  );
}
