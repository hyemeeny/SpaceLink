"use client";

import { SelectedFolderProps } from "@/types/folders";
import { useModalStore } from "@/store/useModalStore";
import FolderAddModal from "@/components/Modal/components/FolderAddModal";
import FolderShareModal from "@/components/Modal/components/FolderShareModal";
import DeleteModal from "@/components/Modal/components/DeleteModal";
import UpdateModal from "@/components/Modal/components/UpdateModal";

const Modals = ({ selectedFolder }: SelectedFolderProps) => {
  const { openModals } = useModalStore();

  return (
    <>
      {/* 폴더 추가 모달 */}
      {openModals.has("addFolder") && <FolderAddModal />}

      {/* 폴더 공유 모달 */}
      {selectedFolder && openModals.has(`folderShare-${selectedFolder.id}`) && (
        <FolderShareModal selectedItem={selectedFolder} />
      )}

      {/* 폴더 수정 모달 */}
      {selectedFolder && openModals.has(`folderUpdate-${selectedFolder.id}`) && (
        <UpdateModal selectedItem={selectedFolder} itemType="folder" />
      )}

      {/* 폴더 삭제 모달 */}
      {selectedFolder && openModals.has(`folderDelete-${selectedFolder.id}`) && (
        <DeleteModal selectedItem={selectedFolder} itemType="folder" />
      )}
    </>
  );
};

export default Modals;
