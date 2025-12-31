import CareerAndEducation from "./CareerAndEducation";
import Achievements from "./Achievements";
import Profile from "./Profile";

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

const AboutContent = () => {
  return (
    <div className="pt-30 px-10 max-lg:px-4 space-y-10 max-w-[1440px] mx-auto flex flex-col gap-10">
      <Profile />
      <Achievements />
      <CareerAndEducation />
      <section className="rounded-2xl border border-foreground/10 bg-background p-2">
        <div
          className="relative w-full overflow-hidden rounded-xl bg-foreground/5"
          style={{ paddingBottom: "calc(56.25% + 56px)" }}
        >
          <iframe
            title="Figma Portfolio"
            src="https://www.figma.com/embed?embed_host=notion&url=https://www.figma.com/proto/XwoucC5hgcOcnwRNB4U2In/%EA%B6%8C%EC%9C%A4%EC%8A%AC_PPT-%EC%88%98%EC%A0%95%EC%A4%91-?node-id=102-1014&scaling=scale-down"
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
          />
        </div>
      </section>
      {/* <ul className="flex gap-2">
        {TAGS.map((tag) => (
          <li
            key={tag.id}
            className="bg-foreground/5 rounded-full border border-foreground/20 px-2 py-1 text-sm w-fit h-fit"
          >
            {tag.name}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default AboutContent;
