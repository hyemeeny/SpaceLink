import { useQuery } from "@tanstack/react-query";
import { queryKeys, userQueryOptions } from "@/constants/queryKeys";
import { ApiError } from "@/types/api";
import { checkEmail } from "./api";

export const useUser = () => useQuery(userQueryOptions);

export const useCheckEmail = (email: string) => {
  return useQuery<boolean, ApiError>({
    queryKey: queryKeys.checkEmail(email),
    queryFn: () => checkEmail(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 5,
  });
};
