"use client";

import Link from "next/link";
// import Lottie from "lottie-react";
import notfound from "@/assets/lotties/notfound.json";
import CtaButton from "@/components/Button/CtaButton";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Notfound = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-32">
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">404 ERROR</h2>
      <p className="text-gray03 text-sm md:text-base">해당 페이지를 찾을 수 없어요!</p>
      <Lottie animationData={notfound} className="w-[200px] md:w-[300px]" />
      <Link href={"/"}>
        <CtaButton>메인으로 돌아가기</CtaButton>
      </Link>
    </section>
  );
};

export default Notfound;
