import Link from "next/link";
import rocket from "@/assets/lotties/rocket.json";
import Container from "@/components/Layout/Container";
import CtaButton from "@/components/Button/CtaButton";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const MainSection = () => {
  return (
    <Container className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between gap-y-4 md:gap-y-0 screen-height">
      <div className="flex flex-col gap-y-2 md:gap-y-5 text-center lg:text-left">
        <p className="flex flex-col gap-1 md:gap-2 font-pyeongChangPeace text-sm md:text-base lg:text-xl font-normal">
          <span>우주의 별처럼 반짝이는 링크를 한곳에 ✨</span>
          <span>나만의 특별한 공간에서 소중한 링크를 모아보세요. 🚀</span>
        </p>
        <h2 className="font-pyeongChangPeace text-4xl md:text-7xl font-bold pb-4 gradient-text">SpaceLink</h2>
        <Link href={"/links"} className="mt-4 md:mt-10">
          <CtaButton size="large">링크 둘러보기</CtaButton>
        </Link>
      </div>
      <Lottie animationData={rocket} className={"w-[300px] md:w-[500px] lg:w-[600px] mx-auto lg:mx-0"} />
    </Container>
  );
};

export default MainSection;
