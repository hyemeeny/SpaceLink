import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormEvent } from "react";
import { Folder } from "@/types/folders";
import { putFolders } from "@/actions/folders";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import BaseInput from "@/components/Input/BaseInput";
import CtaButton from "@/components/Button/CtaButton";

const FolderUpdateSchema = z.object({
  name: z.string().min(1, { message: "폴더 이름을 입력해주세요." }).max(8, { message: "8자리 이내 입력해 주세요." }),
});

interface FolderUpdateModalProps {
  selectedFolder: Folder | null;
  closeModal: (modalId: string) => void;
  defaultName?: string;
}

interface FormValues {
  name: string;
  folderId: number;
}

const FolderUpdateModal = ({ selectedFolder, closeModal, defaultName }: FolderUpdateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(FolderUpdateSchema),
    mode: "onChange",
    defaultValues: {
      name: defaultName,
      folderId: 0,
    },
  });

  const handleUpdateFolder = async (data: FormValues) => {
    if (selectedFolder) {
      await putFolders({ name: data.name, folderId: selectedFolder.id });
      toast.success(toastMessages.success.updateFolder);
      closeModal("updateFolder");
    }
  };

  return (
    <ModalContainer modalId="updateFolder">
      <Header>폴더 이름 변경</Header>
      <Content>
        <form onSubmit={handleSubmit(handleUpdateFolder)} className="flex flex-col gap-4 mt-6 w-[280px]">
          <BaseInput
            type="text"
            id="name"
            placeholder="폴더 이름 입력"
            {...register("name")}
            errors={errors.name?.message}
          />
          <CtaButton type="submit" width="w-[280px]" height="h-[52px]" disabled={!isValid}>
            변경하기
          </CtaButton>
        </form>
      </Content>
    </ModalContainer>
  );
};

export default FolderUpdateModal;
