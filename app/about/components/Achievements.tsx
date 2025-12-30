import Image from "next/image";
import BG_IMAGE from "@assets/images/BG.jpg";
import { SectionHeader } from "@/components/ui/section-header";
import DX_DIVE_IMAGE from "@assets/images/dive2025.png";
import SW_COMPETITION_IMAGE from "@assets/images/opensource2024.jpg";
import DEV_COURSE_IMAGE from "@assets/images/devcourse.png";

const ACHIEVEMENTS = [
  {
    id: 1,
    date: "2025/08/24",
    event: "DX DIVE 2025",
    award: "대상(부산광역시장상)",
    host: "부산광역시",
    link: "https://www.busan.com/view/busan/view.php?code=2025082714083007691",
    image: DX_DIVE_IMAGE,
  },
  {
    id: 2,
    date: "2024/12/06",
    event: "공개 SW개발자대회",
    award: "SW협회장상(장려상)",
    host: "과학기술정보통신부",
    link: "https://www.kossa.kr/materials/2024/ossp/ebook/index.html",
    image: SW_COMPETITION_IMAGE,
  },
  {
    id: 3,
    date: "2025/03/12",
    event: "프로그래머스 데브코스 파이널",
    award: "인기상, 우수상",
    host: "(주)그렙",
    link: "https://programmers.co.kr/competitions/223/final",
    image: DEV_COURSE_IMAGE,
  },
];

const Achievements = () => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader label="Awards" title="수상 내역" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden cursor-pointer rounded-2xl border border-foreground/10 bg-background"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
              <Image
                src={item.image ?? BG_IMAGE}
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
        ))}
      </div>
    </section>
  );
};

export default Achievements;
