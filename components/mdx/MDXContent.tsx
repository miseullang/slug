"use client";
/* eslint-disable react-hooks/static-components */

import React, { HTMLAttributes, useState } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Callout } from "./Callout";
import { cn } from "@/lib/utils";

type MDXContentProps = {
  code: string;
};

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

const CodeBlock = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLPreElement>) => {
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
    <div className="overflow-hidden rounded-xl border border-foreground/10 bg-gray-950/80">
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-1.5 text-xs uppercase tracking-wide">
        <span className={cn("font-semibold drag-none", colorClass)}>
          {lang}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-sm border-gray-500 px-2 py-1 text-xs font-medium text-gray-500 transition hover:border-gray-400 hover:text-gray-400 hover:bg-gray-500/50 hover:cursor-pointer"
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
        <code className={cn("font-mono", codeProps?.className)}>
          {code || children}
        </code>
      </pre>
    </div>
  );
};

const Code = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const isInline = !className?.startsWith("language-");

  return (
    <code
      className={cn(
        isInline
          ? "rounded-xs bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          : "font-mono text-gray-200",
        className
      )}
      {...props}
    />
  );
};

const components = {
  Callout,
  pre: CodeBlock,
  code: Code,
};

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
