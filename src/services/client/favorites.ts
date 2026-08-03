import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { FavoritesParams, ToggleFavoriteParams } from "@/types/favorite";
import { LinksResponse } from "@/types/link";

export const fetchFavorites = async ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: FavoritesParams): Promise<LinksResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("pageSize", String(pageSize));

  const res = await fetch(`/api/favorites?${searchParams.toString()}`);
  if (!res.ok) throw new Error("즐겨찾기 조회 실패");
  return res.json();
};

export const putFavorites = async ({ favorite, linkId }: ToggleFavoriteParams) => {
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
