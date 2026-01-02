import Footer from "../components/layout/Footer";
import Category from "@/components/layout/Category";
import CosmicBackground from "@/components/layout/CosmicBackground";
import { allPosts } from "contentlayer/generated";
import PostSections from "@/components/home/PostSections";
import { fetchDiscussionCommentCounts } from "@/lib/giscus";

export default async function Home() {
  // 날짜순으로 정렬 (최신순)
  const sortedPosts = [...allPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 최근 게시글 (전체 게시글)
  const recentPosts = sortedPosts;

  // 추천 게시글 (현재는 최근 게시글과 동일하게 표시)
  const recommendedPosts = sortedPosts;
  const merged = [...recentPosts, ...recommendedPosts];
  const paths = Array.from(new Set(merged.map((post) => `/post/${post.slug}`)));
  const commentCounts =
    paths.length > 0 ? await fetchDiscussionCommentCounts(paths) : {};

  return (
    <div className="main-gradient">
      <CosmicBackground />
      <div className="pt-24 pb-20 flex gap-5 max-w-[1440px] max-[1439px]:px-10 mx-auto max-[1166px]:flex-col max-[1166px]:gap-10 max-lg:px-4">
        <aside className="flex flex-col gap-4 min-w-[180px] max-w-[240px] max-[1166px]:w-full max-[1166px]:max-w-full">
          <h2 className="shrink-0 text-2xl font-bold">카테고리</h2>
          <Category />
        </aside>
        <main className="w-full shrink-1">
          <PostSections
            recentPosts={recentPosts}
            recommendedPosts={recommendedPosts}
            commentCounts={commentCounts}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
