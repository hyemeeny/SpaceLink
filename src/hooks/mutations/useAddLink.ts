import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLinks } from "@/services/client/links";
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
