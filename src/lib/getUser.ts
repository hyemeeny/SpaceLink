import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { User } from "@/types/user";

const getUser = async (): Promise<User | null> => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json() as Promise<User>;
  } catch {
    return null;
  }
};

export default getUser;
