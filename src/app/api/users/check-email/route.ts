import { NextResponse } from "next/server";
import API_URL from "@/constants/config";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    const response = await fetch(`${API_URL}/users/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("이메일 중복 확인 중 오류 발생", error);
    return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
};
