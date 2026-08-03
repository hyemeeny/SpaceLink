import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";
import { getErrorMessage } from "@/lib/apiError";
import toastMessages from "@/lib/toastMessage";

// 즐겨찾기 설정
export const PUT = async (req: NextRequest, { params }: { params: { linkId: string } }) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "로그인이 필요해요." }, { status: 401 });
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
      const message = getErrorMessage(errorData, res.status, toastMessages.error.favoriteLink);
      return NextResponse.json({ message }, { status: res.status });
    }

    return NextResponse.json(await res.json(), { status: res.status });
  } catch (error) {
    console.error("링크 수정 중 오류 발생", error);
    return NextResponse.json({ message: "서버와 연결이 원활하지 않아요. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
};
