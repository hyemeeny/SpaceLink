import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async () => {
  try {
    cookies().delete("accessToken");

    return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  } catch (error) {
    console.error("로그아웃 중 오류 발생", error);
    return NextResponse.json({ message: "로그아웃 실패" }, { status: 500 });
  }
};
