import Link from "next/link";

const categories = [
  "All",
  "Next.js",
  "FE",
  "React",
  "React Native",
  "TypeScript",
  "TailwindCSS",
  "성능최적화"
];

export default function Category() {
  return (
    <ul className="flex flex-col gap-1">
      {categories.map((name) => (
        <li key={name}>
          <Link
            href="/"
            className="block rounded-full px-4 py-2 text-lg text-gray-700 transition hover:text-gray-400"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
