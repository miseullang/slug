import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export default function Category() {
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const items = ["All", ...categories];

  return (
    <ul className="flex flex-col gap-1 max-[1166px]:flex-row max-[1166px]:flex-wrap">
      {items.map((name) => (
        <li key={name}>
          <Link
            href={name === "All" ? "/" : `/?category=${encodeURIComponent(name)}`}
            className="category-link block rounded-full px-4 py-2 text-lg text-foreground/80 transition hover:text-foreground/60 hover:translate-x-2"
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
