import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function HeaderMenu() {
  return (
    <nav>
      <ul className="flex items-center gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index}>
            <Link
              href="/"
              className="header-link inline-flex items-center gap-2 pb-1"
            >
              <HomeIcon className="w-6 h-6" />
              <span>Home</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
