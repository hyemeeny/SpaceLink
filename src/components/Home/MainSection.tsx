import Link from "next/link";
import CtaButton from "@/components/Button/CtaButton";

const MainSection = () => {
  return (
    <section className="flex flex-col items-center gap-y-10">
      <p className="text-3xl md:text-5xl font-bold text-center leading-10">Would You Like to Link?</p>
      <h2 className="text-3xl md:text-5xl font-bold text-center leading-10 gradient-main-text">우주링크</h2>
      <Link href={"/links"}>
        <CtaButton width="w-[200px] h-[37px] lg:w-[350px]" height="lg:h-[53px]">
          링크 추가하기
        </CtaButton>
      </Link>
    </section>
  );
};

export default MainSection;
