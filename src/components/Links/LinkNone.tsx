import { ReactNode } from "react";
import Lottie from "lottie-react";
import linkNoneLottie from "@/assets/lotties/linkNone.json";

const LinkNone = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <Lottie animationData={linkNoneLottie} className="w-[300px]" />
      <p className="text-base text-gray01">{children}</p>
    </div>
  );
};

export default LinkNone;
