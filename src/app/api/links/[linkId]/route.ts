import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";

// 링크 수정
export const PUT = async (req: NextRequest, { params }: { params: { linkId: string } }) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "인증 정보가 유효하지 않습니다." }, { status: 401 });
  }

  const { url } = await req.json();
  const { linkId } = params;

  try {
    const res = await fetch(`${API_URL}/links/${linkId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || "링크 수정 실패" }, { status: res.status });
    }

    return NextResponse.json(await res.json(), { status: res.status });
  } catch (error) {
    console.error("링크 수정 중 오류 발생", error);
    return NextResponse.json({ message: "링크 수정 실패" }, { status: 500 });
  }
};

// 링크 삭제
export const DELETE = async (_req: NextRequest, { params }: { params: { linkId: string } }) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "인증 정보가 유효하지 않습니다." }, { status: 401 });
  }

  const { linkId } = params;

  try {
    const res = await fetch(`${API_URL}/links/${linkId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message }, { status: res.status });
    }

    return new NextResponse(null, { status: res.status });
  } catch (error) {
    console.error("링크 삭제 중 에러 발생", error);
    return NextResponse.json({ message: "링크 삭제 실패" }, { status: 500 });
  }
};
