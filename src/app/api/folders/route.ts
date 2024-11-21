import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axiosInstance";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const token = cookies().get("accessToken")?.value;

    // console.log("유저 토큰", token);

    if (!token) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const response = await axiosInstance.get("/folders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("폴더 데이터 조회 실패:", error);
      return NextResponse.json({ error: "폴더 데이터를 가져오는 중 오류가 발생했습니다." }, { status: 500 });
    }
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const token = cookies().get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const body = await request.json();
    const { folderName } = body;

    if (!folderName) {
      return NextResponse.json({ error: "폴더 이름이 필요합니다." }, { status: 400 });
    }

    const response = await axiosInstance.post(
      "/folders",
      { name: folderName }, // 폴더 이름 name 필드에 담아 JSON 객체로 보냄
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("폴더 생성 중 실패:", error);
      return NextResponse.json({ error: "폴더를 생성하는 중 오류가 발생했습니다." }, { status: 500 });
    }
  }
};
