"use client";

import React, { HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

const languageColors: Record<string, string> = {
  ts: "text-sky-300",
  tsx: "text-sky-300",
  js: "text-amber-300",
  jsx: "text-amber-300",
  json: "text-orange-300",
  css: "text-indigo-300",
  scss: "text-pink-300",
  html: "text-rose-300",
  bash: "text-emerald-300",
  sh: "text-emerald-300",
  md: "text-fuchsia-300",
};

export function CodeBlock({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLPreElement>) {
  const findCodeElement = (
    children: React.ReactNode
  ): React.ReactElement | null => {
    if (React.isValidElement(children)) {
      const props = children.props as { className?: string };
      if (
        typeof props?.className === "string" &&
        props.className.startsWith("language-")
      ) {
        return children;
      }
    }
    if (Array.isArray(children)) {
      for (const child of children) {
        if (React.isValidElement(child)) {
          const props = child.props as { className?: string };
          if (
            typeof props?.className === "string" &&
            props.className.startsWith("language-")
          ) {
            return child;
          }
        }
      }
    }
    return null;
  };

  const codeElement = findCodeElement(children);
  const codeProps = codeElement?.props as
    | { className?: string; children?: React.ReactNode }
    | undefined;

  const rawCode = codeProps?.children;
  const code =
    typeof rawCode === "string"
      ? rawCode
      : Array.isArray(rawCode)
      ? rawCode.join("")
      : "";

  const langMatch = codeProps?.className?.match(/language-([\w-]+)/);
  const lang = langMatch?.[1]?.toLowerCase() ?? "text";
  const colorClass = languageColors[lang] ?? "text-slate-200";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <div className="overflow-hidden my-2 rounded-xl border border-foreground/10 bg-gray-950/80">
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2 text-xs uppercase tracking-wide">
        <span className={cn("font-semibold", colorClass)}>{lang}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border cursor-pointer border-white/15 px-3 py-1 text-[11px] font-medium text-white/80 transition hover:border-white/25 hover:text-white"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className={cn(
          "bg-gray-900/60 p-4 text-sm text-gray-100 shadow-inner overflow-x-auto",
          className
        )}
        data-language={lang}
        {...props}
      >
        <code className={cn("font-mono code-ligatures", codeProps?.className)}>
          {code || children}
        </code>
      </pre>
    </div>
  );
}

export function InlineCode({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const isInline = !className?.startsWith("language-");

  return (
    <code
      className={cn(
        isInline
          ? "px-1.5 py-0.5 text-sm font-mono code-ligatures text-foreground bg-foreground/10 rounded-sm"
          : "font-mono code-ligatures text-gray-200",
        className
      )}
      {...props}
    />
  );
}
