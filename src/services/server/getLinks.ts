import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { LinksParams, LinksResponse } from "@/types/link";

const getLinks = async ({
  folderId,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search,
}: LinksParams): Promise<LinksResponse | null> => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("pageSize", String(pageSize));

  try {
    let url: string;

    if (folderId) {
      url = `${API_URL}/folders/${folderId}/links?${searchParams.toString()}`;
    } else {
      if (search) searchParams.set("search", search);
      url = `${API_URL}/links?${searchParams.toString()}`;
    }

    const res = await fetch(url, {
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

export default getLinks;
