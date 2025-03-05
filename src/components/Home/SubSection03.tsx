import Image from "next/image";

const SubSection03 = () => {
  return (
    <section className="flex items-center justify-center gap-x-52 h-[calc(100vh-101px)]">
      <div className="flex flex-col items-center gap-y-5">
        <h3 className="text-2xl md:text-5xl font-bold leading-10">
          저장한 링크를
          <br className="hidden md:block" />
          <span className="gradient-sub-text3"> 공유</span>해 보세요
        </h3>
        <p className="text-gray01 text-sm">
          여러 링크를 폴더에 담고 공유할 수 있습니다.
          <br /> 가족, 친구, 동료들에게 쉽고 빠르게 링크를 공유해 보세요.
        </p>
      </div>
      <Image
        className="h-auto w-full md:w-[385px] lg:w-[550px]"
        src="/images/sub_img3.svg"
        width={550}
        height={0}
        alt="sub image1"
      />
    </section>
  );
};

export default SubSection03;
