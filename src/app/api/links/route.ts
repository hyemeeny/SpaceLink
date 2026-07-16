import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";

// 링크 조회
export const GET = async (req: NextRequest) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "인증 정보가 유효하지 않습니다." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  try {
    const res = await fetch(`${API_URL}/links?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || "링크 조회 실패" }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    console.error("링크 조회 중 에러 발생", error);
    return NextResponse.json({ message: "링크 조회 실패" }, { status: 500 });
  }
};

// 링크 생성
export const POST = async (req: NextRequest) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "인증 정보가 유효하지 않습니다." }, { status: 401 });
  }

  const linkData = await req.json();

  try {
    const res = await fetch(`${API_URL}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(linkData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || "링크 생성 실패" }, { status: res.status });
    }

    return NextResponse.json(await res.json(), { status: res.status });
  } catch (error) {
    console.error("링크 생성 중 에러 발생", error);
    return NextResponse.json({ message: "링크 생성 실패" }, { status: 500 });
  }
};
