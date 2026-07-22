"use client";

import { useCallback, useEffect } from "react";
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

const LinksContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const folderIdParam = searchParams.get("folderId");
  const folderId = folderIdParam ? Number(folderIdParam) : null;
  const page = Number(searchParams.get("page") ?? "1");
  const search = searchParams.get("search") ?? undefined;

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

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.replace(`/links?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleFolderSelect = useCallback(
    (newFolderId: number | null) => {
      updateParams({
        folderId: newFolderId === null ? null : String(newFolderId),
        page: null,
      });
    },
    [updateParams],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateParams({ page: String(newPage) });
    },
    [updateParams],
  );

  return (
    <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col gap-6">
      <LinkInput />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
        <FolderList folderId={folderId} onSelect={handleFolderSelect} />
        <FolderAddButton />
      </div>

      <SearchInput search={search} />

      <FolderActions folderId={folderId} />
      <LinkList links={links} isLoading={isLoading} isFetching={isFetching} />
      {totalCount > 0 && (
        <Pagination
          totalCount={totalCount}
          currentPage={page}
          pageSize={DEFAULT_PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default LinksContent;
