import Link from "next/link";
import type { AchievementItem } from "../../components/achievements-data";
import { TrophyIcon } from "@heroicons/react/24/solid";
import PosterPreview from "./PosterPreview";

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
  const metaRows = [
    { label: "주최/주관", value: item.host },
    { label: "수상일자", value: item.date },
    ...(item.link
      ? [
          {
            label: "관련 링크",
            value: (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-medium text-foreground/80 underline-offset-4 hover:underline"
              >
                {item.link}
              </a>
            ),
          },
        ]
      : []),
  ];

  const projectRows = [
    ...(item.githubLink
      ? [
          {
            label: "깃허브 링크",
            value: (
              <a
                href={item.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-medium text-foreground/80 underline-offset-4 hover:underline"
              >
                {item.githubLink}
              </a>
            ),
          },
        ]
      : []),
    ...(item.deployLink
      ? [
          {
            label: "배포 링크",
            value: (
              <a
                href={item.deployLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-medium text-foreground/80 underline-offset-4 hover:underline"
              >
                {item.deployLink}
              </a>
            ),
          },
        ]
      : []),
  ];

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
      <article className="flex justify-between gap-6">
        <div className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-4xl font-semibold">{item.event}</h1>
            <p className="text-md text-foreground/70 inline-flex items-center gap-2">
              <TrophyIcon className="size-4" />
              {item.award}
            </p>
          </div>

          <div className="space-y-1.5">
            {metaRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-center gap-x-4 text-sm text-foreground/60"
              >
                <span className="bg-foreground/10 rounded-sm px-2 py-0.5 text-xs text-foreground/70 w-[11ch] text-center">
                  {row.label}
                </span>
                <span>{row.value}</span>
              </div>
            ))}
            <hr className="border-foreground/10" />
            {projectRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-center gap-x-4 text-sm text-foreground/60"
              >
                <span className="bg-foreground/10 rounded-sm px-2 py-0.5 text-xs text-foreground/70 w-[11ch] text-center">
                  {row.label}
                </span>
                <span>{row.value}</span>
              </div>
            ))}
            {item.summary ? (
              <p className="text-foreground/70 py-5">{item.summary}</p>
            ) : null}
          </div>
        </div>
        <PosterPreview
          src={item.image}
          alt={`${item.event} 포스터 크게 보기`}
        />
      </article>
    </div>
  );
};

export default AchievementDetail;
