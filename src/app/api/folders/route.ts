import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { NextResponse } from "next/server";

export const GET = async () => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return NextResponse.json(null, { status: 401 });

  const res = await fetch(`${API_URL}/folders`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return NextResponse.json(null, { status: res.status });

  const data = await res.json();
  return NextResponse.json(data);
};
