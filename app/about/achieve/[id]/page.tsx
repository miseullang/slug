import { notFound } from "next/navigation";
import AchievementDetail from "../components/AchievementDetail";
import { ACHIEVEMENTS } from "../../components/achievements-data";
import AboutContent from "../../components/AboutContent";

type AchievementPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ mode?: string }>;
};

const AchievementPage = async ({
  params,
  searchParams,
}: AchievementPageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const normalizedId = resolvedParams?.id?.split("?")[0];
  if (!normalizedId) {
    notFound();
  }
  const item = ACHIEVEMENTS.find((entry) => String(entry.id) === normalizedId);

  if (!item) {
    notFound();
  }

  const isCenterMode = resolvedSearchParams?.mode === "center";

  if (isCenterMode) {
    return (
      <>
        <AboutContent />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative z-10 flex max-h-[92vh] w-[min(900px,92vw)] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-lg">
            <header className="flex items-center justify-between border-b border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur">
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
              >
                <span className="text-base">←</span>
                뒤로
              </a>
              <span className="text-sm text-foreground/60">상세 보기</span>
              <a
                href={`/about/achieve/${item.id}`}
                className="inline-flex items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
              >
                크게 보기
                <span className="text-base">↗</span>
              </a>
            </header>
            <div className="flex-1 overflow-auto p-6">
              <AchievementDetail item={item} showActions={false} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="pt-30 px-10 max-lg:px-4 max-w-[1100px] mx-auto flex min-h-[calc(100vh-140px)] flex-col gap-6">
      <header className="flex items-center justify-between rounded-2xl border border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur">
        <a
          href="/about"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
        >
          <span className="text-base">←</span>
          뒤로
        </a>
        <span className="text-sm text-foreground/60">상세 보기</span>
        <a
          href={item.link ?? "#"}
          target={item.link ? "_blank" : undefined}
          rel={item.link ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
        >
          관련 링크
          <span className="text-base">↗</span>
        </a>
      </header>
      <div className="flex-1 overflow-auto rounded-2xl border border-foreground/10 bg-background/70 p-6">
        <AchievementDetail item={item} showActions={false} />
      </div>
    </div>
  );
};

export default AchievementPage;
