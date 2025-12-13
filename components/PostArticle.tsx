"use client";

import { useEffect, useMemo, useState } from "react";
import { Post } from "contentlayer/generated";
import MDXContent from "./mdx/MDXContent";
import { TableOfContents } from "./mdx/TableOfContents";

type PostArticleProps = {
  post: Post;
};

export function PostArticle({ post }: PostArticleProps) {
  const headings = useMemo(() => post.headings ?? [], [post.headings]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    if (!headings.length) return;
    if (typeof window === "undefined") return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    let lastActiveId: string | undefined;
    const indexById = new Map(headings.map((h, i) => [h.id, i]));
    const stateById = new Map<
      string,
      { index: number; inside: boolean; above: boolean }
    >();

    const applyActive = (nextId?: string, updateHash = true) => {
      if (!nextId) return;
      if (nextId === lastActiveId) return;
      console.debug("[TOC] applyActive", { nextId, updateHash });
      lastActiveId = nextId;
      setActiveId(nextId);
      if (updateHash) {
        history.replaceState(null, "", `#${nextId}`);
      }
    };

    const pickActive = () => {
      let activeId: string | undefined;
      let smallest = Number.POSITIVE_INFINITY;
      let largestAbove = -1;

      for (const [id, { inside, index }] of stateById.entries()) {
        if (inside && index < smallest) {
          smallest = index;
          activeId = id;
        }
      }

      if (!activeId) {
        for (const [id, { above, index }] of stateById.entries()) {
          if (above && index > largestAbove) {
            largestAbove = index;
            activeId = id;
          }
        }
      }

      return activeId ?? headings[0]?.id;
    };

    const handleHashChange = () => {
      const hashId = window.location.hash.replace(/^#/, "");
      const target = hashId
        ? document.getElementById(hashId)
        : document.getElementById(headings[0]?.id ?? "");
      console.debug("[TOC] hashchange", { hashId, targetId: target?.id });
      if (target) applyActive(target.id, false);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!id) return;
          const index = indexById.get(id) ?? 0;
          const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
          const above =
            entry.boundingClientRect.y + entry.boundingClientRect.height <=
            rootHeight / 2;
          const inside = entry.intersectionRatio > 0;
          stateById.set(id, { index, inside, above });
        });

        console.debug(
          "[TOC] observer entries",
          entries.map((e) => ({
            id: e.target.id,
            intersecting: e.isIntersecting,
            top: Math.round(e.boundingClientRect.top),
          }))
        );

        const nextId = pickActive();
        applyActive(nextId, true);
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: [0, 1],
      }
    );

    console.debug(
      "[TOC] observe elements",
      elements.map((el) => ({ id: el.id }))
    );
    handleHashChange();
    elements.forEach((el) => observer.observe(el));
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, [headings]);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.date)),
    [post.date]
  );

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
      <TableOfContents headings={headings} activeId={activeId} />

      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl py-12">
        <header className="mb-10 space-y-4">
          <p className="text-sm text-foreground/70">{formattedDate}</p>
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          {post.tags?.length ? (
            <ul className="flex flex-wrap gap-2 text-sm">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-foreground/20 px-3 py-1 text-foreground/80"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className="rounded-3xl border border-foreground/5 bg-background/60 p-6 shadow-2xl shadow-gray-900/10">
          <MDXContent code={post.body.code} />
        </div>
      </article>
    </div>
  );
}
