import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queries/queryKeys";
import { login } from "@/actions/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user });
      await queryClient.refetchQueries({ queryKey: queryKeys.user });
    },
  });
};
