"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import BG_IMAGE from "@assets/images/BG.jpg";
import {
  ChatBubbleLeftEllipsisIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "sonner";
import { Post } from "contentlayer/generated";

type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  const handleCopyUrl = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const url = `${window.location.origin}/post/${post.slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL이 복사되었습니다.");
      })
      .catch(() => {
        toast.error("클립보드 복사에 실패했습니다.");
      });
  };

  return (
    <Link
      href={`/post/${post.slug}`}
      className="w-[280px] min-[1440px]:basis-[calc((100%-48px)/4)] min-[1440px]:max-w-[calc((100%-48px)/4)] flex flex-col gap-4 group"
    >
      <figure className="w-[280px] min-[1440px]:w-full h-[200px] relative group-hover:translate-y-[-10px] transition-all duration-300">
        <Image
          src={BG_IMAGE}
          alt={post.title}
          fill
          className="object-cover aspect-ratio-300/200 rounded-3xl"
          sizes="280px"
        />
        <Tooltip>
          <TooltipTrigger
            className="absolute right-4 -bottom-4 z-10 rounded-full
           border-4 border-white dark:border-black bg-lime-300 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            <ChatBubbleLeftEllipsisIcon className="w-4 h-4 inline-block mr-1" />
            0
          </TooltipTrigger>
          <TooltipContent>
            <p>댓글 수</p>
          </TooltipContent>
        </Tooltip>
      </figure>
      <div className="flex flex-col gap-2 px-2">
        <p className="text-sm text-foreground/60">작성일 | {formattedDate}</p>
        <h3 className="text-xl font-bold line-clamp-1">{post.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {post.summary || "요약이 없습니다."}
        </p>
        <div
          className="flex items-center justify-between"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ul className="flex gap-1 flex-wrap">
            {post.tags?.slice(0, 2).map((tag) => (
              <li
                key={tag}
                className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 py-1 w-fit"
              >
                {tag}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="flex items-center gap-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 cursor-pointer text-sm font-semibold text-foreground/70"
            onClick={handleCopyUrl}
          >
            <Square2StackIcon className="w-4 h-4" />
            복사
          </button>
        </div>
      </div>
    </Link>
  );
}
