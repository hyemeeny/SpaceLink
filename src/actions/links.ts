"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import API_URL from "@/constants/config";

// 링크 조회
export const getLinksById = async (folderId: number) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/folders/${folderId}/links`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["links"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("링크 조회 중 에러 발생", error);
  }
};

// 링크 생성
export const postLinks = async (linkData: { url: string; folderId: number }) => {
  const accessToken = cookies().get("accessToken")?.value;
  // const data = Object.fromEntries(formData.entries()); // Object.fromEntries는 키값 쌍의 목록을 객체로 바꿔준다

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(linkData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    revalidateTag("links");
  } catch (error) {
    console.error("링크 생성 중 에러 발생", error);
  }
};
