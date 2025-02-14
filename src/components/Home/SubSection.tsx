import Image from "next/image";

const SubSection = () => {
  return (
    <ul className="flex flex-col items-center gap-y-10 bg-white py-12">
      <li className="flex flex-col md:flex-row md:items-center md:gap-[51px] lg:gap-[157px]">
        <div>
          <h3 className="text-2xl md:text-5xl font-bold leading-10">
            <span className="gradient-sub-text1">원하는 링크</span>를 <br className="hidden md:block" />
            저장하세요
          </h3>
          <p className="text-gray07 text-sm">
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
      </li>
      <li className="flex flex-col md:flex-row-reverse md:items-center md:gap-[51px] lg:gap-[157px]">
        <div>
          <h3 className="text-2xl md:text-5xl font-bold leading-10">
            링크를 폴더로
            <br className="hidden md:block" />
            <span className="gradient-sub-text2">관리</span>하세요
          </h3>
          <p className="text-gray07 text-sm">나만의 폴더를 무제한으로 만들고 다양하게 활용할 수 있습니다.</p>
        </div>
        <Image
          className="h-auto w-full md:w-[385px] lg:w-[550px]"
          src="/images/sub_img2.svg"
          width={550}
          height={0}
          alt="sub image1"
        />
      </li>
      <li className="flex flex-col md:flex-row md:items-center md:gap-[51px] lg:gap-[157px]">
        <div>
          <h3 className="text-2xl md:text-5xl font-bold leading-10">
            저장한 링크를
            <br className="hidden md:block" />
            <span className="gradient-sub-text3"> 공유</span>해 보세요
          </h3>
          <p className="text-gray07 text-sm">
            여러 링크를 폴더에 담고 공유할 수 있습니다. 가족, 친구, 동료들에게 쉽고 빠르게 링크를 공유해 보세요.
          </p>
        </div>
        <Image
          className="h-auto w-full md:w-[385px] lg:w-[550px]"
          src="/images/sub_img3.svg"
          width={550}
          height={0}
          alt="sub image1"
        />
      </li>
      <li className="flex flex-col md:flex-row-reverse md:items-center md:gap-[51px] lg:gap-[157px]">
        <div>
          <h3 className="text-2xl md:text-5xl font-bold leading-10">
            저장한 링크를
            <br className="hidden md:block" />
            <span className="gradient-sub-text4"> 검색</span>해 보세요
          </h3>
          <p className="text-gray07 text-sm">중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
        </div>
        <Image
          className="h-auto w-full md:w-[385px] lg:w-[550px]"
          src="/images/sub_img4.svg"
          width={550}
          height={0}
          alt="sub image1"
        />
      </li>
    </ul>
  );
};

export default SubSection;
