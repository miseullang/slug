import Header from "../components/layout/header/Header";
import Footer from "../components/layout/Footer";
import PostItem from "@/components/ui/main/PostItem";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="py-10">
        <div className="w-full max-w-8xl flex flex-wrap gap-8 px-20">
          {Array.from({ length: 10 }).map((_, index) => (
            <PostItem key={index} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
