import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkFolderAddSchema, LinkAddFormValues, LinkFolderAddFormValues } from "@/schema/zodSchema";
import { useForm, UseFormReset } from "react-hook-form";
import clsx from "clsx";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { useFolders } from "@/hooks/queries/useFolders";
import { useAddLink } from "@/hooks/mutations/useAddLink";
import { useModalStore } from "@/store/useModalStore";
import Modal from "@/components/Modal/Modal";
import { IoCheckmarkCircle } from "react-icons/io5";

interface LinkAddModalProps {
  url: string;
  reset: UseFormReset<LinkAddFormValues>;
}

const LinkAddModal = ({ url, reset }: LinkAddModalProps) => {
  const { data: folders = [] } = useFolders();
  const { closeModal } = useModalStore();
  const searchParams = useSearchParams();
  const folderId = Number(searchParams.get("folderId"));
  const [folderIdState, setFolderIdState] = useState(folderId);
  const { mutateAsync: addLink, isPending } = useAddLink();

  const selectedFolder = folders.find((folder) => folder.id === folderIdState);
  const modalTitle = selectedFolder ? `${selectedFolder.name}에 추가` : "폴더에 추가";

  console.log("LinkAddModal - folders:", folders);

  const {
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<LinkFolderAddFormValues>({
    resolver: zodResolver(LinkFolderAddSchema),
    mode: "onChange",
    defaultValues: { url, folderId: folderId },
  });

  useEffect(() => {
    if (!folderIdState && folders.length > 0) {
      const defaultId = folders[0].id;
      setFolderIdState(defaultId);
      setValue("folderId", defaultId);
    }
  }, [folders, folderIdState, setValue]);

  const handleAddLink = async (data: LinkFolderAddFormValues) => {
    const validData = { ...data, folderId: data.folderId ?? 0 };
    try {
      await addLink(validData);
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
      isSubmitting={isPending}
    >
      <ul className="flex flex-col gap-2">
        {folders.map((folder) => (
          <li
            key={folder.id}
            className={clsx(
              "text-sm rounded-lg px-3 py-2",
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
