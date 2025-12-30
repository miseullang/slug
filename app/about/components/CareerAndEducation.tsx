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
import LogoLoop from "components/ui/logo-loop";
import {
  SiCssmodules,
  SiReact,
  SiSocketdotio,
  SiTypescript,
} from "react-icons/si";

const CAREER_ITEMS = [
  {
    id: "item-1",
    role: "프론트엔드 개발자 · 시니어 케어 플랫폼 케어벨 BO 개발 및 유지보수",
    company: "@zeroweb",
    badge: ["B2B", "B2C", "B2G"],
    stack: [
      { label: "TypeScript", Icon: SiTypescript },
      { label: "Module CSS", Icon: SiCssmodules },
      { label: "ReactJS", Icon: SiReact },
      { label: "Socket.IO", Icon: SiSocketdotio },
    ],
    period: "2025.05.07 ~ present",
    image: CAREBELL_LOGO,
    link: "https://carebell.kr",
    highlights: [
      {
        title:
          "1. 사내 운영팀 및 B2G, B2B를 위한 백오피스 유지보수 & 신규 기능 개발",
        details: [
          "신규 기능: 시니어 케어 스케줄 관리를 Jira > Timeline과 유사한 형태로 관리할 수 있는 기능 개발",
          "신규 기능: 메인 페이지 대시보드 기능 개발",
        ],
      },
      {
        title: "2. RN 크로스 플랫폼 앱 개발 및 유지보수",
        details: [
          "문제: 일부 안드로이드 환경에서 Google Map 사용 시 앱 크래시 문제 발생",
          "해결: RN 버전을 올려야 해결 가능했으나 의존성 문제로 전체 라이브러리 버전 상승 필요 → patch-package로 node_modules 패치",
        ],
      },
      {
        title: "3. 파트너사 제휴 페이지 FE 파트 주도 개발",
        details: ["페이지 로딩 성능 최적화 및 렌더링 비용 감소 작업 주도"],
      },
      {
        title: "4. 사내 패키지 유지보수",
        details: [
          "라이브러리 의존성 감소 및 사내 유지보수 가능하도록 타입, 상수, 유틸, 공통 컴포넌트를 패키지화",
        ],
      },
      {
        title: "5. Jira 기반 일정 관리 및 Confluence를 활용한 문서화",
        details: [
          "문서화 체계 부재로 OJT 문서 및 트러블슈팅 자료 등 문서화 진행",
        ],
      },
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
const subListClassName = "mt-2 list-disc list-inside space-y-1 pl-6";
const linkClassName = "transition-colors hover:text-foreground";
const badgeClassName =
  "rounded-full border border-foreground/15 px-2 py-0.5 text-[10px] font-medium text-foreground/70";
const stackItemClassName =
  "rounded-full border border-foreground/15 px-3 py-2.5 text-xs font-medium text-foreground/70";
const stackIconClassName = "h-4 w-4 text-foreground/70";

const CareerAndEducation = () => {
  return (
    <div className="flex gap-10 align-top">
      <SectionHeader label="Career & Education" title="경력 및 교육 이수" />
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
              <ul
                className={`${listClassName} ${
                  item.highlights.every((highlight) => typeof highlight === "string")
                    ? "list-disc list-inside"
                    : ""
                }`}
              >
                {item.highlights.map((highlight) => {
                  if (typeof highlight === "string") {
                    return <li key={highlight}>{highlight}</li>;
                  }

                  return (
                    <li key={highlight.title}>
                      <span className="font-semibold">{highlight.title}</span>
                      <ul className={subListClassName}>
                        {highlight.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
              {item.stack?.length ? (
                <LogoLoop
                  logos={item.stack.map(({ label, Icon }) => ({
                    node: (
                      <div
                        className={`inline-flex items-center gap-2 ${stackItemClassName}`}
                      >
                        <Icon className={stackIconClassName} aria-hidden />
                        <span>{label}</span>
                      </div>
                    ),
                    ariaLabel: label,
                  }))}
                  speed={40}
                  gap={12}
                  logoHeight={28}
                  fadeOut
                  fadeOutColor="var(--background)"
                  pauseOnHover
                  ariaLabel={`${item.company} 기술 스택`}
                />
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CareerAndEducation;
