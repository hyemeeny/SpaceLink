import { ReactNode } from "react";
import Image from "next/image";
import Container from "@/components/Layout/Container";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ContainerSection = ({ children, image, lottie }: { children: ReactNode; image: string; lottie: object }) => {
  return (
    <Container className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between gap-y-4 md:gap-y-0 screen-height">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12 border-2 rounded-3xl border-purple01/60 shadow-[0_0_10px_rgba(212,188,255,0.6)] w-fit mx-auto lg:mx-0 px-6 md:px-12 lg:pl-8 pt-8 md:pt-12 lg:pt-0">
        <div className="w-[60vw] md:w-[250px] aspect-[3/5] md:aspect-[3/6] relative">
          <Image src={image} alt={image} fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-y-1 md:gap-y-5 text-center lg:text-left">{children}</div>
      </div>
      <Lottie animationData={lottie} className="w-[300px] md:w-[500px] mx-auto lg:mx-0 hidden lg:block" />
    </Container>
  );
};

export default ContainerSection;
