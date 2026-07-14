import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import API_URL from "@/constants/config";

export const GET = async (req: NextRequest) => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return NextResponse.json(null, { status: 401 });

  const { searchParams } = new URL(req.url);

  const res = await fetch(`${API_URL}/links?${searchParams.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return NextResponse.json(null, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
};
