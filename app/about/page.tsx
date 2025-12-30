import Image from "next/image";
import PROFILE_IMAGE from "@assets/images/profile.jpeg";

const TAGS = [
  {
    id: 1,
    name: "책임감이 강한",
  },
  {
    id: 2,
    name: "성장욕구 높은",
  },
  {
    id: 3,
    name: "정리를 잘하는",
  },
];

const AboutPage = () => {
  return (
    <div className="pt-24 px-10 max-lg:px-4">
      <article className="flex gap-10">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
          <Image
            src={PROFILE_IMAGE}
            alt="프로필 이미지"
            width={150}
            height={150}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold">About</h2>
          <p>안녕하세요. 프론트엔드 개발자 권윤슬입니다.</p>
          <ul className="flex gap-2">
            {TAGS.map((tag) => (
              <li
                key={tag.id}
                className="bg-foreground/5 rounded-full border border-foreground/20 px-2 py-1 text-sm w-fit"
              >
                #{tag.name}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
};

export default AboutPage;
