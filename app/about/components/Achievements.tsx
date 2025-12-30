import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { ACHIEVEMENTS } from "./achievements-data";

const Achievements = () => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader label="Awards" title="수상 내역" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((item) => (
          <Link
            key={item.id}
            href={`/about/achieve/${item.id}?mode=center`}
            className="block"
            aria-label={`${item.event} 상세 보기`}
          >
            <article className="overflow-hidden cursor-pointer rounded-2xl border border-foreground/10 bg-background transition-shadow hover:shadow-sm">
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                <Image
                  src={item.image}
                  alt={`${item.event} 이미지`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top hover:scale-110 transition-all duration-300"
                />
              </div>
              <div className="space-y-3 p-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold">{item.event}</h3>
                  <p className="text-sm text-foreground/70">{item.award}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-foreground/50">
                  <span>{item.host}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
