"use client";

import { cn } from "@/lib/utils";

type CalloutProps = {
  variant?: "info" | "warning" | "success" | "list";
  children: React.ReactNode;
};

const variantStyles: Record<
  NonNullable<CalloutProps["variant"]>,
  { style: string; emoji: string }
> = {
  info: {
    emoji: "😎",
    style: "bg-blue-100/70 text-foreground dark:bg-blue-100/20",
  },
  warning: {
    emoji: "⚠️",
    style: "bg-amber-100/80 text-amber-900 dark:bg-amber-100/20 dark:text-amber-800",
  },
  success: {
    emoji: "✅",
    style: "bg-emerald-100/70 text-emerald-900 dark:bg-emerald-100/20 dark:text-emerald-800",
  },
  list: {
    emoji: "🏁",
    style: "bg-gray-100 text-foreground dark:bg-gray-100/20 dark:text-gray-800",
  },
};

export function Callout({ variant = "info", children }: CalloutProps) {
  const { style, emoji } = variantStyles[variant];
  return (
    <div
      className={cn(
        "w-full flex gap-4 rounded-lg px-4 py-3 text-base backdrop-blur my-4",
        style
      )}
    >
      <i className="not-italic">{emoji}</i>
      <div className="w-full">{children}</div>
    </div>
  );
}
