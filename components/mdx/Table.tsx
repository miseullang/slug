"use client";

import { cn } from "@/lib/utils";
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  TableHTMLAttributes,
} from "react";

type TableProps = TableHTMLAttributes<HTMLTableElement>;
type TSectionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;
type TRProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;
type THProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;
type TDProps = THProps;

export const Table = ({ className, children, ...props }: TableProps) => (
  <div className="my-6 overflow-x-auto rounded-2xl border border-foreground/10 bg-white/70 backdrop-blur dark:bg-white/5">
    <table
      className={cn(
        "w-full border-separate border-spacing-0 text-sm leading-6 text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </table>
  </div>
);

export const TableHead = ({ className, ...props }: TSectionProps) => (
  <thead
    className={cn(
      "bg-foreground/[0.04] text-[13px] uppercase tracking-[0.06em] text-foreground/70",
      className
    )}
    {...props}
  />
);

export const TableBody = ({ className, ...props }: TSectionProps) => (
  <tbody className={cn("divide-y divide-foreground/8", className)} {...props} />
);

export const TableRow = ({ className, ...props }: TRProps) => (
  <tr
    className={cn(
      "transition hover:bg-foreground/[0.03] dark:hover:bg-white/[0.06]",
      className
    )}
    {...props}
  />
);

export const TableHeaderCell = ({ className, ...props }: THProps) => (
  <th
    className={cn(
      "border-b border-r border-foreground/10 px-4 py-3 text-left font-semibold text-foreground/80 first:rounded-tl-2xl last:border-r-0 last:rounded-tr-2xl",
      className
    )}
    {...props}
  />
);

export const TableCell = ({ className, ...props }: TDProps) => (
  <td
    className={cn(
      "border-r border-foreground/8 px-4 py-3 align-top text-foreground/90 last:border-r-0 dark:text-foreground",
      className
    )}
    {...props}
  />
);
