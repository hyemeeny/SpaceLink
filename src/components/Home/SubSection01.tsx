import galaxy from "@/assets/lotties/galaxy.json";
import ContainerSection from "@/components/Home/ContainerSection";

const SubSection01 = () => {
  return (
    <ContainerSection lottie={galaxy} image="/images/link.png">
      <h3 className="text-xl md:text-4xl font-bold !leading-tight">
        <span className="gradient-text">나만의 링크</span>를 <br className="hidden lg:block" />
        저장해 보세요
      </h3>
      <p className="text-gray01 text-sm md:text-base">
        나중에 읽고 싶은 글, 다시 보고 싶은 영상 등
        <br /> 기억하고 싶은 모든 것을 한 공간에 저장할 수 있어요.
      </p>
    </ContainerSection>
  );
};

export default SubSection01;
