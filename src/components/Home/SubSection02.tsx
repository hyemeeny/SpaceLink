import Image from "next/image";

const SubSection02 = () => {
  return (
    <section className="flex flex-col items-center gap-y-10  py-12">
      <div className="flex flex-col md:flex-row-reverse md:items-center md:gap-[51px] lg:gap-[157px]">
        <div>
          <h3 className="text-2xl md:text-5xl font-bold leading-10">
            링크를 폴더로
            <br className="hidden md:block" />
            <span className="gradient-sub-text2">관리</span>하세요
          </h3>
          <p className="text-gray01 text-sm">나만의 폴더를 무제한으로 만들고 다양하게 활용할 수 있습니다.</p>
        </div>
        <Image
          className="h-auto w-full md:w-[385px] lg:w-[550px]"
          src="/images/sub_img2.svg"
          width={550}
          height={0}
          alt="sub image1"
        />
      </div>
    </section>
  );
};

export default SubSection02;
