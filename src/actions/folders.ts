"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import API_URL from "@/constants/config";

// 폴더 생성
export const postFolders = async (formData: FormData) => {
  const accessToken = cookies().get("accessToken")?.value;
  const data = Object.fromEntries(formData.entries());

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  const response = await fetch(`${API_URL}/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  // if (!response.ok) {
  //   const errorResponse = await response.json();
  //   return {
  //     success: false,
  //     message: errorResponse?.message || "폴더 생성 실패",
  //   };
  // }

  revalidateTag("folders");
  //return { name, success: true, message: "폴더 생성 완료", isError: false };
};
