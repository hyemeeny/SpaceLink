import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import BaseInput from "@/components/Input/BaseInput";
import CtaButton from "@/components/Button/CtaButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { putLinks } from "@/actions/links";
import { putFolders } from "@/actions/folders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LinkUpdateSchema, FolderUpdateSchema } from "@/app/schema/zodSchema";
import { useModalStore } from "@/store/useModalStore";

interface FormValues {
  value: string;
  itemId: number;
}

interface UpdateModalProps {
  selectedItem: { id: number; name?: string; url?: string } | null;
  itemType: "link" | "folder";
  defaultName?: string;
}

const UpdateModal = ({ selectedItem, itemType, defaultName }: UpdateModalProps) => {
  const { closeModal } = useModalStore();
  const schema = itemType === "link" ? LinkUpdateSchema : FolderUpdateSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      value: defaultName,
      itemId: selectedItem?.id || 0,
    },
  });

  const handleUpdate = async (data: FormValues) => {
    if (!selectedItem) return;

    if (itemType === "link") {
      await putLinks({ url: data.value, linkId: selectedItem.id });
      toast.success(toastMessages.success.updateLink);
    } else if (itemType === "folder") {
      await putFolders({ name: data.value, folderId: selectedItem.id });
      toast.success(toastMessages.success.updateFolder);
    }

    closeModal(`${itemType}Update-${selectedItem.id}`);
  };

  if (!selectedItem) return null;

  return (
    <ModalContainer modalId={`${itemType}Update-${selectedItem.id}`}>
      <Header>{itemType === "folder" ? "폴더 이름 변경" : "링크 URL 변경"}</Header>
      <Content>
        <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-4 mt-6 w-[280px]">
          <BaseInput
            type="text"
            id="value"
            placeholder={itemType === "folder" ? "폴더 이름 입력" : "링크 URL 입력"}
            {...register("value")}
            errors={errors.value?.message}
          />
          <CtaButton type="submit" width="w-[280px]" height="h-[52px]" disabled={!isValid}>
            변경하기
          </CtaButton>
        </form>
      </Content>
    </ModalContainer>
  );
};

export default UpdateModal;
