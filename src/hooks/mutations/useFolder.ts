import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFolders, putFolders } from "@/services/client/folders";
import { queryKeys } from "@/constants/queryKeys";

export const useAddFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFolders,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders.all() });
    },
  });
};

export const usePutFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putFolders,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.folders.all() });
    },
  });
};
