import CtaButton from "@/components/Button/CtaButton";
import Image from "next/image";
import Link from "next/link";

const MainSection = () => {
  return (
    <div className="flex flex-col items-center gap-y-10 bg-gray01">
      <h2 className="text-3xl md:text-5xl font-bold text-center leading-10">
        <span className="gradient-main-text">세상의 모든 정보를</span>
        <br /> 쉽게 저장하고
        <br className="lg:hidden" /> 관리해 보세요
      </h2>
      <Link href={"/links"}>
        <CtaButton width="w-[200px] h-[37px] lg:w-[350px]" height="lg:h-[53px]">
          링크 추가하기
        </CtaButton>
      </Link>
      <Image className="h-auto w-[303px] md:w-[650px] lg:w-[1118px]" src="/images/main_img.svg" width={1118} height={0} alt="main image" />
    </div>
  );
};

export default MainSection;
