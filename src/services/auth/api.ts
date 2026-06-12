import API_URL from "@/constants/config";
import { ApiError } from "@/types/api";
import { Signup, Login } from "./types";

export const signUp = async (data: Signup): Promise<void> => {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    const error = new Error(result.message || "회원가입 실패") as ApiError;
    error.field = result.field;
    throw error;
  }

  return result;
};

export const login = async (data: Login) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    const error = new Error(result.message || "로그인 실패") as ApiError;
    error.field = result.field;
    throw error;
  }

  return result;
};

export const logout = async () => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  const result = await res.json();

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error(result.message || "로그아웃 실패");
  }

  return result;
};
