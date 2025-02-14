import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postFolders } from "@/actions/folders";
import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import BaseInput from "@/components/Input/BaseInput";
import CtaButton from "@/components/Button/CtaButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { FolderAddSchema, FolderAddFormValues } from "@/app/schema/zodSchema";
import { useModalStore } from "@/store/useModalStore";

const FolderAddModal = () => {
  const { closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FolderAddFormValues>({
    resolver: zodResolver(FolderAddSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleAddFolder = async (data: FolderAddFormValues) => {
    try {
      await postFolders({ name: data.name });
      toast.success(toastMessages.success.addFolder);
      closeModal("addFolder");
    } catch (error) {
      toast.error(toastMessages.error.addFolder);
    }
  };

  return (
    <ModalContainer modalId={"addFolder"}>
      <Header>폴더 추가</Header>
      <Content>
        <form onSubmit={handleSubmit(handleAddFolder)} className="flex flex-col gap-4 mt-6 w-[280px]">
          <BaseInput
            type="text"
            id="name"
            placeholder="폴더 이름 입력"
            {...register("name")}
            errors={errors.name?.message}
          />

          <CtaButton type="submit" width="w-[280px]" height="h-[52px]" disabled={!isValid}>
            추가하기
          </CtaButton>
        </form>
      </Content>
    </ModalContainer>
  );
};

export default FolderAddModal;
