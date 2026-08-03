import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";
import { getErrorMessage } from "@/lib/apiError";
import toastMessages from "@/lib/toastMessage";

// 폴더 조회
export const GET = async () => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "로그인이 필요해요." }, { status: 401 });
  }

  try {
    const res = await fetch(`${API_URL}/folders`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      const message = getErrorMessage(errorData, res.status, toastMessages.error.getFolder);
      return NextResponse.json({ message }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    console.error("폴더 조회 중 오류 발생", error);
    return NextResponse.json({ message: "서버와 연결이 원활하지 않아요. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
};

// 폴더 생성
export const POST = async (req: NextRequest) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "로그인이 필요해요." }, { status: 401 });
  }

  const { name } = await req.json();

  try {
    const res = await fetch(`${API_URL}/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const message = getErrorMessage(errorData, res.status, toastMessages.error.addFolder);
      return NextResponse.json({ message }, { status: res.status });
    }

    return NextResponse.json(await res.json(), { status: res.status });
  } catch (error) {
    console.error("폴더 생성 중 오류 발생", error);
    return NextResponse.json({ message: "서버와 연결이 원활하지 않아요. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
};
