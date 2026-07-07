import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import fetchLinks from "@/services/client/fetchLinks";
import { LinksResponse } from "@/types/link";

interface UseLinksParams {
  folderId?: number | null;
  page?: number;
  pageSize?: number;
  search?: string;
}

export const useLinks = ({ folderId, page = 1, pageSize = DEFAULT_PAGE_SIZE, search }: UseLinksParams) => {
  return useQuery<LinksResponse>({
    queryKey: queryKeys.links.list({ folderId, page, pageSize, search }),
    queryFn: () => fetchLinks({ folderId, page, pageSize, search }),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
