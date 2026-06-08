import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import API_URL from "@/constants/config";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message }, { status: response.status });
    }

    cookies().set({
      name: "accessToken",
      value: data.accessToken,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("로그인 중 오류 발생", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
};
