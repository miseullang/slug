import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import { SectionHeader } from "components/ui/section-header";
import Image from "next/image";
import Link from "next/link";
import CAREBELL_LOGO from "@assets/logo/carebell.svg";
import PROGRAMMERS_LOGO from "@assets/logo/programmers.webp";

const CAREER_ITEMS = [
  {
    id: "item-1",
    role: "프론트엔드 개발자 · 시니어 케어 플랫폼 케어벨 BO 개발 및 유지보수",
    company: "@zeroweb",
    badge: ["B2B", "B2C", "B2G"],
    period: "2025.05.07 ~ present",
    image: CAREBELL_LOGO,
    link: "https://carebell.kr",
    highlights: [
      "Carebell 관리자 대시보드 개발",
      "Carebell 앱 유지보수",
      "사내 패키지 라이브러리 유지보수",
    ],
  },
  {
    id: "item-2",
    role: "프론트엔드 데브코스 2기",
    company: "@programmers",
    period: "2024/10/14 ~ 2025/03/12",
    image: PROGRAMMERS_LOGO,
    link: "https://programmers.co.kr",
    highlights: [
      "모던 자바스크립트 딥다이브 스터디",
      "3개 프로젝트 중 2개 프로젝트 1위, 파이널 우수상",
    ],
  },
];

const triggerClassName = "items-center py-5 text-left hover:no-underline";
const metaWrapperClassName = "flex items-center gap-4";
const avatarClassName =
  "h-11 w-11 overflow-hidden hover:opacity-80 cursor-pointer transition-opacity rounded-full border border-foreground/10 bg-foreground/5";
const titleClassName = "text-base font-semibold";
const companyClassName = "text-sm text-foreground/60";
const periodClassName = "text-sm text-foreground/60";
const contentClassName = "flex flex-col gap-4 text-balance";
const listClassName = "space-y-2 text-sm text-foreground/70";
const linkClassName = "transition-colors hover:text-foreground";
const badgeClassName =
  "rounded-full border border-foreground/15 px-2 py-0.5 text-[10px] font-medium text-foreground/70";

const CareerAndEducation = () => {
  return (
    <div className="flex gap-10 align-top">
      <SectionHeader
        label="Career & Education"
        title="경력 및 교육 이수"
      />
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={CAREER_ITEMS[0]?.id}
      >
        {CAREER_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className={triggerClassName}>
              <div className="flex w-full items-center justify-between gap-6">
                <div className={metaWrapperClassName}>
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={avatarClassName}
                    aria-label={`${item.company} 홈페이지`}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.company} 로고`}
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <span className={titleClassName}>{item.role}</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${companyClassName} ${linkClassName}`}
                      >
                        {item.company}
                      </Link>
                      {item.badge?.map((badge) => (
                        <span
                          key={`${item.id}-${badge}`}
                          className={badgeClassName}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className={periodClassName}>{item.period}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className={contentClassName}>
              <ul className={listClassName}>
                {item.highlights.map((highlight) => (
                  <li key={highlight}> - {highlight}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CareerAndEducation;
