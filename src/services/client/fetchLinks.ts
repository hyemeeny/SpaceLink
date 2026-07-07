import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { LinksResponse } from "@/types/link";

interface FetchLinksParams {
  folderId?: number | null;
  page?: number;
  pageSize?: number;
  search?: string;
}

const fetchLinks = async ({
  folderId,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search,
}: FetchLinksParams): Promise<LinksResponse> => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("pageSize", String(pageSize));

  // 폴더별 링크
  if (folderId) {
    const res = await fetch(`/api/folders/${folderId}/links?${params.toString()}`);
    if (!res.ok) throw new Error("links fetch failed");
    return res.json();
  }

  // 전체 링크
  if (search) params.set("search", search);
  const res = await fetch(`/api/links?${params.toString()}`);
  if (!res.ok) throw new Error("links fetch failed");
  return res.json();
};

export default fetchLinks;
