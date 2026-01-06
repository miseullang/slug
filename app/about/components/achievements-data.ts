import type { StaticImageData } from "next/image";
import DX_DIVE_IMAGE from "@assets/images/dive2025.png";
import SW_COMPETITION_IMAGE from "@assets/images/opensource2024.jpg";
import DEV_COURSE_IMAGE from "@assets/images/devcourse.png";

export type AchievementItem = {
  id: number;
  date: string;
  event: string;
  award: string;
  host: string;
  link?: string;
  githubLink?: string;
  deployLink?: string;
  image: StaticImageData;
  summary?: string;
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 1,
    date: "2025/08/24",
    event: "DX DIVE 2025",
    award: "대상(부산광역시장상)",
    host: "부산광역시",
    link: "https://www.busan.com/view/busan/view.php?code=2025082714083007691",
    githubLink: "https://github.com/Busan-Dream",
    deployLink: "https://www.busan-dream.co.kr",
    image: DX_DIVE_IMAGE,
    summary:
      "부산시 청년 인구 유출과 취업난이라는 지역 문제를 데이터 기반으로 해결하고자 했습니다. 공사·공단 채용 데이터를 활용해 AI 모의 면접과 맞춤 질문, 연계 정책을 제공하는 취업 지원 서비스를 구축했습니다.",
  },
  {
    id: 2,
    date: "2024/12/06",
    event: "공개 SW개발자대회",
    award: "SW협회장상(장려상)",
    host: "과학기술정보통신부",
    link: "https://www.kossa.kr/materials/2024/ossp/ebook/index.html",
    githubLink: "https://github.com/Busan-Dream",
    deployLink: "https://www.busan-dream.co.kr",
    image: SW_COMPETITION_IMAGE,
    summary:
      "지하철 이동 시 사용자에게 꼭 필요한 정보가 실제 동선 기준으로 제공되지 않는 문제를 해결하고자 프로젝트를 기획했습니다. 위치 기반으로 엘리베이터·에스컬레이터·환승 동선을 직관적으로 안내하는 모바일 웹 서비스를 개발했습니다.",
  },
  {
    id: 3,
    date: "2025/03/12",
    event: "프로그래머스 데브코스 파이널",
    award: "인기상, 우수상",
    host: "(주)그렙",
    link: "https://programmers.co.kr",
    githubLink: "https://github.com/Busan-Dream",
    deployLink: "https://www.busan-dream.co.kr",
    image: DEV_COURSE_IMAGE,
  },
];
