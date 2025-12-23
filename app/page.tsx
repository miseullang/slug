import Header from "../components/layout/header/Header";
import Footer from "../components/layout/Footer";
import PostItem from "@/components/ui/main/PostItem";
import Category from "@/components/layout/Category";
import CosmicBackground from "@/components/home/CosmicBackground";
import { allPosts } from "contentlayer/generated";

export default function Home() {
  // 날짜순으로 정렬 (최신순)
  const sortedPosts = [...allPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // 최근 게시글 (전체 게시글)
  const recentPosts = sortedPosts;

  // 추천 게시글 (현재는 최근 게시글과 동일하게 표시)
  const recommendedPosts = sortedPosts;

  return (
    <div>
      <Header />
      <CosmicBackground />
      <div className=" pt-24 pb-20 flex gap-5 max-w-[1440px] max-[1439px]:px-10 mx-auto ">
        <aside className="flex flex-col gap-4 min-w-[180px] max-w-[240px]">
          <h2 className="shrink-0 text-2xl font-bold">카테고리</h2>
          <Category />
        </aside>
        <main className="w-full shrink-1">
          <div className="w-full flex flex-col gap-20">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">최근 게시글</h2>
              <div className="flex flex-wrap gap-4">
                {recentPosts.length > 0 ? (
                  recentPosts.map((post) => (
                    <PostItem key={post.slug} post={post} />
                  ))
                ) : (
                  <p className="text-foreground/60">게시글이 없습니다.</p>
                )}
              </div>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">추천 게시글</h2>
              <div className="flex flex-wrap gap-4">
                {recommendedPosts.length > 0 ? (
                  recommendedPosts.map((post) => (
                    <PostItem key={post.slug} post={post} />
                  ))
                ) : (
                  <p className="text-foreground/60">게시글이 없습니다.</p>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
