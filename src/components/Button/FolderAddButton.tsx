"use client";

import clsx from "clsx";
import { useTopStore } from "@/store/useTopStore";
import { useModalStore } from "@/store/useModalStore";
import { FiPlus } from "react-icons/fi";

const FolderAddButton = () => {
  const { openModal } = useModalStore();
  const isTopVisible = useTopStore((state) => state.isTopVisible);

  return (
    <button
      onClick={() => openModal("addFolder")}
      className={clsx(
        "flex items-center gap-1 text-base font-medium fixed z-[1] bg-purple01 text-white rounded-[20px] px-7 py-1 md:bg-transparent md:text-purple01 md:text-lg md:min-w-[90px] md:static md:rounded-none md:p-0 transition-all duration-700 ease-in-out",
        isTopVisible ? "bottom-[90%]" : "bottom-8",
      )}
    >
      폴더 추가 <FiPlus />
    </button>
  );
};

export default FolderAddButton;
