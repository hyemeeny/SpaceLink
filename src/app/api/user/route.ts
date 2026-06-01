import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import API_URL from "@/constants/config";

export async function GET() {
  try {
    const token = cookies().get("accessToken")?.value;

    // 로그인 안 된 상태
    if (!token) {
      return NextResponse.json(null, { status: 200 });
    }

    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    // 토큰 만료 > 로그인 안 된 상태로 간주
    if (!response.ok) {
      return NextResponse.json(null, { status: 200 });
    }

    const user = await response.json();

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("유저 조회 실패:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
