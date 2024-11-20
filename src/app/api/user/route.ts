import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axiosInstance";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest) => {
  try {
    // 쿠키에서 accessToken 가져오기
    const accessToken = cookies().get("accessToken");

    if (!accessToken) {
      return NextResponse.json({ error: "인증 에러" }, { status: 401 });
    }

    // 액세스 토큰을 사용하여 백엔드에서 유저 정보 요청
    const response = await axiosInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 유저 정보 반환
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "유저 조회 오류" }, { status: 500 });
  }
};
