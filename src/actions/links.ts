"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { LinkProps } from "@/types/links";

// 링크 조회
export const getLinksById = async (folderId: number): Promise<LinkProps> => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Access token is missing.");
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
      console.error("링크를 조회하는 데 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    throw new Error("링크 조회 중 에러 발생");
  }
};

// 링크 생성
export const postLinks = async (data: { url: string; folderId: number }) => {
  const accessToken = cookies().get("accessToken")?.value;
  // const data = Object.fromEntries(formData.entries()); // Object.fromEntries는 키값 쌍의 목록을 객체로 바꿔준다

  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  try {
    const response = await fetch(`${API_URL}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    console.log("링크 등록", data);

    revalidateTag("links");
  } catch (error) {
    console.error(error);
  }
};
