import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const menuItems = [
  {
    href: "/",
    icon: HomeIcon,
    label: "Home",
  },
  {
    href: "/about",
    icon: HomeIcon,
    label: "About",
  },
  {
    href: "/posts",
    icon: HomeIcon,
    label: "Posts",
  },
];

export default function HeaderMenu() {
  return (
    <nav>
      <ul className="flex items-center gap-4">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="header-link inline-flex items-center gap-2 pb-1"
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
