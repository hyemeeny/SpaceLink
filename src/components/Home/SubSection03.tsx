import stars from "@/assets/lotties/stars.json";
import ContainerSection from "@/components/Home/ContainerSection";

const SubSection03 = () => {
  return (
    <ContainerSection lottie={stars}>
      <h3 className="text-2xl md:text-5xl font-bold">
        저장한 링크를
        <br className="hidden md:block" />
        <span className="gradient-text"> 즐겨찾기</span>해 보세요
      </h3>
      <p className="text-gray01 text-sm">중요한 정보들을 즐겨찾기로 모아둘 수 있어요.</p>
    </ContainerSection>
  );
};

export default SubSection03;
