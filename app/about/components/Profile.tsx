import { CommandLineIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import PROFILE_IMAGE from "@assets/images/miseullang.jpg";

const Profile = () => {
  return (
    <div className="flex gap-10">
      <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
        <Image
          src={PROFILE_IMAGE}
          alt="프로필 이미지"
          width={150}
          height={150}
          draggable={false}
          className="select-none"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">About 권윤슬 🌊</h2>
        <div className="flex flex-col text-foreground/70">
          <p>안녕하세요. 웹/앱 프론트엔드 개발자 권윤슬입니다.</p>
          <p>기록하기를 즐기며, 어제의 나보다 성장하기 위해 노력합니다.</p>
        </div>
        <div className="border-l border-foreground pl-4 flex flex-col">
          <a
            href="https://github.com/miseullang"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm text-foreground/60 hover:text-foreground"
          >
            <CommandLineIcon className="h-4 w-4" />
            github.com/miseullang
          </a>
          <a
            href="mailto:miseullang@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm text-foreground/60 hover:text-foreground"
          >
            <EnvelopeIcon className="h-4 w-4" />
            miseullang@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
