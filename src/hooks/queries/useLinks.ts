import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { fetchLinks } from "@/services/client/links";
import { LinksParams } from "@/types/link";

export const useLinks = ({ folderId, page, search }: LinksParams) => {
  return useQuery({
    queryKey: queryKeys.links.list({ folderId, page, search }),
    queryFn: () => fetchLinks({ folderId, page, search }),
    placeholderData: keepPreviousData,
  });
};
