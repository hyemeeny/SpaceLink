"use client";

import { useEffect, useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { FolderLinkData, FolderType } from "@/types/folders";
import { LinksFormProps, LinkType } from "@/types/links";
import { useFolderStore } from "@/store/useFolderStore";
import { ALL_FOLDERS_ID } from "@/constants/folderConstants";
import Container from "@/components/Layout/Container";
import SearchInput from "@/components/Input/SearchInput";
import FolderSection from "@/components/Folders/FolderSection";
import LinkList from "@/components/Links/LinkList";
import FolderAddModal from "@/components/Modal/FolderAddModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import UpdateModal from "@/components/Modal/UpdateModal";

const LinksForm = ({ folders, links, folderLinks }: LinksFormProps) => {
  const { openModals, openModal, closeModal } = useModalStore();
  const { folderId, setFolderId } = useFolderStore();
  const [currentLinks, setCurrentLinks] = useState<LinkType[]>(links.list);
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

  useEffect(() => {
    if (folderId === ALL_FOLDERS_ID) {
      setCurrentLinks(links.list);
    } else {
      const folderData = folderLinks.find((folderLink: FolderLinkData) => folderLink.folder.id === folderId);
      setCurrentLinks(folderData ? folderData.links.list : []);
    }
  }, [folderId, folderLinks, links]);

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
        {/* <SearchInput /> */}

        <FolderSection
          folders={folders}
          handleFolderClick={handleFolderClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          selectedFolder={selectedFolder}
          defaultName={defaultName}
        />

        <LinkList currentLinks={currentLinks} />
      </Container>

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
