import { useFolderStore } from "@/store/useFolderStore";
import { useModalStore } from "@/store/useModalStore";
import { FolderButtonListProps } from "@/types/folders";
import { FaShare, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const FolderButtonList = ({ handleEditClick, handleDeleteClick, selectedFolder }: FolderButtonListProps) => {
  const { openModal } = useModalStore();
  const { folderId } = useFolderStore();

  const buttons = [
    { id: 1, icon: <FaShare />, label: "공유", onClick: () => openModal(`shareFolder-${folderId}`) },
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
