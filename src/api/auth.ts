import { axiosInstance } from "@/lib/axiosInstance";

// 로그인 API 요청
export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/sign-in", {
    email,
    password,
  });
  return response.data;
};

// 회원가입 API 요청
export const SignupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axiosInstance.post("/auth/sign-up", {
    name,
    email,
    password,
  });
  return response.data;
};
