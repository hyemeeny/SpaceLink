"use client";

import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "@/types/user";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import { useFavorites } from "@/hooks/queries/useFavorites";
import { useFavoritesViewStore } from "@/store/useFavoritesViewStore";
import Container from "@/components/Layout/Container";
import LinkList from "@/components/Links/LinkList";
import Pagination from "@/components/Button/Pagination";
import BackButton from "@/components/Button/BackButton";
import { FaStar } from "react-icons/fa";

const FavoritesContent = ({ user }: { user: User }) => {
  const searchParams = useSearchParams();

  const didInit = useRef(false);
  if (!didInit.current) {
    useFavoritesViewStore.getState().initFromUrl(searchParams);
    didInit.current = true;
  }

  const page = useFavoritesViewStore((s) => s.page);
  const setPage = useFavoritesViewStore((s) => s.setPage);
  const { data, isLoading, isFetching } = useFavorites({ page });
  const links = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col items-center gap-6">
      <h2 className="flex items-center gap-2 text-2xl md:text-4xl lg:text-5xl mb-12">
        <FaStar className="text-yellow-400" />
        <span className="font-semibold">{user.name}</span>의 즐겨찾기
      </h2>
      <BackButton />
      <LinkList links={links} isLoading={isLoading} isFetching={isFetching} />
      {totalCount > 0 && (
        <Pagination totalCount={totalCount} currentPage={page} pageSize={DEFAULT_PAGE_SIZE} onPageChange={setPage} />
      )}
    </Container>
  );
};

export default FavoritesContent;
