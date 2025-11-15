import Header from "../components/layout/header/Header";
import Footer from "../components/layout/Footer";
import PostItem from "@/components/ui/main/PostItem";
import Category from "@/components/layout/Category";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-10 flex gap-10">
        <aside className="flex flex-col gap-4 min-w-[180px] max-w-[240px]">
          <h2 className="flex-shrink-0 text-2xl font-bold">카테고리</h2>
          <Category />
        </aside>
        <main>
          <div className="w-full max-w-8xl flex flex-col gap-20">
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">최근 게시글</h2>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <PostItem key={index} />
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">추천 게시글</h2>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <PostItem key={index} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
