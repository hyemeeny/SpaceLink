import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { LinksResponse } from "@/types/link";

interface GetLinksParams {
  folderId?: number | null;
  page?: number;
  pageSize?: number;
  search?: string;
}

const getLinks = async ({
  folderId,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search,
}: GetLinksParams): Promise<LinksResponse | null> => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));

  try {
    let url: string;

    if (folderId) {
      url = `${API_URL}/folders/${folderId}/links?${params.toString()}`;
    } else {
      if (search) params.set("search", search);
      url = `${API_URL}/links?${params.toString()}`;
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
