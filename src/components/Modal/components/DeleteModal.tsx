import { useModalStore } from "@/store/useModalStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import Modal from "@/components/Modal/Modal";
import { useDeleteLink } from "@/hooks/mutations/useLink";
import { useDeleteFolder } from "@/hooks/mutations/useFolder";

interface DeleteModalProps {
  selectedItem: { id: number; name?: string; url?: string };
  itemType: "folder" | "link";
}

const DeleteModal = ({ selectedItem, itemType }: DeleteModalProps) => {
  const { closeModal } = useModalStore();
  const { mutateAsync: deleteLink, isPending: isLinkPending } = useDeleteLink();
  const { mutateAsync: deleteFolder, isPending: isFolderPending } = useDeleteFolder();
  const isPending = itemType === "link" ? isLinkPending : isFolderPending;

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      if (itemType === "link") {
        await deleteLink(selectedItem.id);
        toast.success(toastMessages.success.deleteLink);
      } else {
        await deleteFolder(selectedItem.id);
        toast.success(toastMessages.success.deleteFolder);
      }

      closeModal(`${itemType}Delete-${selectedItem.id}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : itemType === "link"
            ? toastMessages.error.deleteLink
            : toastMessages.error.deleteFolder,
      );
    }
  };

  return (
    <Modal
      modalId={`${itemType}Delete-${selectedItem.id}`}
      title={itemType === "link" ? "링크 삭제" : "폴더 삭제"}
      onSubmit={handleDelete}
      action="delete"
      isPending={isPending}
    >
      <p className="text-sm text-gray04 text-center mb-3 text-overflow2">
        {itemType === "link" ? selectedItem.url : selectedItem.name}
      </p>
    </Modal>
  );
};

export default DeleteModal;
