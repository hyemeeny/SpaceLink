"use client";

import { useModalStore } from "@/store/useModalStore";
import { Folder } from "@/types/folder";
import { FaShare, FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const FolderButtonList = ({ selectedFolder }: { selectedFolder: Folder | null }) => {
  const { openModal } = useModalStore();

  const buttons = [
    { icon: <FaShare />, label: "공유", onClick: () => openModal(`folderShare-${selectedFolder?.id}`) },
    {
      icon: <FaPencilAlt />,
      label: "이름 변경",
      onClick: () => openModal(`folderUpdate-${selectedFolder?.id}`),
    },
    { icon: <FaTrashAlt />, label: "삭제", onClick: () => openModal(`folderDelete-${selectedFolder?.id}`) },
  ];

  return (
    <div className="flex gap-3">
      {buttons.map((button) => (
        <button key={button.label} onClick={button.onClick} className="flex items-center gap-1 text-sm font-medium">
          {button.icon}
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default FolderButtonList;
