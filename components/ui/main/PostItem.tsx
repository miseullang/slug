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

export default function PostItem() {
  return (
    <Link href="/post/1" className="w-[350px] flex flex-col gap-4 group">
      <figure className="w-[350px] h-[240px] relative group-hover:translate-y-[-10px] transition-all duration-300">
        <Image
          src={BG_IMAGE}
          alt="bg"
          fill
          className="object-cover aspect-ratio-350/240 rounded-3xl"
          sizes="350px"
        />
        <Tooltip>
          <TooltipTrigger
            className="absolute right-4 -bottom-4 z-10 rounded-full
           border-3 border-white bg-lime-300 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            <ChatBubbleLeftEllipsisIcon className="w-4 h-4 inline-block mr-1" />
            3
          </TooltipTrigger>
          <TooltipContent>
            <p>댓글 수</p>
          </TooltipContent>
        </Tooltip>
      </figure>
      <div className="flex flex-col gap-2 px-2">
        <p className="text-sm text-gray-700">작성일 | 2025.11.12</p>
        <h3 className="text-xl font-bold line-clamp-1">
          패키지 매니저 4종(npm, yarn, yarn berry, pnpm) 제대로 알고 쓰기
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          회사에서는 yarn, 개인 프로젝트는 pnpm을 쓰면서 실수로 패키지 매니저를
          크로스 사용해서 오류가 나기도 하고, pnpm의 경우 특정 환경에서 에러가
          나기도 하면서 패키지 매니저 간의 패키지 관리 방법에 대해 궁금해져
          찾아봤던 내용을 정리해보려고 한다.
        </p>
        <div
          className="flex items-center justify-between"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ul className="flex gap-1">
            <li className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 py-1 w-fit">
              category1
            </li>
            <li className="text-sm text-gray-700 bg-gray-200 rounded-full px-3 py-1 w-fit">
              category2
            </li>
          </ul>
          <button
            type="button"
            className="flex items-center gap-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 cursor-pointer text-sm font-semibold text-gray-700"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              navigator.clipboard
                .writeText(window.location.href)
                .then(() => {
                  toast.success("URL이 복사되었습니다.");
                })
                .catch(() => {
                  toast.error("클립보드 복사에 실패했습니다.");
                });
            }}
          >
            <Square2StackIcon className="w-4 h-4" />
            복사
          </button>
        </div>
      </div>
    </Link>
  );
}
