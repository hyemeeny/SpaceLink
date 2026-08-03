import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLinks, putLinks, deleteLinks } from "@/services/client/links";
import { queryKeys } from "@/constants/queryKeys";

export const useAddLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links.all() });
    },
  });
};

export const usePutLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links.all() });
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.links.all() });
    },
  });
};
