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
  image: StaticImageData;
};

export const ACHIEVEMENTS: AchievementItem[] = [
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
