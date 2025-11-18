import {
  HomeIcon,
  UserCircleIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const menuItems = [
  {
    href: "/",
    icon: HomeIcon,
    label: "Home",
  },
  {
    href: "/about",
    icon: UserCircleIcon,
    label: "About",
  },
  {
    href: "/posts",
    icon: NewspaperIcon,
    label: "Posts",
  },
];

type HeaderMenuProps = {
  isDarkMode: boolean;
};

export default function HeaderMenu({ isDarkMode }: HeaderMenuProps) {
  return (
    <nav>
      <ul
        className={`flex items-center gap-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="header-link inline-flex transform-gpu translate-y-1.5 items-center gap-2 pb-1"
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
