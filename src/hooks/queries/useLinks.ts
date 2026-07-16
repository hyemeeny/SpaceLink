import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { fetchLinks, fetchFavorites } from "@/services/client/links";

export const useLinks = (params: { folderId?: number | null; page?: number; pageSize?: number; search?: string }) => {
  const finalParams = { ...params, pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE };

  return useQuery({
    queryKey: queryKeys.links.list(finalParams),
    queryFn: () => fetchLinks(finalParams),
  });
};

export const useFavoriteLinks = (params: { page?: number; pageSize?: number }) => {
  const finalParams = { ...params, pageSize: params.pageSize ?? DEFAULT_PAGE_SIZE };

  return useQuery({
    queryKey: queryKeys.links.favorites(finalParams),
    queryFn: () => fetchFavorites(finalParams),
  });
};
