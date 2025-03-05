import Image from "next/image";
import Lottie from "lottie-react";
import stars from "@/assets/lotties/stars.json";

const SubSection03 = () => {
  return (
    <section className="flex items-center justify-center gap-x-40 h-[calc(100vh-101px)]">
      <div className="flex flex-col items-center gap-y-5">
        <h3 className="text-2xl md:text-5xl font-bold leading-10">
          저장한 링크를
          <br className="hidden md:block" />
          <span className="gradient-sub-text4"> 즐겨찾기</span>해 보세요
        </h3>
        <p className="text-gray01 text-sm">중요한 정보들을 즐겨찾기로 모아둘 수 있어요.</p>
      </div>
      <Lottie animationData={stars} className="w-[500px]" />
      {/* <Image
        className="h-auto w-full md:w-[385px] lg:w-[550px]"
        src="/images/sub_img4.svg"
        width={550}
        height={0}
        alt="sub image1"
      /> */}
    </section>
  );
};

export default SubSection03;
