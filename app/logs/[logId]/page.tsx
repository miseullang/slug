import { allDocuments } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/app/post/components/PostArticle";

type LogPageProps = {
  params: Promise<{ logId: string }>;
};

type LogDocument = {
  slug?: string;
  title: string;
  date: string;
  tags?: string[];
  summary?: string;
  body: { code: string };
  headings?: unknown;
  giscusId?: string;
  _raw?: { flattenedPath?: string };
};

type NormalizedLog = LogDocument & { slug: string };

const getLog = (logId: string): NormalizedLog | undefined => {
  const logs = (allDocuments as unknown as LogDocument[]).filter((doc) =>
    doc._raw?.flattenedPath?.startsWith("logs/")
  );

  const match = logs.find((log) => {
    const slug =
      log.slug ??
      log._raw?.flattenedPath?.replace(/^logs\//, "") ??
      "";
    return slug === logId;
  });

  if (!match) return;
  const slug =
    match.slug ?? match._raw?.flattenedPath?.replace(/^logs\//, "") ?? "";
  if (!slug) return;
  return { ...match, slug };
};

export async function generateMetadata({
  params,
}: LogPageProps): Promise<Metadata> {
  const { logId } = await params;
  const log = getLog(logId);
  if (!log) return {};

  const siteUrl = "https://seulslug.vercel.app";
  const logUrl = `${siteUrl}/logs/${logId}`;

  return {
    title: log.title,
    description: log.summary ?? log.title,
    openGraph: {
      title: log.title,
      description: log.summary ?? log.title,
      url: logUrl,
      siteName: "SLUG",
      type: "article",
      locale: "ko_KR",
      images: [
        {
          url: "/assets/images/BG.jpg",
          width: 1200,
          height: 630,
          alt: log.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: log.title,
      description: log.summary ?? log.title,
      images: ["/assets/images/BG.jpg"],
    },
  };
}

export default async function LogPage({ params }: LogPageProps) {
  const { logId } = await params;
  const log = getLog(logId);

  if (!log) {
    notFound();
  }

  return <PostArticle post={log} commentTermPrefix="log" />;
}
