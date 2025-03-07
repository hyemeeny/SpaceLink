import moon from "@/assets/lotties/moon.json";
import ContainerSection from "@/components/Home/ContainerSection";

const SubSection02 = () => {
  return (
    <ContainerSection lottie={moon}>
      <h3 className="text-2xl md:text-5xl font-bold">
        링크를 <span className="gradient-text">폴더</span>로
        <br className="hidden md:block" />
        관리하세요
      </h3>
      <p className="text-gray01 text-sm">나만의 폴더를 무제한으로 만들고 다양하게 활용할 수 있습니다.</p>
    </ContainerSection>
  );
};

export default SubSection02;
