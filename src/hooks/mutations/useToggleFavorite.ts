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

      queryClient.setQueriesData<LinksResponse>({ queryKey: queryKeys.links.all() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          list: old.list.map((link) => (link.id === linkId ? { ...link, favorite } : link)),
        };
      });

      return { previousQueries };
    },

    onSuccess: (_data, { favorite }) => {
      toast.success(favorite ? toastMessages.success.favoriteLink : toastMessages.success.unfavoriteLink);
    },

    onError: (_err, _variables, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      toast.error(toastMessages.error.favoriteLink);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links.all() });
    },
  });
};
