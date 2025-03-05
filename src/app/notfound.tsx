"use client";

import Lottie from "lottie-react";
import notfoundLottie from "@/assets/lotties/notfound.json";

const Notfound = () => {
  return (
    <div>
      <p>잘못된 페이지입니다</p>
      <Lottie animationData={notfoundLottie} className="w-[600px]" />
    </div>
  );
};

export default Notfound;
