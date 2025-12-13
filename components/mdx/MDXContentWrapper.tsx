"use client";

import { Suspense } from "react";
import MDXContent from "./MDXContent";

type MDXContentWrapperProps = {
  code: string;
};

export default function MDXContentWrapper({ code }: MDXContentWrapperProps) {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
      <MDXContent code={code} />
    </Suspense>
  );
}

