import { postFolders } from "@/actions/folders";
import { useModalStore } from "@/store/useModalStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderAddSchema, FolderAddFormValues } from "@/schema/zodSchema";
import { ModalContainer, Header, Content, Button } from "@/components/Modal/ModalContainer";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import BaseInput from "@/components/Input/BaseInput";

const FolderAddModal = () => {
  const { closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FolderAddFormValues>({
    resolver: zodResolver(FolderAddSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleAddFolder = async (data: FolderAddFormValues) => {
    try {
      const response = await postFolders({ name: data.name });

      if (!response) {
        toast.error(toastMessages.error.addFolder);
        return;
      }

      toast.success(toastMessages.success.addFolder);
      closeModal("addFolder");
    } catch (error) {
      toast.error(toastMessages.error.addFolder);
    }
  };

  return (
    <ModalContainer modalId={"addFolder"}>
      <Header>폴더 추가</Header>
      <Content onSubmit={handleSubmit(handleAddFolder)}>
        <BaseInput
          type="text"
          id="name"
          placeholder="폴더 이름 입력"
          {...register("name")}
          errors={errors.name?.message}
        />
        <Button isValid={isValid} isSubmitting={isSubmitting} label="추가하기" />
      </Content>
    </ModalContainer>
  );
};

export default FolderAddModal;
