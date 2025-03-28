"use client";

import { ReactNode } from "react";
import linkNoneLottie from "@/assets/lotties/linkNone.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LinkNone = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center mt-12 md:mt-20 lg:mt-0">
      <Lottie animationData={linkNoneLottie} className="w-[200px] md:w-[300px]" />
      <p className="text-base text-gray01">{children}</p>
    </div>
  );
};

export default LinkNone;
