import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";
import { queryKeys } from "@/constants/queryKeys";
import getFolders from "@/services/server/getFolders";
import getLinks from "@/services/server/getLinks";
import LinksContent from "@/components/Links/LinksContent";

const LinksDataBoundary = async ({ search }: { search?: string }) => {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.folders.all(),
      queryFn: getFolders,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.links.list({ folderId: null, search }),
      queryFn: () => getLinks({ folderId: null, search }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LinksContent />
    </HydrationBoundary>
  );
};

export default LinksDataBoundary;
