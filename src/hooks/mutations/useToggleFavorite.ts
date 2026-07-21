import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFavoriteLinks } from "@/services/client/links";
import { queryKeys } from "@/constants/queryKeys";
import type { LinksResponse } from "@/types/link";

interface ToggleFavoriteParams {
  linkId: number;
  favorite: boolean;
}

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ linkId, favorite }: ToggleFavoriteParams) => putFavoriteLinks({ linkId, favorite }),

    onMutate: async ({ linkId, favorite }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.links.all() });

      const previousQueries = queryClient.getQueriesData<LinksResponse>({ queryKey: queryKeys.links.all() });

      queryClient.setQueriesData<LinksResponse>({ queryKey: queryKeys.links.all() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          list: old.list.map((link) => (link.id === linkId ? { ...link, favorite } : link)),
        };
      });

      return { previousQueries };
    },

    onError: (_err, _variables, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links.all() });
    },
  });
};
