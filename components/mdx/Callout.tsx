"use client";

import { cn } from "@/lib/utils";

type CalloutProps = {
  variant?: "info" | "warning" | "success";
  children: React.ReactNode;
};

const variantStyles: Record<NonNullable<CalloutProps["variant"]>, string> = {
  info: "bg-blue-100/70 text-blue-900 border-blue-300",
  warning: "bg-amber-100/80 text-amber-900 border-amber-300",
  success: "bg-emerald-100/70 text-emerald-900 border-emerald-300",
};

export function Callout({ variant = "info", children }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-base shadow-sm backdrop-blur",
        variantStyles[variant]
      )}
    >
      {children}
    </div>
  );
}
