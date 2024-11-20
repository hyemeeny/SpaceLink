// app/logout/route.ts (API 라우트)
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.redirect("/login");
    response.cookies.delete("accessToken"); // 쿠키 삭제
    console.log("쿠키 삭제 성공");
    return response;
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    return NextResponse.json({ error: "로그아웃 실패" }, { status: 500 });
  }
}
