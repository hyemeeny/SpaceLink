import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { fetchFolders } from "@/services/client/folders";

export const useFolders = () => {
  return useQuery({
    queryKey: queryKeys.folders.all(),
    queryFn: fetchFolders,
    staleTime: 1000 * 60 * 5,
  });
};
