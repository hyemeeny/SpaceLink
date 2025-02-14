import { useFolderStore } from "@/store/useFolderStore";
import { useModalStore } from "@/store/useModalStore";
import { FiPlus } from "react-icons/fi";

const FolderAddButton = () => {
  const { openModal } = useModalStore();

  return (
    <button
      onClick={() => openModal("addFolder")}
      className="flex items-center gap-1 text-base font-medium fixed bottom-8 z-[1] bg-purple01 text-white rounded-[20px] px-7 py-1 md:bg-transparent md:text-purple01 md:text-lg md:min-w-[90px] md:static md:rounded-none md:p-0"
    >
      폴더 추가 <FiPlus />
    </button>
  );
};

export default FolderAddButton;
