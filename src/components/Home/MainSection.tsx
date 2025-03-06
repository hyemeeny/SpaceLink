import Link from "next/link";
import CtaButton from "@/components/Button/CtaButton";
import Lottie from "lottie-react";
import rocket from "@/assets/lotties/rocket.json";

const MainSection = () => {
  return (
    <section className="flex items-center justify-center gap-x-52 h-[calc(100vh-101px)]">
      <div className="flex flex-col gap-y-5">
        <p className="flex flex-col gap-2 font-pyeongChangPeace text-xl font-normal">
          <span>우주의 별처럼 반짝이는 링크를 한곳에 ✨</span>
          <span>나만의 특별한 공간에서 소중한 링크를 모아보세요. 🚀</span>
        </p>
        <h2 className="font-pyeongChangPeace text-3xl md:text-7xl font-bold leading-10 gradient-main-text">
          SpaceLink
        </h2>
        <Link href={"/links"} className="mt-10">
          <CtaButton width="w-[200px] h-[37px] lg:w-[350px]" height="lg:h-[53px]">
            링크 추가하기
          </CtaButton>
        </Link>
      </div>
      <Lottie animationData={rocket} className="w-[600px]" />
    </section>
  );
};

export default MainSection;
