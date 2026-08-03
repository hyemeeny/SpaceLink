"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import API_URL from "@/constants/config";
import { SignupFormValues, LoginFormValues } from "@/schema/zodSchema";

const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 2; // 2시간

const setAuthCookie = (token: string) => {
  cookies().set({
    name: "accessToken",
    value: token,
    maxAge: ACCESS_TOKEN_MAX_AGE,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

// 로그인
export const loginAction = async (data: LoginFormValues) => {
  const response = await fetch(`${API_URL}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    return { success: false, message: result.message };
  }

  setAuthCookie(result.accessToken);
  redirect("/links?login=success");
};

// 회원가입 (성공 시 자동 로그인)
export const signUpAction = async (data: SignupFormValues) => {
  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    return { success: false, message: result.message, field: result.field };
  }

  setAuthCookie(result.accessToken);
  redirect("/links?signup=success");
};

// 로그아웃
export const logoutAction = () => {
  cookies().delete("accessToken");
  redirect("/login");
};
