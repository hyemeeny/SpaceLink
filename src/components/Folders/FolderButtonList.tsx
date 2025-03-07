import { useFolderStore } from "@/store/useFolderStore";
import { useModalStore } from "@/store/useModalStore";
import { FolderType } from "@/types/folders";
import { FaShare, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const FolderButtonList = () => {
  const { openModal } = useModalStore();
  const { folderId, selectedFolder, setSelectedFolder } = useFolderStore();

  const handleShareClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    openModal(`folderShare-${folder.id}`);
  };

  const handleEditClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    openModal(`folderUpdate-${folder.id}`);
  };

  const handleDeleteClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    openModal(`folderDelete-${folder.id}`);
  };

  const buttons = [
    { id: 1, icon: <FaShare />, label: "공유", onClick: () => handleShareClick(selectedFolder!) },
    { id: 2, icon: <FaPencilAlt />, label: "이름 변경", onClick: () => handleEditClick(selectedFolder!) },
    { id: 3, icon: <FaTrashAlt />, label: "삭제", onClick: () => handleDeleteClick(selectedFolder!) },
  ];

  return (
    <>
      {folderId !== 0 && (
        <div className="flex gap-3">
          {buttons.map((button) => (
            <button key={button.id} onClick={button.onClick} className="flex items-center gap-1 text-sm font-medium">
              {button.icon}
              {button.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default FolderButtonList;
