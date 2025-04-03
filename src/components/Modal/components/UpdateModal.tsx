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

interface FormValues {
  value: string;
  itemId: number;
}

interface UpdateModalProps {
  selectedItem: { id: number; name?: string; url?: string };
  itemType: "link" | "folder";
  defaultName?: string;
}

const UpdateModal = ({ selectedItem, itemType }: UpdateModalProps) => {
  const { closeModal } = useModalStore();
  const schema = itemType === "link" ? LinkUpdateSchema : FolderUpdateSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      value: selectedItem.name || "",
      itemId: selectedItem.id || 0,
    },
  });

  useEffect(() => {
    if (selectedItem) {
      reset({
        value: selectedItem.name || selectedItem.url || "",
        itemId: selectedItem.id,
      });
    }
  }, [selectedItem, reset]);

  const updateItem = async (data: FormValues) => {
    if (!selectedItem) return;

    try {
      if (itemType === "link") {
        await putLinks({ url: data.value, linkId: selectedItem.id });
        toast.success(toastMessages.success.updateLink);
      } else if (itemType === "folder") {
        await putFolders({ name: data.value, folderId: selectedItem.id });
        toast.success(toastMessages.success.updateFolder);
      }

      closeModal(`${itemType}Update-${selectedItem.id}`);
    } catch (error) {
      if (itemType === "link") {
        toast.error(error instanceof Error ? error.message : toastMessages.error.updateLink);
      } else {
        toast.error(error instanceof Error ? error.message : toastMessages.error.updateFolder);
      }
    }
  };

  return (
    <Modal
      modalId={`${itemType}Update-${selectedItem.id}`}
      title={itemType === "folder" ? "폴더 이름 변경" : "링크 URL 변경"}
      onSubmit={handleSubmit(updateItem)}
      action="update"
      isValid={isValid}
      isSubmitting={isSubmitting}
    >
      <BaseInput
        type="text"
        id="value"
        placeholder={itemType === "folder" ? "폴더 이름 입력" : "링크 URL 입력"}
        {...register("value")}
        errors={errors.value?.message}
      />
    </Modal>
  );
};

export default UpdateModal;
