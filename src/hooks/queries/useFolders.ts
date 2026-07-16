import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { fetchFolders } from "@/services/client/folders";
import { Folder } from "@/types/folder";

export const useFolders = () => {
  return useQuery<Folder[]>({
    queryKey: queryKeys.folders.all(),
    queryFn: fetchFolders,
    staleTime: 1000 * 60 * 5,
  });
};
