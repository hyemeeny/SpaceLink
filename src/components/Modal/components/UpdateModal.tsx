import { useEffect } from "react";
import { putFolders } from "@/actions/folders";
import { putLinks } from "@/actions/links";
import { useModalStore } from "@/store/useModalStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkUpdateSchema, FolderUpdateSchema } from "@/schema/zodSchema";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import Modal from "@/components/Modal/Modal";
import BaseInput from "@/components/Input/BaseInput";
import { usePutLink } from "@/hooks/mutations/useLink";
import { usePutFolder } from "@/hooks/mutations/useFolder";

interface FormValues {
  value: string;
  itemId: number;
}

interface UpdateModalProps {
  selectedItem: { id: number; name?: string; url?: string };
  itemType: "link" | "folder";
}

const UpdateModal = ({ selectedItem, itemType }: UpdateModalProps) => {
  const { closeModal } = useModalStore();
  const schema = itemType === "link" ? LinkUpdateSchema : FolderUpdateSchema;

  const { mutateAsync: putLink, isPending: isLinkPending } = usePutLink();
  const { mutateAsync: putFolder, isPending: isFolderPending } = usePutFolder();
  const isPending = itemType === "link" ? isLinkPending : isFolderPending;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      value: selectedItem.name || selectedItem.url || "",
      itemId: selectedItem.id || 0,
    },
  });

  useEffect(() => {
    if (selectedItem) {
      reset({
        value: selectedItem.name || selectedItem.url || "",
        itemId: selectedItem.id || 0,
      });
    }
  }, [selectedItem, reset]);

  const updateItem = async (data: FormValues) => {
    if (!selectedItem) return;

    try {
      if (itemType === "link") {
        await putLink({ url: data.value, linkId: selectedItem.id });
        toast.success(toastMessages.success.updateLink);
      } else {
        await putFolder({ name: data.value, folderId: selectedItem.id });
        toast.success(toastMessages.success.updateFolder);
      }

      closeModal(`${itemType}Update-${selectedItem.id}`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : itemType === "link"
            ? toastMessages.error.updateLink
            : toastMessages.error.updateFolder,
      );
    }
  };

  return (
    <Modal
      modalId={`${itemType}Update-${selectedItem.id}`}
      title={itemType === "link" ? "링크 URL 변경" : "폴더 이름 변경"}
      onSubmit={handleSubmit(updateItem)}
      action="update"
      isValid={isValid}
      isPending={isPending}
    >
      <BaseInput
        type="text"
        id="value"
        placeholder={itemType === "link" ? "링크 URL 입력" : "폴더 이름 입력"}
        {...register("value")}
        errors={errors.value?.message}
      />
    </Modal>
  );
};

export default UpdateModal;
