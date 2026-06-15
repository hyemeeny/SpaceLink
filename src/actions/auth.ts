"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import API_URL from "@/constants/config";

// 로그인
export const loginAction = async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "로그인 실패");
  }

  cookies().set({
    name: "accessToken",
    value: result.accessToken,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/links?login=success");
};

// 회원가입
export const signUpAction = async (data: { email: string; name: string; password: string }) => {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    const error = { message: result.message || "회원가입 실패", field: result.field };
    throw error;
  }

  redirect("/login?signup=success");
};

// 로그아웃
export const logoutAction = async () => {
  cookies().delete("accessToken");
  redirect("/login");
};
