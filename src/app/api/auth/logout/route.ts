import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({ message: "로그아웃 성공" });
    response.cookies.set("accessToken", "", { maxAge: 0, path: "/" });
    return response;
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    return NextResponse.json({ error: "로그아웃 실패" }, { status: 500 });
  }
};
