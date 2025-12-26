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
    <ul className="flex flex-col gap-1 max-[1166px]:flex-row max-[1166px]:flex-wrap">
      {categories.map((name) => (
        <li key={name}>
          <Link
            href="/"
            className="category-link block rounded-full px-4 py-2 text-lg text-foreground/80 transition hover:text-foreground/60 hover:translate-x-2"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
