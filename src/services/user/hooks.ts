import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { user } from "./api";

export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: user,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
