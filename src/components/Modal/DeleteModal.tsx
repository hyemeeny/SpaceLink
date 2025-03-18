import { FormEvent } from "react";
import { deleteFolders } from "@/actions/folders";
import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import { deleteLinks } from "@/actions/links";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import CtaButton from "@/components/Button/CtaButton";
import { useModalStore } from "@/store/useModalStore";

interface DeleteModalProps {
  selectedItem: { id: number; name?: string; url?: string };
  itemType: "folder" | "link";
  onDelete?: (deletedFolderId: number) => void;
}

const DeleteModal = ({ selectedItem, itemType, onDelete }: DeleteModalProps) => {
  const { closeModal } = useModalStore();

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedItem) return;

    try {
      if (itemType === "link") {
        await deleteLinks(selectedItem.id);
        toast.success(toastMessages.success.deleteLink);
      } else if (itemType === "folder") {
        await deleteFolders(selectedItem.id);
        toast.success(toastMessages.success.deleteFolder);
      }

      closeModal(`${itemType}Delete-${selectedItem.id}`);

      if (onDelete) {
        onDelete(selectedItem.id);
      }
    } catch (error) {
      toast.error(itemType === "link" ? toastMessages.error.deleteLink : toastMessages.error.deleteFolder);
    }
  };

  return (
    <ModalContainer modalId={`${itemType}Delete-${selectedItem.id}`}>
      <Header>{itemType === "folder" ? "폴더 삭제" : "링크 삭제"}</Header>
      <Content onSubmit={handleDelete}>
        <p className="text-sm text-gray04 text-center mb-3 text-overflow2">
          {itemType === "folder" ? selectedItem.name : selectedItem.url}
        </p>
        <CtaButton type="submit" variant="red">
          삭제하기
        </CtaButton>
      </Content>
    </ModalContainer>
  );
};

export default DeleteModal;
