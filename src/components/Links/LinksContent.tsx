"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLinks } from "@/hooks/queries/useLinks";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import Container from "@/components/Layout/Container";
import LinkInput from "@/components/Input/LinkInput";
import SearchInput from "@/components/Input/SearchInput";
import FolderList from "@/components/Folders/FolderList";
import FolderActions from "@/components/Folders/FolderActions";
import FolderAddButton from "@/components/Folders/FolderAddButton";
import LinkList from "@/components/Links/LinkList";
import Pagination from "@/components/Button/Pagination";
import { useLinksViewStore } from "@/store/useLinksViewStore";

const LinksContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { folderId, page, search, setPage, initFromUrl } = useLinksViewStore();

  useEffect(() => {
    initFromUrl(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 1회만 — URL 최신값으로 스토어 덮어쓰기

  const { data, isLoading, isFetching } = useLinks({
    folderId,
    page,
    search: folderId === null ? search : undefined,
  });
  const links = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  useEffect(() => {
    if (searchParams.get("login") === "success") {
      toast.success(toastMessages.success.login);
      router.replace("/links");
    } else if (searchParams.get("signup") === "success") {
      toast.success(toastMessages.success.signup);
      router.replace("/links");
    }
  }, [router, searchParams]);

  return (
    <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col gap-6">
      <LinkInput />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
        <FolderList />
        <FolderAddButton />
      </div>

      {folderId === null && <SearchInput />}

      <FolderActions />

      <LinkList links={links} isLoading={isLoading} isFetching={isFetching} />

      {totalCount > 0 && (
        <Pagination totalCount={totalCount} currentPage={page} pageSize={DEFAULT_PAGE_SIZE} onPageChange={setPage} />
      )}
    </Container>
  );
};

export default LinksContent;
