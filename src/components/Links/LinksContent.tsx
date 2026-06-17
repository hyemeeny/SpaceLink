"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import Container from "@/components/Layout/Container";

const LinksContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      toast.success(toastMessages.success.login);
      router.replace("/links");
    }
  }, [router, searchParams]);

  return <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col gap-6">링크 보관소 페이지입니다.</Container>;
};

export default LinksContent;
