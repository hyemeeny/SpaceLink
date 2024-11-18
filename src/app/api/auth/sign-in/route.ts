import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axiosInstance";

interface signinProps {
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { email, password }: signinProps = await req.json();
    const response = await axiosInstance.post("/auth/sign-in", {
      email,
      password,
    });

    const accessToken = response.data.accessToken;
    if (accessToken) {
      const res = NextResponse.json({ message: "로그인 성공" }, { status: 201 });

      res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 1시간
        path: "/",
      });

      return res;
    }

    return NextResponse.json({ error: "Failed to obtain token" }, { status: 401 });
  } catch (error) {
    console.error("로그인 오류 발생:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
