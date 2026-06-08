import { User } from "./types";

export const user = async (): Promise<User | null> => {
  const res = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error(data.message || "유저 조회 실패");
  }

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
    throw new Error(data.message || "이메일 확인 실패");
  }

  return data;
};
