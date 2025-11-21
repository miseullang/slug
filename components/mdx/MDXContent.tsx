"use client";
/* eslint-disable react-hooks/static-components */

import { HTMLAttributes } from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Callout } from "./Callout";

type MDXContentProps = {
  code: string;
};

const components = {
  Callout,
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="rounded-xl bg-gray-900/90 p-4 text-sm text-gray-100 shadow-md overflow-x-auto"
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code className="font-mono text-rose-200" {...props} />
  ),
};

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
