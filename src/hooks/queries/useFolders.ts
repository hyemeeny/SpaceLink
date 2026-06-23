import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import fetchFolders from "@/services/client/fetchFolders";
import { Folder } from "@/types/folder";

export const useFolders = () => {
  return useQuery<Folder[] | null>({
    queryKey: queryKeys.folders.all(),
    queryFn: fetchFolders,
  });
};
