import { notFound } from "next/navigation";
import Link from "next/link";
import AboutContent from "./components/AboutContent";
import AchievementDetail from "./achieve/components/AchievementDetail";
import { ACHIEVEMENTS } from "./components/achievements-data";
import ModalCloseOnEsc from "./components/ModalCloseOnEsc";

type AboutPageProps = {
  searchParams?:
    | { modal?: string; id?: string }
    | Promise<{
        modal?: string;
        id?: string;
      }>;
};

const AboutPage = async ({ searchParams }: AboutPageProps) => {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const modalTarget = resolvedSearchParams?.modal;
  const modalId = resolvedSearchParams?.id;
  const modalItem =
    modalTarget === "achieve" && modalId
      ? ACHIEVEMENTS.find((entry) => String(entry.id) === modalId)
      : null;

  if (modalTarget === "achieve" && !modalItem) {
    notFound();
  }

  return (
    <>
      <AboutContent />
      {modalItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <ModalCloseOnEsc />
          <Link
            href="/about"
            scroll={false}
            aria-label="모달 닫기"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative z-10 flex max-h-[92vh] w-[min(900px,92vw)] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-lg">
            <header className="flex items-center justify-between border-b border-foreground/10 bg-background px-4 py-2">
              <Link
                href="/about"
                scroll={false}
                className="inline-flex items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
              >
                <span className="text-base">←</span>
                뒤로
              </Link>
              <span className="text-sm text-foreground/60">상세 보기</span>
              <Link
                href={`/about/achieve/${modalItem.id}`}
                className="inline-flex items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
              >
                크게 보기
                <span className="text-base">↗</span>
              </Link>
            </header>
            <div className="flex-1 overflow-auto p-6">
              <AchievementDetail item={modalItem} showActions={false} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AboutPage;
