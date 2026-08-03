import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { LinksParams, LinksResponse, CreateLinkParams, UpdateLinkParams } from "@/types/link";

export const fetchLinks = async ({
  folderId,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search,
}: LinksParams): Promise<LinksResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("pageSize", String(pageSize));
  if (search) searchParams.set("search", search);

  const endpoint = folderId ? `/api/folders/${folderId}/links` : "/api/links";

  const res = await fetch(`${endpoint}?${searchParams.toString()}`);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json();
};

export const postLinks = async (linkData: CreateLinkParams) => {
  const res = await fetch(`/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(linkData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json();
};

export const putLinks = async ({ url, linkId }: UpdateLinkParams) => {
  const res = await fetch(`/api/links/${linkId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json();
};

export const deleteLinks = async (linkId: number) => {
  const res = await fetch(`/api/links/${linkId}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
};
