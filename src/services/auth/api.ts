import { fetcher } from "@/lib/fetcher";
import { Login } from "./types";

export const login = (data: Login) => {
  return fetcher("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const logout = () => {
  return fetcher("/api/auth/logout", {
    method: "POST",
  });
};
