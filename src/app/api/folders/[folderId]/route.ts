import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";

// 폴더 수정
export const PUT = async (req: NextRequest, { params }: { params: { folderId: string } }) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "인증 정보가 유효하지 않습니다." }, { status: 401 });
  }

  const { name } = await req.json();
  const { folderId } = params;

  try {
    const res = await fetch(`${API_URL}/folders/${folderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || "폴더 수정 실패" }, { status: res.status });
    }

    return NextResponse.json(await res.json(), { status: res.status });
  } catch (error) {
    console.error("폴더 수정 중 오류 발생", error);
    return NextResponse.json({ message: "폴더 수정 실패" }, { status: 500 });
  }
};

// 폴더 삭제
export const DELETE = async (_req: NextRequest, { params }: { params: { folderId: string } }) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "인증 정보가 유효하지 않습니다." }, { status: 401 });
  }

  const { folderId } = params;

  try {
    const res = await fetch(`${API_URL}/folders/${folderId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ message: errorData.message || "폴더 삭제 실패" }, { status: res.status });
    }

    return new NextResponse(null, { status: res.status });
  } catch (error) {
    console.error("폴더 삭제 중 오류 발생", error);
    return NextResponse.json({ message: "폴더 삭제 실패" }, { status: 500 });
  }
};
