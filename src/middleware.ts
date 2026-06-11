import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  if (!accessToken) return redirectToLogin(request);

  try {
    const apiResponse = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // 401만 진짜 인증 실패로 보고 로그인으로
    if (apiResponse.status === 401) return redirectToLogin(request);

    // 그 외 서버 오류, 네트워크 오류는 토큰 있으니 통과
    return NextResponse.next();
  } catch {
    clearTimeout(timeoutId);
    // 타임아웃 포함 모든 오류는 토큰 있으니 통과
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
