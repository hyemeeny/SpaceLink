import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";
import { queryKeys } from "@/constants/queryKeys";
import getUser from "@/services/server/getUser";
import getFolders from "@/services/server/getFolders";
import getLinks from "@/services/server/getLinks";
import LinksContent from "@/components/Links/LinksContent";

interface LinksPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export const metadata = {
  title: "링크 페이지 | SPACELINK",
};

const LinksPage = async ({ searchParams }: LinksPageProps) => {
  const user = await getUser();
  if (!user) redirect("/login");

  const queryClient = getQueryClient();
  const search = searchParams.search;

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

export default LinksPage;
