import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) return redirectToLogin(request);

  try {
    const apiResponse = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    // 401만 진짜 인증 실패로 보고 로그인으로
    if (apiResponse.status === 401) return redirectToLogin(request);

    // 그 외 서버 오류, 네트워크 오류는 토큰 있으니 통과
    return NextResponse.next();
  } catch {
    // API 서버 문제일 수 있으니 토큰 있으면 통과
    return NextResponse.next();
  }
};

const redirectToLogin = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("accessToken");
  return response;
};

export const config = {
  matcher: ["/links/:path*", "/favorite/:path*"],
};
