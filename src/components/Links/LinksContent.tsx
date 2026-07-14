"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFolders } from "@/hooks/queries/useFolders";
import { useLinks } from "@/hooks/queries/useLinks";
import { DEFAULT_PAGE_SIZE } from "@/constants/constants";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import Container from "@/components/Layout/Container";
import LinkInput from "@/components/Input/LinkInput";
import FolderList from "@/components/Folders/FolderList";
import FolderAddButton from "@/components/Button/FolderAddButton";
import LinkList from "@/components/Links/LinkList";
import Pagination from "@/components/Button/Pagination";

const LinksContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [folderId, setFolderId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const search = searchParams.get("search") ?? undefined;

  const { data: folders = [] } = useFolders();
  const { data, isLoading, isFetching } = useLinks({ folderId, page, search });
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

  const handleFolderSelect = (nextFolderId: number | null) => {
    setFolderId(nextFolderId);
    setPage(1);
    // 폴더 선택 시 검색어 초기화
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.replace(`?${params.toString()}`);
  };

  return (
    <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col gap-6">
      <LinkInput folders={folders} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
        <FolderList folders={folders} folderId={folderId} onSelect={handleFolderSelect} />
        <FolderAddButton />
      </div>
      <LinkList links={links} isLoading={isLoading} isFetching={isFetching} />
      <Pagination totalCount={totalCount} currentPage={page} pageSize={DEFAULT_PAGE_SIZE} onPageChange={setPage} />
    </Container>
  );
};

export default LinksContent;
