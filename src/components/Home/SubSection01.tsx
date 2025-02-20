import Image from "next/image";

const SubSection01 = () => {
  return (
    <section className="flex flex-col items-center gap-y-10 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:gap-[51px] lg:gap-[157px]">
        <div>
          <h3 className="text-2xl md:text-5xl font-bold leading-10">
            <span className="gradient-sub-text1">원하는 링크</span>를 <br className="hidden md:block" />
            저장하세요
          </h3>
          <p className="text-gray01 text-sm">
            나중에 읽고 싶은 글, 다시 보고 싶은 영상, 사고 싶은 옷, 기억하고 싶은 모든 것을 한 공간에 저장하세요.
          </p>
        </div>
        <Image
          className="h-auto w-full md:w-[385px] lg:w-[550px]"
          src="/images/sub_img1.svg"
          width={550}
          height={0}
          alt="sub image1"
        />
      </div>
    </section>
  );
};

export default SubSection01;
