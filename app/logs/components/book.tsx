import Image, { StaticImageData } from "next/image";
import BG_IMAGE from "@assets/images/BG.jpg";

type BookProps = {
  title: string;
  date: string;
  image?: StaticImageData | string;
};

const Book = ({ title, date, image }: BookProps) => {
  const hasImage = Boolean(image);

  return (
    <div className="group">
      {hasImage ? (
        <>
          <div className="relative w-[180px] h-[240px] overflow-hidden rounded-2xl bg-white/60 transition-all duration-300 hover:rotate-[-5deg] shadow-[2px_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0px_0px_40px_rgba(69,85,81,0.3)]">
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
        <div className="mt-3 space-y-1 px-1 min-w-[70px] h-[240px] bg-white overflow-hidden rounded-2xl transition-all duration-300 hover:rotate-[-5deg] shadow-[2px_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0px_0px_40px_rgba(69,85,81,0.3)]">
          <p className="text-xs text-gray-500">{date}</p>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Book;
