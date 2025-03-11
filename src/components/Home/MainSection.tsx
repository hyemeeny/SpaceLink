import Link from "next/link";
import rocket from "@/assets/lotties/rocket.json";
import ContainerSection from "@/components/Home/ContainerSection";
import CtaButton from "@/components/Button/CtaButton";

const MainSection = () => {
  return (
    <ContainerSection lottie={rocket}>
      <p className="flex flex-col gap-1 md:gap-2 font-pyeongChangPeace text-sm md:text-base lg:text-xl font-normal">
        <span>우주의 별처럼 반짝이는 링크를 한곳에 ✨</span>
        <span>나만의 특별한 공간에서 소중한 링크를 모아보세요. 🚀</span>
      </p>
      <h2 className="font-pyeongChangPeace text-4xl md:text-7xl font-bold pb-4 gradient-text">SpaceLink</h2>
      <Link href={"/links"} className="mt-4 md:mt-10">
        <CtaButton size="large">링크 둘러보기</CtaButton>
      </Link>
    </ContainerSection>
  );
};

export default MainSection;
