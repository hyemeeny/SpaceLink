import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";
import { queryKeys } from "@/constants/queryKeys";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import getFolders from "@/services/server/getFolders";
import getLinks from "@/services/server/getLinks";
import LinksContent from "@/components/Links/LinksContent";

interface LinksPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

const LinksPage = async ({ searchParams }: LinksPageProps) => {
  const queryClient = getQueryClient();
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const search = searchParams.search;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.folders.all(),
      queryFn: getFolders,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.links.list({ folderId: null, page, pageSize: DEFAULT_PAGE_SIZE, search }),
      queryFn: () => getLinks({ folderId: null, page, pageSize: DEFAULT_PAGE_SIZE, search }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LinksContent />
    </HydrationBoundary>
  );
};

export default LinksPage;
