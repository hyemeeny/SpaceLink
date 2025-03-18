"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import CtaButton from "@/components/Button/CtaButton";

const BackButton = () => {
  const router = useRouter();

  return (
    <CtaButton onClick={() => router.back()} className="ml-auto flex items-center justify-center gap-1 md:gap-2 ">
      <FaChevronLeft /> 뒤로가기
    </CtaButton>
  );
};

export default BackButton;
