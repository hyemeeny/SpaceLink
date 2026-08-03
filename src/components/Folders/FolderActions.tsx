import { useFolders } from "@/hooks/queries/useFolders";
import { useModalStore } from "@/store/useModalStore";
import { useLinksViewStore } from "@/store/useLinksViewStore";
import { FaShare, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import FolderShareModal from "@/components/Modal/components/FolderShareModal";
import UpdateModal from "@/components/Modal/components/UpdateModal";
import DeleteModal from "@/components/Modal/components/DeleteModal";

const FolderActions = () => {
  const { activeModal, openModal } = useModalStore();
  const folderId = useLinksViewStore((s) => s.folderId);
  const { data: folders = [] } = useFolders();
  const selectedFolder = folders.find((folder) => folder.id === folderId) ?? null;

  return (
    <div className="flex justify-between">
      <h2 className="text-2xl font-semibold">{selectedFolder ? selectedFolder.name : "전체"}</h2>

      {selectedFolder && (
        <div className="flex gap-3">
          <button
            onClick={() => openModal(`folderShare-${selectedFolder.id}`)}
            className="flex items-center gap-1 text-sm"
          >
            <FaShare /> 공유
          </button>
          <button
            onClick={() => openModal(`folderUpdate-${selectedFolder.id}`)}
            className="flex items-center gap-1 text-sm"
          >
            <FaPencilAlt /> 이름 변경
          </button>
          <button
            onClick={() => openModal(`folderDelete-${selectedFolder.id}`)}
            className="flex items-center gap-1 text-sm"
          >
            <FaTrashAlt /> 삭제
          </button>
        </div>
      )}

      {selectedFolder && (
        <>
          {/* 폴더 공유 모달 */}
          {activeModal === `folderShare-${selectedFolder.id}` && <FolderShareModal selectedItem={selectedFolder} />}
          {/* 폴더 수정 모달 */}
          {activeModal === `folderUpdate-${selectedFolder.id}` && (
            <UpdateModal selectedItem={selectedFolder} itemType="folder" />
          )}
          {/* 폴더 삭제 모달 */}
          {activeModal === `folderDelete-${selectedFolder.id}` && (
            <DeleteModal selectedItem={selectedFolder} itemType="folder" />
          )}
        </>
      )}
    </div>
  );
};

export default FolderActions;
