"use client";

import { cn } from "@/lib/utils";

type HeadingItem = {
  id: string;
  title: string;
  level: number;
};

type TableOfContentsProps = {
  headings: HeadingItem[];
  activeId?: string;
};

export function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  if (!headings.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden pt-12 max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden px-4 lg:block self-start"
    >
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          const indent =
            heading.level === 3 ? "pl-5" : heading.level >= 4 ? "pl-8" : "";
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block max-w-[200px] origin-left rounded-sm px-2 py-1 transition-all duration-150 whitespace-normal wrap-break-word",
                  indent,
                  isActive
                    ? "scale-110 bg-foreground/5 text-foreground font-semibold"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
