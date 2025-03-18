"use client";

import { useEffect, useRef } from "react";
import { useTopStore } from "@/store/useTopStore";
// import Lottie from "lottie-react";
import top from "@/assets/lotties/top.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const TopButton = () => {
  const setIsTopVisible = useTopStore((state) => state.setIsTopVisible);
  const topRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!topRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(topRef.current);

    return () => observer.disconnect();
  }, [setIsTopVisible]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button ref={topRef} onClick={handleScrollToTop} className="block w-[250px] m-auto text-white md:hidden">
      <span className="text-base block -mb-4">맨 위로 이동</span> <Lottie animationData={top} className="mr-6" />
    </button>
  );
};

export default TopButton;
