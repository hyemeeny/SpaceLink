"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { FolderType } from "@/types/folders";
import { LinksFormProps, LinkType } from "@/types/links";
import { useFolderStore } from "@/store/useFolderStore";
import { ALL_FOLDERS_ID } from "@/constants/constants";
import Container from "@/components/Layout/Container";
import SearchInput from "@/components/Input/SearchInput";

import FolderAddButton from "@/components/Button/FolderAddButton";
import TopButton from "@/components/Button/TopButton";
import FolderTitle from "@/components/Folders/FolderTitle";
import FolderList from "@/components/Folders/FolderList";
import FolderButtonList from "@/components/Folders/FolderButtonList";

import LinkList from "@/components/Links/LinkList";
import FolderAddModal from "@/components/Modal/FolderAddModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import UpdateModal from "@/components/Modal/UpdateModal";
import Pagination from "@/components/Button/Pagination";
import Pagination2 from "@/components/Button/Pagination2";

const LinksForm = ({ folders, links, folderLinks }: LinksFormProps) => {
  const { openModals, openModal, closeModal } = useModalStore();
  const { folderId, setFolderId } = useFolderStore();
  const [allLinks, setAllLinks] = useState<LinkType[]>(links.list);
  const [currentLinks, setCurrentLinks] = useState<LinkType[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

  const searchParams = useSearchParams();
  const pageQuery = Number(searchParams.get("page")) || 1; // searchParams에서 검색 쿼리값 추출
  const PAGE_SIZE = Number(searchParams.get("pageSize")) || 12; // searchParams에서 페이지 사이즈 쿼리값 추출
  const searchQuery = searchParams.get("search") || ""; // searchParams에서 검색 쿼리값 추출
  const [currentPage, setCurrentPage] = useState(pageQuery);
  const [totalCount, setTotalCount] = useState(links.totalCount); // totalCount 값 추가
  const [search, setSearch] = useState(searchQuery); // 검색 상태

  useEffect(() => {
    let newLinks: LinkType[];
    if (folderId === ALL_FOLDERS_ID) {
      newLinks = links.list;
      setTotalCount(links.totalCount); // totalCount 갱신
    } else {
      const folderData = folderLinks.find((folderLink) => folderLink.folder.id === folderId);
      newLinks = folderData ? folderData.links.list : [];
      setTotalCount(folderData ? folderData.links.totalCount : 1);
    }

    setAllLinks(newLinks);
    setCurrentPage(1);
  }, [folderId, folderLinks, links]);

  useEffect(() => {
    let filteredLinks = allLinks;

    // 검색어가 있을 경우 필터링
    if (search) {
      filteredLinks = allLinks.filter((link) => link.title.toLowerCase().includes(search.toLowerCase()));
    }

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedLinks = filteredLinks.slice(startIndex, startIndex + PAGE_SIZE);
    setCurrentLinks(paginatedLinks);
  }, [allLinks, currentPage, search, PAGE_SIZE]);

  // 검색어 변경 핸들러
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); // 검색어 변경 시 첫 페이지로 돌아감
  };

  const handleFolderClick = (id: number, folder: FolderType | null) => {
    setFolderId(id);
    setSelectedFolder(folder);
  };

  const handleEditClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    openModal(`folderUpdate-${folder.id}`);
  };

  const handleDeleteClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    openModal(`folderDelete-${folder.id}`);
  };

  // 폴더 삭제 시 페이지네이션에 맞춰 다음 폴더로 넘어가기
  const handleFolderDelete = (deletedFolderId: number) => {
    if (folderId === deletedFolderId) {
      const folderIndex = folders.findIndex((folder) => folder.id === deletedFolderId);

      if (folderIndex !== -1) {
        const nextFolder = folders[folderIndex + 1] || folders[folderIndex - 1] || null;

        if (nextFolder) {
          setFolderId(nextFolder.id);
          setSelectedFolder(nextFolder);
          const nextFolderData = folderLinks.find((folderLink) => folderLink.folder.id === nextFolder.id);
          setCurrentLinks(nextFolderData ? nextFolderData.links.list : []);
        } else {
          setFolderId(ALL_FOLDERS_ID);
          setSelectedFolder(null);
          setCurrentLinks(links.list);
        }
      }
    }
    closeModal(`folderDelete-${deletedFolderId}`);
  };

  const defaultName = folders.find((folder) => folder.id === folderId)?.name;

  return (
    <section>
      <Container className="mt-10 mb-20 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
          <FolderList folders={folders} handleFolderClick={handleFolderClick} />
          <FolderAddButton />
        </div>

        <SearchInput search={search} handleSearchChange={handleSearchChange} />

        <div className="flex flex-col md:flex-row justify-between gap-3">
          <FolderTitle defaultName={defaultName} />
          <FolderButtonList
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            selectedFolder={selectedFolder}
          />
        </div>

        <LinkList currentLinks={currentLinks} />

        {allLinks.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / PAGE_SIZE)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
        {allLinks.length > 0 && <Pagination2 totalCount={links.totalCount} />}
      </Container>

      <TopButton />

      {/* 폴더 추가 모달 */}
      {openModals.has("addFolder") && <FolderAddModal />}

      {/* 폴더 수정 모달 */}
      {selectedFolder && openModals.has(`folderUpdate-${selectedFolder.id}`) && (
        <UpdateModal selectedItem={selectedFolder} itemType="folder" defaultName={defaultName} />
      )}

      {/* 폴더 삭제 모달 */}
      {selectedFolder && openModals.has(`folderDelete-${selectedFolder.id}`) && (
        <DeleteModal selectedItem={selectedFolder} itemType="folder" onDelete={handleFolderDelete} />
      )}
    </section>
  );
};

export default LinksForm;
