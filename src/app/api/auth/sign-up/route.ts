import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axiosInstance";

interface signupProps {
  name: string;
  email: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password }: signupProps = await req.json();
    const response = await axiosInstance.post("/auth/sign-up", {
      name,
      email,
      password,
    });
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
};
