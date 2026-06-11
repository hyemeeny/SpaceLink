import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueryOptions } from "@/constants/queryKeys";
import { signUp, login, logout } from "./api";

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryOptions.queryKey });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(userQueryOptions.queryKey, null);
      queryClient.removeQueries({ queryKey: userQueryOptions.queryKey });
    },
  });
};
