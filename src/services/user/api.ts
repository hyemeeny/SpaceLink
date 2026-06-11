import { ApiError } from "@/types/api";
import { User } from "./types";

export const user = async (): Promise<User | null> => {
  const res = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error("유저 조회 실패");
  }

  const data = await res.json();
  return data;
};

export const checkEmail = async (email: string) => {
  const res = await fetch("/api/users/check-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message) as ApiError;
    error.status = res.status;
    throw error;
  }

  return true;
};
