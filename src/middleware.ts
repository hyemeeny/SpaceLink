import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import API_URL from "@/constants/config";

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return redirectToLogin(request);
  }

  try {
    // 🔹 로그인된 사용자 정보 조회 API 호출
    const apiResponse = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (apiResponse.status === 401) {
      throw new Error("Unauthorized");
    }

    return NextResponse.next();
  } catch (error) {
    console.error("🔴 Token validation failed:", error);
    return redirectToLogin(request);
  }
};

// 🔹 로그인 페이지로 리디렉트하는 함수
const redirectToLogin = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("accessToken");
  return response;
};

export const config = {
  matcher: ["/links/:path*", "/favorite/:path*"],
};
