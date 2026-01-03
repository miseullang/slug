import Image, { StaticImageData } from "next/image";
import BG_IMAGE from "@assets/images/BG.jpg";

type BookProps = {
  title: string;
  date: string;
  image?: StaticImageData | string;
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
    color: "rgb(231,139,128)",
    textColor: "#FFF",
  },
];

const Book = ({ title, date, image }: BookProps) => {
  const hasImage = Boolean(image);
  const [year, month, day] = date.split(".");
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
    monthIndex >= 1 && monthIndex <= 12 ? monthLabels[monthIndex - 1] : month;

  const colorIndex =
    title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    BOOK_COVER_COLOR.length;
  const selectedColor = BOOK_COVER_COLOR[colorIndex];

  return (
    <div className="group">
      {hasImage ? (
        <>
          <div className="relative cursor-pointer w-[180px] h-[240px] overflow-hidden rounded-2xl bg-white/60 transition-all duration-300 hover:rotate-[-5deg] shadow-[2px_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0px_0px_40px_rgba(69,85,81,0.3)]">
            <Image
              src={(image as StaticImageData) || BG_IMAGE}
              alt={title}
              fill
              className="object-cover"
              sizes="180px"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/60 to-transparent" />
          </div>
        </>
      ) : (
        <div className="relative cursor-pointer mt-3 flex h-[240px] min-w-[70px] flex-col items-center bg-white overflow-hidden rounded-2xl transition-all duration-300 hover:rotate-[-5deg] shadow-[2px_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0px_0px_40px_rgba(69,85,81,0.3)]">
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
    </div>
  );
};

export default Book;
