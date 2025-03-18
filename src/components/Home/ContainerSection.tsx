"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import Container from "@/components/Layout/Container";

const ContainerSection = ({ children, image, lottie }: { children: ReactNode; image: string; lottie: object }) => {
  return (
    <Container className="flex flex-col lg:flex-row lg:items-center justify-center lg:justify-between gap-y-8 lg:gap-y-0 h-[calc(100vh-124px)]">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 border rounded-3xl border-purple01 pt-6 pl-4 pr-4 md:pr-8 md:pt-0">
        <div className="relative w-[250px] aspect-[3/6]">
          <Image src={image} fill alt="link" className="object-contain rounded-lg" />
        </div>
        <div className="flex flex-col gap-y-5 text-center md:text-left">{children}</div>
      </div>
      <Lottie animationData={lottie} className="w-[300px] md:w-[500px] lg:w-[600px] mx-auto lg:mx-0 hidden md:block" />
    </Container>
  );
};

export default ContainerSection;
