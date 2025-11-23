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
    style: "bg-blue-100/70 text-blue-900",
  },
  warning: {
    emoji: "⚠️",
    style: "bg-amber-100/80 text-amber-900",
  },
  success: {
    emoji: "✅",
    style: "bg-emerald-100/70 text-emerald-900",
  },
  list: {
    emoji: "🏁",
    style: "bg-gray-100 text-foreground",
  },
};

export function Callout({ variant = "info", children }: CalloutProps) {
  const { style, emoji } = variantStyles[variant];
  return (
    <div
      className={cn(
        "flex gap-4 rounded-lg px-4 py-3 text-base backdrop-blur",
        style
      )}
    >
      <i className="not-italic">{emoji}</i>
      <span>{children}</span>
    </div>
  );
}
