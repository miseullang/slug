"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const shortcuts = [
  {
    title: "홈",
    description: "메인 화면으로 이동",
    href: "/",
    shortcut: "↵",
  },
  {
    title: "아카이브",
    description: "프로젝트와 아티클을 둘러보기",
    href: "/archive",
    shortcut: "A",
  },
  {
    title: "프로필",
    description: "작성자 소개와 연락 채널",
    href: "/about",
    shortcut: "P",
  },
];

export default function CommandPaletteContent() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((previous) => !previous);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const runCommand = (callback: () => void) => {
    callback();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
        <span className="hidden sm:inline">무엇을 찾고 있나요?</span>
        <span className="rounded-md border border-dashed border-gray-300 px-1.5 py-0.5 text-[11px] font-semibold text-gray-400">
          ⌘K
        </span>
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={() => setOpen(false)}
            className="dialog-overlay fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <Dialog.Content className="dialog-content fixed z-50 w-full max-w-xl px-4 focus:outline-none">
            <Dialog.Title className="sr-only">사이트 검색</Dialog.Title>
            <Command className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white text-sm shadow-2xl">
              <div className="flex items-center border-b border-gray-100 px-4">
                <MagnifyingGlassIcon className="mr-2 h-4 w-4 text-gray-400" />
                <Command.Input
                  autoFocus
                  placeholder="검색어 혹은 명령을 입력하세요…"
                  className="h-12 flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <Command.List className="max-h-[60vh] space-y-2 overflow-y-auto px-2 py-3">
                <Command.Empty className="px-4 py-6 text-center text-gray-400">
                  관련 항목이 없어요.
                </Command.Empty>

                <Command.Group heading="바로가기" className="space-y-1">
                  {shortcuts.map((item) => (
                    <Command.Item
                      key={item.href}
                      value={`${item.title} ${item.description}`}
                      onSelect={() =>
                        runCommand(() => {
                          router.push(item.href);
                        })
                      }
                      className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-left text-gray-700 transition data-[selected=true]:bg-gray-100 data-[selected=true]:text-gray-900"
                    >
                      <span>
                        <span className="block text-sm font-semibold">
                          {item.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.description}
                        </span>
                      </span>
                      <span className="text-xs font-semibold text-gray-400">
                        {item.shortcut}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
