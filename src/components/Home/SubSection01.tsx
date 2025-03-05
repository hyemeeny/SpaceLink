import Lottie from "lottie-react";
import galaxy from "@/assets/lotties/galaxy.json";

const SubSection01 = () => {
  return (
    <section className="flex items-center justify-center gap-x-40 h-[calc(100vh-101px)]">
      <div className="flex flex-col items-center gap-y-5">
        <h3 className="text-2xl md:text-5xl font-bold leading-10">
          <span className="gradient-sub-text1">원하는 링크</span>를 <br className="hidden md:block" />
          저장하세요
        </h3>
        <p className="text-gray01 text-sm">
          나중에 읽고 싶은 글, 다시 보고 싶은 영상, 사고 싶은 옷,
          <br /> 기억하고 싶은 모든 것을 한 공간에 저장하세요.
        </p>
      </div>
      <Lottie animationData={galaxy} className="w-[700px]" />
    </section>
  );
};

export default SubSection01;
