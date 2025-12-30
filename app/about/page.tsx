import Image from "next/image";
import PROFILE_IMAGE from "@assets/images/profile.jpeg";
import { CommandLineIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import CareerAndEducation from "./components/CareerAndEducation";
import Achievements from "./components/Achievements";
import Profile from "./components/Profile";

const TAGS = [
  {
    id: 1,
    name: "💪🏻 책임감이 강한",
  },
  {
    id: 2,
    name: "🚀 성장욕구 높은",
  },
  {
    id: 3,
    name: "📝 정리를 잘하는",
  },
];

const AboutPage = () => {
  return (
    <div className="pt-30 px-10 max-lg:px-4 space-y-10 max-w-[1440px] mx-auto flex flex-col gap-10">
      <Profile />
      <Achievements />
      <CareerAndEducation />
      <ul className="flex gap-2">
        {TAGS.map((tag) => (
          <li
            key={tag.id}
            className="bg-foreground/5 rounded-full border border-foreground/20 px-2 py-1 text-sm w-fit h-fit"
          >
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
