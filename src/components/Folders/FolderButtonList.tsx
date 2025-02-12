import Image from "next/image";
import { useFolderStore } from "@/store/useFolderStore";
import { useModalStore } from "@/store/useModalStore";
import { FolderButtonListProps } from "@/types/folders";

const FolderButtonList = ({ handleEditClick, handleDeleteClick, selectedFolder }: FolderButtonListProps) => {
  const { openModal } = useModalStore();
  const { folderId } = useFolderStore();

  return (
    <>
      {folderId !== 0 && (
        <div className="flex gap-3">
          <button
            onClick={() => openModal(`shareFolder-${folderId}`)}
            className="flex items-center gap-1 text-gray04 text-sm font-medium"
          >
            <Image src={"/icons/share.svg"} width={18} height={18} alt="공유" />
            공유
          </button>

          {/* 폴더 이름 변경 */}
          <button
            onClick={() => handleEditClick(selectedFolder!)}
            className="flex items-center gap-1 text-gray04 text-sm font-medium"
          >
            <Image src={"/icons/pen.svg"} width={18} height={18} alt="이름 변경" />
            이름 변경
          </button>

          {/* 폴더 삭제 */}
          <button
            onClick={() => handleDeleteClick(selectedFolder!)}
            className="flex items-center gap-1 text-gray04 text-sm font-medium"
          >
            <Image src={"/icons/delete.svg"} width={18} height={18} alt="삭제" />
            삭제
          </button>
        </div>
      )}
    </>
  );
};

export default FolderButtonList;
