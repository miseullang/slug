"use client";
/* eslint-disable react-hooks/static-components */

import { ElementType, HTMLAttributes, PropsWithChildren } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Callout } from "./Callout";
import { CodeBlock, InlineCode } from "./CodeBlocks";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

type MDXContentProps = {
  code: string;
};

const UnorderedList = ({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul
      className={cn("px-2 list-disc list-inside space-y-1", className)}
      {...props}
    />
  );
};

const ListItem = ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
  <li className={cn("", className)} {...props} />
);

const Hr = ({ className, ...props }: HTMLAttributes<HTMLHRElement>) => (
  <hr
    className={cn("mt-4 mb-2 border-t border-foreground/10", className)}
    {...props}
  />
);

function createHeading(level: 2 | 3 | 4) {
  const Component = ({
    className,
    children,
    ...props
  }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => {
    const Tag = `h${level}` as ElementType;

    return (
      <Tag
        {...props}
        className={cn(
          "scroll-mt-32",
          level === 2
            ? "mt-10 text-2xl font-semibold tracking-tight"
            : level === 3
              ? "mt-6 text-xl font-medium"
              : "mt-4 text-lg font-medium",
          className
        )}
      >
        {children}
      </Tag>
    );
  };

  Component.displayName = `Heading${level}`;
  return Component;
}

const H2 = createHeading(2);
const H3 = createHeading(3);
const H4 = createHeading(4);

const components = {
  Callout,
  pre: CodeBlock,
  code: InlineCode,
  ul: UnorderedList,
  li: ListItem,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeaderCell,
  td: TableCell,
  hr: Hr,
  h2: H2,
  h3: H3,
  h4: H4,
};

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
