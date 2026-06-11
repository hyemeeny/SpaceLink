import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) return redirectToLogin(request);

  return NextResponse.next();
};

const redirectToLogin = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("accessToken");
  return response;
};

export const config = {
  matcher: ["/links/:path*", "/favorite/:path*"],
};
