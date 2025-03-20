import moon from "@/assets/lotties/moon.json";
import ContainerSection from "@/components/Home/ContainerSection";

const SubSection02 = () => {
  return (
    <ContainerSection lottie={moon} image="/images/folder.png">
      <h3 className="text-xl md:text-4xl font-bold !leading-tight">
        링크를 <span className="gradient-text">폴더</span>로 <br className="hidden lg:block" />관리해 보세요
      </h3>
      <p className="text-gray01 text-sm md:text-base">나만의 폴더를 만들어서 다양하게 활용할 수 있어요.</p>
    </ContainerSection>
  );
};

export default SubSection02;
