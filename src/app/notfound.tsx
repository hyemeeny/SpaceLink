"use client";

import Lottie from "lottie-react";
import notfound from "@/assets/lotties/notfound.json";

const Notfound = () => {
  return (
    <div>
      <p>잘못된 페이지입니다</p>
      <Lottie animationData={notfound} className="w-[600px]" />
    </div>
  );
};

export default Notfound;
