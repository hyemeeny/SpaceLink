import { ReactNode } from "react";
import Lottie from "lottie-react";
import Container from "@/components/Layout/Container";

const ContainerSection = ({ children, lottie }: { children: ReactNode; lottie: object }) => {
  return (
    <Container className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between gap-y-8 lg:gap-y-0 h-[calc(100vh-101px)]">
      <div className="flex flex-col gap-y-5">{children}</div>
      <Lottie animationData={lottie} className="w-[300px] md:w-[500px] lg:w-[600px]" />
    </Container>
  );
};

export default ContainerSection;
