import antenna from "@/assets/lotties/antenna.json";
import ContainerSection from "@/components/Home/ContainerSection";

const SubSection04 = () => {
  return (
    <ContainerSection lottie={antenna}>
      <h3 className="text-2xl md:text-5xl font-bold">
        저장한 링크를
        <br className="hidden md:block" />
        <span className="gradient-text"> 공유</span>해 보세요
      </h3>
      <p className="text-gray01 text-sm">
        여러 링크를 폴더에 담고 공유할 수 있습니다.
        <br /> 가족, 친구, 동료들에게 쉽고 빠르게 링크를 공유해 보세요.
      </p>
    </ContainerSection>
  );
};

export default SubSection04;
