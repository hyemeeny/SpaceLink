import { FormEvent } from "react";
import { FolderType } from "@/types/folders";
import { deleteFolders } from "@/actions/folders";
import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import CtaButton from "@/components/Button/CtaButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { deleteLinks } from "@/actions/links";

interface DeleteModalProps {
  selectedItem: { id: number; name?: string; url?: string } | null;
  closeModal: (modalId: string | number) => void;
  itemType: "folder" | "link"; // 항목 종류 (폴더 또는 링크)
}

const DeleteModal = ({ selectedItem, closeModal, itemType }: DeleteModalProps) => {
  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedItem) return;

    // 삭제 API 호출
    if (itemType === "link") {
      await deleteLinks(selectedItem.id);
      toast.success(toastMessages.success.deleteLink);
    } else if (itemType === "folder") {
      await deleteFolders(selectedItem.id);
      toast.success(toastMessages.success.deleteFolder);
    }

    closeModal(`${itemType}Delete-${selectedItem.id}`);
  };

  if (!selectedItem) return null;

  return (
    <ModalContainer modalId={`${itemType}Delete-${selectedItem.id}`}>
      <Header>{itemType === "folder" ? "폴더 삭제" : "링크 삭제"}</Header>
      <Content>
        <form onSubmit={handleDelete} className="flex flex-col gap-4 mt-3 w-[280px]">
          <h4 className="text-sm text-gray04 text-center mb-3">
            {itemType === "folder" ? selectedItem.name : selectedItem.url}
          </h4>
          <CtaButton type="submit" width="w-[280px]" height="h-[52px]" variant="red">
            삭제하기
          </CtaButton>
        </form>
      </Content>
    </ModalContainer>
  );
};

export default DeleteModal;
