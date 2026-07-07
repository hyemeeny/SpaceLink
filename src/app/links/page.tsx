import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import LinksContent from "@/components/Links/LinksContent";
import getFolders from "@/services/server/getFolders";
import getLinks from "@/services/server/getLinks";
import { queryKeys } from "@/constants/queryKeys";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";

interface LinksPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

const LinksPage = async ({ searchParams }: LinksPageProps) => {
  const queryClient = new QueryClient();
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
