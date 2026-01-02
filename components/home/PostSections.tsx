import PostItem from "@/components/home/PostItem";
import type { Post } from "contentlayer/generated";

type PostSectionsProps = {
  recentPosts: Post[];
  recommendedPosts: Post[];
  commentCounts: Record<string, number>;
};

const PostSections = ({
  recentPosts,
  recommendedPosts,
  commentCounts,
}: PostSectionsProps) => {
  return (
    <div className="w-full flex flex-col gap-20">
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">최근 게시글</h2>
        <div className="flex flex-wrap gap-4 justify-between max-[1166px]:justify-start">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <PostItem
                key={post.slug}
                post={post}
                commentCount={commentCounts[`/post/${post.slug}`] ?? 0}
              />
            ))
          ) : (
            <p className="text-foreground/60">게시글이 없습니다.</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">추천 게시글</h2>
        <div className="flex flex-wrap gap-4 justify-between max-[1166px]:justify-start">
          {recommendedPosts.length > 0 ? (
            recommendedPosts.map((post) => (
              <PostItem
                key={post.slug}
                post={post}
                commentCount={commentCounts[`/post/${post.slug}`] ?? 0}
              />
            ))
          ) : (
            <p className="text-foreground/60">게시글이 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PostSections;
