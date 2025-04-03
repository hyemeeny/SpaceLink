import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkFolderAddSchema, LinkAddFormValues, LinkFolderAddFormValues } from "@/schema/zodSchema";
import { useForm, UseFormReset } from "react-hook-form";
import clsx from "clsx";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { postLinks } from "@/actions/links";
import { FolderType } from "@/types/folders";
import { useModalStore } from "@/store/useModalStore";
import Modal from "@/components/Modal/Modal";
import { IoCheckmarkCircle } from "react-icons/io5";

interface LinkAddModalProps {
  folders: FolderType[];
  url: string;
  reset: UseFormReset<LinkAddFormValues>;
}

const LinkAddModal = ({ folders, url, reset }: LinkAddModalProps) => {
  const { closeModal } = useModalStore();
  const searchParams = useSearchParams();
  const folderId = Number(searchParams.get("folderId"));
  const [folderIdState, setFolderIdState] = useState(folderId);

  const selectedFolder = folders.find((folder) => folder.id === folderIdState);
  const modalTitle = selectedFolder ? `${selectedFolder.name}에 추가` : "폴더에 추가";

  const {
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<LinkFolderAddFormValues>({
    resolver: zodResolver(LinkFolderAddSchema),
    mode: "onChange",
    defaultValues: { url, folderId: folderId },
  });

  const handleAddLink = async (data: LinkFolderAddFormValues) => {
    const validData = { ...data, folderId: data.folderId ?? 0 };
    try {
      await postLinks(validData);
      toast.success(toastMessages.success.addLink);
      closeModal("addLink");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : toastMessages.error.addLink);
    }
  };

  const handleFolderSelection = (id: number) => {
    setFolderIdState(id);
    setValue("folderId", id);
  };

  return (
    <Modal
      modalId="addLink"
      title={modalTitle}
      onSubmit={handleSubmit(handleAddLink)}
      action="add"
      isValid={isValid}
      isSubmitting={isSubmitting}
    >
      <ul className="flex flex-col gap-2">
        {folders
          .sort((a, b) => a.id - b.id)
          .map((folder) => (
            <li
              key={folder.id}
              className={clsx(
                "text-base rounded-lg px-2 py-1",
                folder.id === folderIdState ? "bg-gray01 text-purple01" : "text-gray06",
              )}
            >
              <button
                type="button"
                onClick={() => handleFolderSelection(folder.id)}
                className="flex items-center gap-4 w-full"
              >
                {folder.name}
                <span className="text-sm text-gray04">{folder.linkCount}개 링크</span>
                {folder.id === folderIdState && <IoCheckmarkCircle className="ml-auto text-xl text-purple01" />}
              </button>
            </li>
          ))}
      </ul>
    </Modal>
  );
};

export default LinkAddModal;
