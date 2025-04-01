"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import FolderShareModal from "@/components/Modal/FolderShareModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import UpdateModal from "@/components/Modal/UpdateModal";
import Pagination from "@/components/Button/Pagination";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const LinksForm = ({ folders, links, folderLinks }: LinksFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { openModals, closeModal } = useModalStore();
  const { folderId, selectedFolder, setFolderId, setSelectedFolder } = useFolderStore();
  const [allLinks, setAllLinks] = useState<LinkType[]>(links.list);
  const [totalCount, setTotalCount] = useState(links.totalCount);

  useEffect(() => {
    if (folderId === ALL_FOLDERS_ID) {
      setAllLinks(links.list);
      setTotalCount(links.totalCount);
    } else {
      const folderData = folderLinks.find((folderLink) => folderLink.folder.id === folderId);
      setAllLinks(folderData ? folderData.links.list : []);
      setTotalCount(folderData ? folderData.links.totalCount : 1);
    }
  }, [folderId, folderLinks, links]);

  const handleFolderClick = (id: number, folder: FolderType | null) => {
    setFolderId(id);
    setSelectedFolder(folder);

    if (currentPage !== 1) {
      router.push("?page=1");
    }
  };

  const handleFolderDelete = (deletedFolderId: number) => {
    if (folderId === deletedFolderId) {
      setFolderId(ALL_FOLDERS_ID);
      setSelectedFolder(null);
      setAllLinks(links.list);
    }
    closeModal(`folderDelete-${deletedFolderId}`);
  };

  if (!links) return <LoadingSpinner />;
  const defaultName = folders.find((folder) => folder.id === folderId)?.name;

  return (
    <>
      <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
          <FolderList folders={folders} handleFolderClick={handleFolderClick} />
          <FolderAddButton />
        </div>

        {folderId === ALL_FOLDERS_ID && <SearchInput />}

        <div className="flex flex-col md:flex-row justify-between gap-3">
          <FolderTitle defaultName={defaultName} />
          <FolderButtonList />
        </div>

        <LinkList currentLinks={allLinks} />

        {allLinks.length > 0 && <Pagination totalCount={totalCount} />}
      </Container>

      <TopButton />

      {/* 폴더 추가 모달 */}
      {openModals.has("addFolder") && <FolderAddModal />}

      {/* 폴더 공유 모달 */}
      {selectedFolder && openModals.has(`folderShare-${selectedFolder.id}`) && (
        <FolderShareModal selectedItem={selectedFolder} />
      )}

      {/* 폴더 수정 모달 */}
      {selectedFolder && openModals.has(`folderUpdate-${selectedFolder.id}`) && (
        <UpdateModal selectedItem={selectedFolder} itemType="folder" defaultName={defaultName} />
      )}

      {/* 폴더 삭제 모달 */}
      {selectedFolder && openModals.has(`folderDelete-${selectedFolder.id}`) && (
        <DeleteModal selectedItem={selectedFolder} itemType="folder" onDelete={handleFolderDelete} />
      )}
    </>
  );
};

export default LinksForm;
