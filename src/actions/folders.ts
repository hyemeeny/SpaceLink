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

// 폴더 삭제
export const deleteFolders = async (folderId: number) => {
  const accessToken = cookies().get("accessToken")?.value;

  try {
    if (!accessToken) {
      throw new Error("인증 정보가 유효하지 않습니다.");
    }

    const response = await fetch(`${API_URL}/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return { status: response.status, message: errorResponse.message };
    }

    revalidateTag("folders");
    return { status: 204, message: "폴더 삭제 완료" };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 500, message: error.message };
    }
  }
};

// 폴더 카테고리
export const getCategoriesByFolder = async (folderId: number) => {
  const accessToken = cookies().get("accessToken")?.value;

  console.log("Access Token: ", accessToken);
  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  try {
    const response = await fetch(`${API_URL}/folders/${folderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["folders"] },
    });

    return response.json();
  } catch (error) {
    console.error("폴더 조회 중 에러 발생", error);
  }
};

export const getLinks = async (folderId: number) => {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    throw new Error("Access token is missing.");
  }

  try {
    const response = await fetch(`${API_URL}/folders/${folderId}/links`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["folders"] },
    });

    if (!response.ok) {
      throw new Error("링크를 조회하는 데 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    throw new Error("링크 조회 중 에러 발생");
  }
};
