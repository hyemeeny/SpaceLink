import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";
import { queryKeys } from "@/constants/queryKeys";
import getUser from "@/services/server/getUser";
import getFavorites from "@/services/server/getFavorites";
import FavoritesContent from "@/components/Favorites/FavoritesContent";

export const metadata = {
  title: "즐겨찾기 페이지 | SPACELINK",
};

const FavoritePage = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.links.favorites({}),
    queryFn: () => getFavorites({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FavoritesContent user={user} />
    </HydrationBoundary>
  );
};

export default FavoritePage;
