import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postFolders } from "@/actions/folders";
import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import BaseInput from "@/components/Input/BaseInput";
import CtaButton from "@/components/Button/CtaButton";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";

const FolderAddSchema = z.object({
  name: z.string().min(1, { message: "폴더 이름을 입력해주세요." }).max(8, { message: "8자리 이내 입력해 주세요." }),
});

interface FolderAddModalProps {
  closeModal: (modalId: string) => void;
}

interface FormValues {
  name: string;
}

const FolderAddModal = ({ closeModal }: FolderAddModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(FolderAddSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleAddFolder = async (data: FormValues) => {
    if (data.name.trim()) {
      await postFolders({ name: data.name });
      toast.success(toastMessages.success.addFolder);
      closeModal("addFolder");
    } else {
      toast.error(toastMessages.error.addFolder);
    }
  };

  return (
    <ModalContainer modalId="addFolder">
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
