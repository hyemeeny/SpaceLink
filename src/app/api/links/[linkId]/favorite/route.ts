import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";

// 즐겨찾기 설정
export const PUT = async (req: NextRequest, { params }: { params: { linkId: string } }) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "인증 정보가 유효하지 않습니다." }, { status: 401 });
  }

  const { favorite } = await req.json();
  const { linkId } = params;

  try {
    const res = await fetch(`${API_URL}/links/${linkId}/favorite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ favorite }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message }, { status: res.status });
    }

    return NextResponse.json(await res.json(), { status: res.status });
  } catch (error) {
    console.error("즐겨찾기 설정 중 오류 발생", error);
    return NextResponse.json({ message: "즐겨찾기 설정 실패" }, { status: 500 });
  }
};
