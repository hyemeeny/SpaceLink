import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { LinksResponse } from "@/types/link";
import { FavoritesParams } from "@/types/favorite";

const getFavorites = async ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: FavoritesParams): Promise<LinksResponse | null> => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("pageSize", String(pageSize));

  try {
    const res = await fetch(`${API_URL}/favorites?${searchParams.toString()}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json() as Promise<LinksResponse>;
  } catch {
    return null;
  }
};

export default getFavorites;
