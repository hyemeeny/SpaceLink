import { putFolders } from "@/actions/folders";
import { putLinks } from "@/actions/links";
import { useModalStore } from "@/store/useModalStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkUpdateSchema, FolderUpdateSchema } from "@/schema/zodSchema";
import { ModalContainer, Header, Content, Button } from "@/components/Modal/ModalContainer";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
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

const UpdateModal = ({ selectedItem, itemType, defaultName }: UpdateModalProps) => {
  const { closeModal } = useModalStore();
  const schema = itemType === "link" ? LinkUpdateSchema : FolderUpdateSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      value: defaultName,
      itemId: selectedItem?.id || 0,
    },
  });

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
    <ModalContainer modalId={`${itemType}Update-${selectedItem.id}`}>
      <Header>{itemType === "folder" ? "폴더 이름 변경" : "링크 URL 변경"}</Header>
      <Content onSubmit={handleSubmit(updateItem)}>
        <BaseInput
          type="text"
          id="value"
          placeholder={itemType === "folder" ? "폴더 이름 입력" : "링크 URL 입력"}
          {...register("value")}
          errors={errors.value?.message}
        />
        <Button isValid={isValid} isSubmitting={isSubmitting} label="변경하기" />
      </Content>
    </ModalContainer>
  );
};

export default UpdateModal;
