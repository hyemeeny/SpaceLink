import Image from "next/image";
import Lottie from "lottie-react";
import telescope from "@/assets/lotties/telescope.json";

const SubSection02 = () => {
  return (
    <section className="flex items-center justify-center gap-x-52 h-[calc(100vh-101px)]">
      <div className="flex flex-col items-center gap-y-5">
        <h3 className="text-2xl md:text-5xl font-bold leading-10">
          링크를 폴더로
          <br className="hidden md:block" />
          <span className="gradient-sub-text2">관리</span>하세요
        </h3>
        <p className="text-gray01 text-sm">나만의 폴더를 무제한으로 만들고 다양하게 활용할 수 있습니다.</p>
      </div>
      <Lottie animationData={telescope} className="w-[600px]" />
      {/* <Image
          className="h-auto w-full md:w-[385px] lg:w-[550px]"
          src="/images/sub_img2.svg"
          width={550}
          height={0}
          alt="sub image1"
        /> */}
    </section>
  );
};

export default SubSection02;
