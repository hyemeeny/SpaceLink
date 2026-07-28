import { LinksResponse } from "@/types/link";

interface GetLinksParams {
  folderId?: number | null;
  page?: number;
  pageSize?: number;
  search?: string;
}

export const fetchLinks = async ({ folderId, page = 1, pageSize, search }: GetLinksParams): Promise<LinksResponse> => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (pageSize) params.set("pageSize", String(pageSize));
  if (search) params.set("search", search);

  const endpoint = folderId ? `/api/folders/${folderId}/links` : "/api/links";

  const res = await fetch(`${endpoint}?${params.toString()}`);
  if (!res.ok) throw new Error("링크 조회 실패");
  return res.json();
};

export const fetchFavorites = async (params?: { page?: number; pageSize?: number }) => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize));

  const res = await fetch(`/api/favorites?${searchParams.toString()}`);
  if (!res.ok) throw new Error("즐겨찾기 조회 실패");
  return res.json();
};

export const postLinks = async (linkData: { url: string; folderId: number }) => {
  const res = await fetch(`/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(linkData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "링크 생성 실패");
  }
  return res.json();
};

export const putLinks = async ({ url, linkId }: { url: string; linkId: number }) => {
  const res = await fetch(`/api/links/${linkId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "링크 수정 실패");
  }
  return res.json();
};

export const deleteLinks = async (linkId: number) => {
  const res = await fetch(`/api/links/${linkId}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "링크 삭제 실패");
  }
};

export const putFavoriteLinks = async ({ favorite, linkId }: { favorite: boolean; linkId: number }) => {
  const res = await fetch(`/api/links/${linkId}/favorite`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ favorite }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json();
};
