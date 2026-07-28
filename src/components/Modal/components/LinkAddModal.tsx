import { useEffect, useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { useFolders } from "@/hooks/queries/useFolders";
import { useAddLink } from "@/hooks/mutations/useLink";
import { useModalStore } from "@/store/useModalStore";
import Modal from "@/components/Modal/Modal";
import { IoCheckmarkCircle } from "react-icons/io5";

interface LinkAddModalProps {
  url: string;
  onAdded: () => void;
}

const LinkAddModal = ({ url, onAdded }: LinkAddModalProps) => {
  const { data: folders = [] } = useFolders();
  const { closeModal } = useModalStore();
  const searchParams = useSearchParams();

  // 페이지 전체 뷰 상태(useLinksViewStore)와 별개인, 이 모달 안에서만 쓰는 로컬 선택값.
  // 전역 store의 folderId를 그대로 쓰면 모달에서 고른 폴더가 배후 페이지 뷰까지 바꿔버림.
  const [folderId, setFolderId] = useState<number | null>(() => {
    const param = searchParams.get("folderId");
    return param ? Number(param) : null;
  });
  const { mutateAsync: addLink, isPending } = useAddLink();

  const selectedFolder = folders.find((folder) => folder.id === folderId);
  const modalTitle = selectedFolder ? `${selectedFolder.name}에 추가` : "폴더에 추가";

  useEffect(() => {
    if (folderId === null && folders.length > 0) {
      setFolderId(folders[0].id);
    }
  }, [folders, folderId]);

  const handleAddLink = async () => {
    if (folderId === null) return;
    try {
      await addLink({ url, folderId });
      onAdded();
      closeModal("addLink");
      toast.success(toastMessages.success.addLink);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : toastMessages.error.addLink);
    }
  };

  return (
    <Modal
      modalId="addLink"
      title={modalTitle}
      onSubmit={handleAddLink}
      action="add"
      isValid={folderId !== null}
      isPending={isPending}
    >
      <ul className="flex flex-col gap-2">
        {folders.map((folder) => (
          <li
            key={folder.id}
            className={clsx(
              "text-sm rounded-lg px-3 py-2",
              folder.id === folderId ? "bg-gray01 text-purple01" : "text-gray06",
            )}
          >
            <button type="button" onClick={() => setFolderId(folder.id)} className="flex items-center gap-4 w-full">
              {folder.name}
              <span className="text-sm text-gray04">{folder.linkCount}개 링크</span>
              {folder.id === folderId && <IoCheckmarkCircle className="ml-auto text-xl text-purple01" />}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default LinkAddModal;
