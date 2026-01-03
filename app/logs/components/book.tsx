import Image, { StaticImageData } from "next/image";
import BG_IMAGE from "@assets/images/BG.jpg";
import Link from "next/link";

type BookProps = {
  title: string;
  date: string;
  image?: StaticImageData | string;
  tilt?: "left" | "right";
  slug: string;
};

const BOOK_COVER_COLOR = [
  {
    color: "#BBF351",
    textColor: "#333",
  },
  {
    color: "#FAB900",
    textColor: "#333",
  },
  {
    color: "rgb(231,139,128)",
    textColor: "#FFF",
  },
  {
    color: "rgb(103,136,223)",
    textColor: "#FFF",
  },
  {
    color: "rgb(235,79,47)",
    textColor: "#FFF",
  },
  {
    color: "#FAB900",
    textColor: "#333",
  },
  {
    color: "rgb(231,139,128)",
    textColor: "#FFF",
  },
];

const bookCardHeightClassName = "h-[240px]";
const bookCardShadowClassName =
  "shadow-[2px_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0px_0px_40px_rgba(69,85,81,0.3)]";

const Book = ({ title, date, image, tilt = "left", slug }: BookProps) => {
  const hasImage = Boolean(image);
  const [year, month, day] = date?.split(".") ?? [];
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = Number(month);
  const monthLabel =
    Number.isFinite(monthIndex) && monthIndex >= 1 && monthIndex <= 12
      ? monthLabels[monthIndex - 1]
      : month ?? "";

  const colorIndex =
    title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    BOOK_COVER_COLOR.length;
  const selectedColor = BOOK_COVER_COLOR[colorIndex];
  const tiltClassName =
    tilt === "right"
      ? "rotate-[5deg] hover:rotate-0"
      : "rotate-[-5deg] hover:rotate-0";

  return (
    <Link href={`/logs/${slug}`} className="flex items-end">
      {hasImage ? (
        <>
          <div
            className={`relative cursor-pointer w-[180px] ${bookCardHeightClassName} overflow-hidden rounded-2xl bg-white/60 transition-all duration-300 hover:scale-105 ${bookCardShadowClassName}`}
          >
            <Image
              src={image || BG_IMAGE}
              alt={title}
              fill
              className="object-cover"
              sizes="180px"
            />
            <div
              className="absolute bottom-0 w-full text-xs px-3 py-2 rounded-b-2xl"
              style={{
                backgroundColor: selectedColor.color,
                color: selectedColor.textColor,
              }}
            >
              <span className="block leading-tight">{date}</span>
              <h3 className="text-sm font-semibold leading-tight">{title}</h3>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`relative cursor-pointer mt-3 flex ${bookCardHeightClassName} min-w-[70px] flex-col items-center bg-white overflow-hidden rounded-2xl transition-all duration-300 ${tiltClassName} ${bookCardShadowClassName}`}
        >
          <div className="flex flex-1 items-center justify-center overflow-hidden">
            <h3 className="[writing-mode:vertical-rl] text-center text-md font-semibold text-gray-900 line-clamp-2">
              {title}
            </h3>
          </div>
          <div className="w-full text-xs px-2 py-1 rounded-b-2xl text-center bg-foreground/10 text-foreground/60">
            <span className="block leading-tight">{year}</span>
            <span className="block leading-tight">{monthLabel}</span>
            <span className="block leading-tight">{day}</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default Book;

type PlaceholderBookProps = {
  tilt?: "left" | "right";
  emoji?: string;
};

export const PlaceholderBook = ({
  tilt = "left",
  emoji = "ಇ( ˵ᐛ ˵)ಇ",
}: PlaceholderBookProps) => {
  const tiltClassName =
    tilt === "right"
      ? "rotate-[5deg] hover:rotate-0"
      : "rotate-[-5deg] hover:rotate-0";

  return (
    <div className="group">
      <div
        className={`relative cursor-pointer mt-3 flex w-[180px] ${bookCardHeightClassName} min-w-[70px] items-center justify-center bg-white px-1 overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 ${bookCardShadowClassName}`}
      >
        <span className="text-lg text-gray-700" aria-hidden="true">
          {emoji}
        </span>
        <div className="absolute bottom-0 w-full text-xs px-3 py-2 rounded-b-2xl bg-foreground/10 text-foreground/60">
          <span className="block leading-tight">soon...</span>
          <h3 className="text-sm font-semibold leading-tight">입고 준비중</h3>
        </div>
      </div>
    </div>
  );
};
