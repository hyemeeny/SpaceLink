"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLinks } from "@/hooks/queries/useLinks";
import { useFolders } from "@/hooks/queries/useFolders";
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

  // 마운트당 1회, useLinks 호출 전(렌더 중)에 store를 URL 기준으로 동기화.
  // useEffect로 하면 첫 렌더가 이전 값으로 요청 → 버려짐 → 재요청하는 이중 fetch가 생김.
  const didInit = useRef(false);
  if (!didInit.current) {
    useLinksViewStore.getState().initFromUrl(searchParams);
    didInit.current = true;
  }

  const { folderId, page, search, setPage, setFolderId } = useLinksViewStore();
  const { data: folders = [], isLoading: isFoldersLoading } = useFolders();

  // 현재 보고 있는 folderId가 folders 목록에 더 이상 없으면 자동으로 "전체"로 복귀
  useEffect(() => {
    if (isFoldersLoading) return;
    if (folderId !== null && !folders.some((f) => f.id === folderId)) {
      setFolderId(null);
    }
  }, [folders, isFoldersLoading, folderId, setFolderId]);

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
