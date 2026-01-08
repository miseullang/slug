"use client";

import { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";

type PosterPreviewProps = {
  src: string | StaticImageData;
  alt: string;
};

const PosterPreview = ({ src, alt }: PosterPreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label="포스터 크게 보기"
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        className="relative w-full md:w-[280px] md:flex-shrink-0 aspect-[210/297] overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 cursor-pointer"
      >
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full border border-foreground/20 bg-background/80 p-2 text-foreground/70 shadow-sm backdrop-blur"
        >
          <ArrowsPointingOutIcon className="h-4 w-4" />
        </span>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="포스터 닫기"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <button
              type="button"
              aria-label="포스터 닫기"
              onClick={() => setIsOpen(false)}
              className="relative h-[92vh] w-[92vw] cursor-pointer"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PosterPreview;
