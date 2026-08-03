import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { fetchFavorites } from "@/services/client/favorites";
import { FavoritesParams } from "@/types/favorite";

export const useFavorites = ({ page }: FavoritesParams) => {
  return useQuery({
    queryKey: queryKeys.links.favorites({ page }),
    queryFn: () => fetchFavorites({ page }),
    placeholderData: keepPreviousData,
  });
};
