"use server";

import { cookies } from "next/headers";
import { Login, SignUp } from "@/types/auth";
import API_URL from "@/constants/config";
import { revalidateTag } from "next/cache";

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
      throw new Error("로그인 실패");
    }

    const data = await response.json();

    console.log(data, "로그인 성공!");

    cookies().set({
      name: "accessToken",
      value: data.accessToken,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    revalidateTag("users");
  } catch (error) {
    console.error("로그인 중 오류 발생", error);
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
      throw new Error("회원가입 실패");
    }

    const data = await response.json();

    console.log(data, "회원가입 성공!");
  } catch (error) {
    console.error("회원가입 중 오류 발생", error);
  }
};
