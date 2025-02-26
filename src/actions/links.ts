"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import API_URL from "@/constants/config";

// 링크 생성
export const postLinks = async (linkData: { url: string; folderId: number }) => {
  const accessToken = cookies().get("accessToken")?.value;
  // Object.fromEntries는 키값 쌍의 목록을 객체로 바꿔준다
  // const data = Object.fromEntries(formData.entries());

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
      console.error("링크 생성 실패:", errorData);
      return errorData;
    }

    revalidateTag("links");
    return await response.json();
  } catch (error) {
    console.error("링크 생성 중 에러 발생", error);
    throw error;
  }
};

// 링크 수정
export const putLinks = async ({ url, linkId }: { url: string; linkId: number }) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/links/${linkId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    revalidateTag("links");
  } catch (error) {
    console.error("링크 수정 중 오류 발생", error);
  }
};

// 링크 삭제
export const deleteLinks = async (linkId: number) => {
  const accessToken = cookies().get("accessToken")?.value;

  try {
    const response = await fetch(`${API_URL}/links/${linkId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    revalidateTag("links");
  } catch (error) {
    console.error("링크 삭제 중 에러 발생", error);
  }
};

// 링크 즐겨찾기 설정
export const putFavoriteLinks = async ({ favorite, linkId }: { favorite: boolean; linkId: number }) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/links/${linkId}/favorite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ favorite }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    revalidateTag("links");
  } catch (error) {
    console.error("링크 즐겨찾기 설정 중 오류 발생", error);
  }
};
