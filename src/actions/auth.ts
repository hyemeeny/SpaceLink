"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { Login, SignUp } from "@/types/auth";
import API_URL from "@/constants/config";

// 로그인
export const login = async (loginData: Login) => {
  try {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("로그인 실패:", errorData);
      return { message: errorData.message };
    }

    const data = await response.json();

    cookies().set({
      name: "accessToken",
      value: data.accessToken,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
      secure: process.env.NODE_ENV === "production",
    });

    revalidateTag("users");
  } catch (error) {
    console.error("로그인 중 오류 발생", error);
    return { message: "서버 오류가 발생했습니다." };
  }
};

// 로그아웃
export const logout = async () => {
  try {
    cookies().delete("accessToken");
    revalidateTag("users");
  } catch (error) {
    console.error("로그아웃 중 오류 발생", error);
    throw error;
  }
};

// 회원가입
export const signUp = async (signUpData: SignUp) => {
  try {
    const response = await fetch(`${API_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("회원가입 실패:", errorData);
      return { message: errorData.message };
    }
  } catch (error) {
    console.error("회원가입 중 오류 발생", error);
    return { message: "서버 오류가 발생했습니다." };
  }
};

// 이메일 중복 확인
export const checkEmail = async ({ email }: { email: string }) => {
  try {
    const response = await fetch(`${API_URL}/users/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return response.status;
  } catch (error) {
    console.error("이메일 중복 확인 중 오류 발생", error);
    return 500;
  }
};
