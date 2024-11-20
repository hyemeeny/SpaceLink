import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axiosInstance";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "인증 에러" }, { status: 401 });
    }

    const response = await axiosInstance.get("/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error("유저 조회 오류:", error);
    return NextResponse.json({ error: "유저 조회 오류" }, { status: 401 });
  }
};
