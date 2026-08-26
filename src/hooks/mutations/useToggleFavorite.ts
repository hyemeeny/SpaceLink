import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFavorites } from "@/services/client/favorites";
import { queryKeys } from "@/constants/queryKeys";
import type { LinksResponse } from "@/types/link";
import type { ToggleFavoriteParams } from "@/types/favorite";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ linkId, favorite }: ToggleFavoriteParams) => putFavorites({ linkId, favorite }),

    onMutate: async ({ linkId, favorite }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.links.all() });

      const previousQueries = queryClient.getQueriesData<LinksResponse>({ queryKey: queryKeys.links.all() });

      // 즐겨찾기 쿼리가 아닌 목록: favorite 필드만 업데이트
      queryClient.setQueriesData<LinksResponse>(
        {
          queryKey: queryKeys.links.all(),
          predicate: (query) => !query.queryKey.includes("favorites"),
        },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            list: old.list.map((link) => (link.id === linkId ? { ...link, favorite } : link)),
          };
        },
      );

      // 즐겨찾기 쿼리: 해제 시 목록에서 제거
      if (!favorite) {
        queryClient.setQueriesData<LinksResponse>(
          {
            queryKey: queryKeys.links.all(),
            predicate: (query) => query.queryKey.includes("favorites"),
          },
          (old) => {
            if (!old) return old;
            return {
              ...old,
              list: old.list.filter((link) => link.id !== linkId),
            };
          },
        );
      }

      return { previousQueries };
    },

    onError: (_err, _variables, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error(toastMessages.error.favoriteLink);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links.all(), refetchType: "none" });
    },
  });
};
