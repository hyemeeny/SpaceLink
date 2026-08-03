import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";
import { getErrorMessage } from "@/lib/apiError";
import toastMessages from "@/lib/toastMessage";

// 폴더별 링크 조회
export const GET = async (req: NextRequest, { params }: { params: { folderId: string } }) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "로그인이 필요해요." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const { folderId } = params;

  try {
    const res = await fetch(`${API_URL}/folders/${folderId}/links?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      const message = getErrorMessage(errorData, res.status, toastMessages.error.getFolderLinks);
      return NextResponse.json({ message }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    console.error("폴더별 링크 조회 중 오류 발생", error);
    return NextResponse.json({ message: "서버와 연결이 원활하지 않아요. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }
};
