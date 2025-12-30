import Image from "next/image";
import Link from "next/link";
import type { AchievementItem } from "../../components/achievements-data";

type AchievementDetailProps = {
  item: AchievementItem;
  primaryHref?: string;
  closeHref?: string;
  showActions?: boolean;
};

const AchievementDetail = ({
  item,
  primaryHref,
  closeHref,
  showActions = false,
}: AchievementDetailProps) => {
  return (
    <div className="relative flex flex-col gap-6">
      <header className="absolute top-0 left-0 w-full z-10 bg-background/50 backdrop-blur-sm">
        {showActions ? (
          <div className="flex items-center gap-2">
            {closeHref ? (
              <Link
                href={closeHref}
                className="rounded-full border border-foreground/15 px-4 py-2 text-sm text-foreground/70 transition hover:text-foreground"
              >
                닫기
              </Link>
            ) : null}
            {primaryHref ? (
              <a
                href={primaryHref}
                className="rounded-full bg-foreground px-4 py-2 text-sm text-background transition hover:opacity-90"
              >
                크게 보기
              </a>
            ) : null}
          </div>
        ) : null}
      </header>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
        <Image
          src={item.image}
          alt={`${item.event} 이미지`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-top"
        />
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">{item.event}</h1>
          <p className="text-sm text-foreground/70">{item.award}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/60">
          <span>{item.host}</span>
          <span>{item.date}</span>
        </div>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-medium text-foreground/80 underline-offset-4 hover:underline"
          >
            관련 링크 보기
          </a>
        ) : null}
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        quos.
      </p>
    </div>
  );
};

export default AchievementDetail;
