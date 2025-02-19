// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// export const middleware = (request: NextRequest) => {
//   const accessToken = request.cookies.get("accessToken")?.value;

//   if (!accessToken) {
//     const response = NextResponse.redirect(new URL("/login", request.url));
//     response.cookies.delete("accessToken");
//     return response;
//   }

//   if (request.nextUrl.pathname.startsWith("/links")) {
//     return NextResponse.rewrite(new URL("/links", request.url));
//   }

//   if (request.nextUrl.pathname.startsWith("/favorite")) {
//     return NextResponse.rewrite(new URL("/favorite", request.url));
//   }

//   // 요청 헤더 추가
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("Authorization", `Bearer ${accessToken}`);

//   // 응답 생성 및 헤더 추가
//   const response = NextResponse.next({
//     request: { headers: requestHeaders },
//   });
//   response.headers.set("Authorization", `Bearer ${accessToken}`);

//   return response;
// };

// export const config = {
//   matcher: ["/links/:path*", "/favorite/:path*"],
// };

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import API_URL from "./constants/config";

export const middleware = async (request: NextRequest) => {
  let accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    console.log("🔴 accessToken 없음, 자동 로그인 요청");

    // 🔥 /auth/sign-in을 호출하여 새로운 accessToken 요청
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 쿠키 기반 인증 사용
    });

    if (response.ok) {
      const { accessToken: newAccessToken } = await response.json();
      console.log("🟢 새로운 accessToken 갱신 성공");

      const res = NextResponse.next();
      res.cookies.set("accessToken", newAccessToken, { httpOnly: true, path: "/" });
      return res;
    } else {
      console.log("🔴 자동 로그인 실패, 로그인 페이지로 리디렉트");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/links/:path*", "/favorite/:path*"],
};
