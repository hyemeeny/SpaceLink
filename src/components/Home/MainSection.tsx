import Link from "next/link";
import CtaButton from "@/components/Button/CtaButton";
import Lottie from "lottie-react";
import rocket from "@/assets/lotties/rocket.json";

const MainSection = () => {
  return (
    <section className="flex items-center justify-center gap-x-52 h-[calc(100vh-101px)]">
      <div className="flex flex-col items-center gap-y-5">
        <p className="flex flex-col gap-2 font-pyeongChangPeace text-xl md:text-3xl font-bold text-center">
          <span>Would You</span>
          <span> Like to Link?</span>
        </p>
        <h2 className="font-pyeongChangPeace text-3xl md:text-7xl font-bold text-center leading-10 gradient-main-text">
          우주링크
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
