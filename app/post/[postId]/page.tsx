import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/PostArticle";
import Header from "@/components/layout/header/Header";

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

  return {
    title: post.title,
    description: post.summary ?? post.title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;
  const post = getPost(postId);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <PostArticle post={post} />
    </>
  );
}
