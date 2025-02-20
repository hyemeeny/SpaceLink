import Image from "next/image";

const SubSection04 = () => {
  return (
    <section className="flex flex-col items-center gap-y-10 py-12">
      <div className="flex flex-col md:flex-row-reverse md:items-center md:gap-[51px] lg:gap-[157px]">
        <div>
          <h3 className="text-2xl md:text-5xl font-bold leading-10">
            저장한 링크를
            <br className="hidden md:block" />
            <span className="gradient-sub-text4"> 검색</span>해 보세요
          </h3>
          <p className="text-gray01 text-sm">중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
        </div>
        <Image
          className="h-auto w-full md:w-[385px] lg:w-[550px]"
          src="/images/sub_img4.svg"
          width={550}
          height={0}
          alt="sub image1"
        />
      </div>
    </section>
  );
};

export default SubSection04;
