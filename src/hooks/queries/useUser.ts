import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/queryKeys";

const fetchUser = async () => {
  const res = await fetch("/api/user");
  return res.json();
};

export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });
};
