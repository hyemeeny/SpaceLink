import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { deleteLinks } from "@/actions/links";
import { deleteFolders } from "@/actions/folders";
import { useModalStore } from "@/store/useModalStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import Modal from "@/components/Modal/Modal";

interface DeleteModalProps {
  selectedItem: { id: number; name?: string; url?: string };
  itemType: "folder" | "link";
  onDelete?: (deletedFolderId: number) => void;
}

const DeleteModal = ({ selectedItem, itemType, onDelete }: DeleteModalProps) => {
  const router = useRouter();
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

        router.push("/links?page=1&pageSize=9");
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
    <Modal
      modalId={`${itemType}Delete-${selectedItem.id}`}
      title={itemType === "folder" ? "폴더 삭제" : "링크 삭제"}
      onSubmit={handleDelete}
      action="delete"
    >
      <p className="text-sm text-gray04 text-center mb-3 text-overflow2">
        {itemType === "folder" ? selectedItem.name : selectedItem.url}
      </p>
    </Modal>
  );
};

export default DeleteModal;
