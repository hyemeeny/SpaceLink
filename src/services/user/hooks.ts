import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { ApiError } from "@/types/api";
import { user, checkEmail } from "./api";

export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: user,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useCheckEmail = (email: string) => {
  return useQuery<boolean, ApiError>({
    queryKey: queryKeys.checkEmail(email),
    queryFn: () => checkEmail(email),
    enabled: !!email,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
