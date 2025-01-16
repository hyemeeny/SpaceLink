"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { LinkProps } from "@/types/links";

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
