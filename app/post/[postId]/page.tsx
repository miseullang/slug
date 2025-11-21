import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MDXContent from "@/components/mdx/MDXContent";

type PostPageProps = {
  params: Promise<{ postId: string }>;
};

const getPost = (postId: string) =>
  allPosts.find((post) => post.slug === postId);

export function generateStaticParams() {
  return allPosts.map((post) => ({ postId: post.slug }));
}

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

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl py-12">
      <header className="mb-10 space-y-4">
        <p className="text-sm text-foreground/70">{formattedDate}</p>
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        {post.tags?.length ? (
          <ul className="flex flex-wrap gap-2 text-sm">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-foreground/20 px-3 py-1 text-foreground/80"
              >
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="flex flex-col gap-2 rounded-3xl border border-foreground/5 bg-background/60 p-6 shadow-2xl shadow-gray-900/10">
        <MDXContent code={post.body.code} />
      </div>
    </article>
  );
}
