import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { Folder } from "@/types/folder";

const getFolders = async (): Promise<Folder[] | null> => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/folders`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json() as Promise<Folder[]>;
  } catch {
    return null;
  }
};

export default getFolders;
