import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "../components/PostArticle";

type PostPageProps = {
  params: Promise<{ postId: string }>;
};

const getPost = (postId: string) =>
  allPosts.find((post) => post.slug === postId);

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { postId } = await params;
  const post = getPost(postId);
  if (!post) return {};

  const siteUrl = "https://seulslug.vercel.app";
  const postUrl = `${siteUrl}/post/${postId}`;

  return {
    title: post.title,
    description: post.summary ?? post.title,
    openGraph: {
      title: post.title,
      description: post.summary ?? post.title,
      url: postUrl,
      siteName: "SLUG",
      type: "article",
      locale: "ko_KR",
      images: [
        {
          url: "/assets/images/BG.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary ?? post.title,
      images: ["/assets/images/BG.jpg"],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;
  const post = getPost(postId);

  if (!post) {
    notFound();
  }

  return <PostArticle post={post} />;
}
