import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-4xl font-bold italic">SLUG</h1>

      <nav>
        <input type="text" placeholder="Search" className="hidden" />
        <button className="flex items-center justify-center p-2 rounded-full border border-gray-200">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </nav>
    </header>
  );
}
