import { useAddFolder } from "@/hooks/mutations/useFolder";
import { useModalStore } from "@/store/useModalStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderAddSchema, FolderAddFormValues } from "@/schema/zodSchema";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import Modal from "@/components/Modal/Modal";
import BaseInput from "@/components/Input/BaseInput";

const FolderAddModal = () => {
  const { closeModal } = useModalStore();
  const { mutateAsync: addFolder, isPending } = useAddFolder();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<FolderAddFormValues>({
    resolver: zodResolver(FolderAddSchema),
    mode: "onChange",
    defaultValues: { name: "" },
  });

  const handleAddFolder = async (data: FolderAddFormValues) => {
    try {
      await addFolder(data);
      reset();
      closeModal("addFolder");
      toast.success(toastMessages.success.addFolder);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : toastMessages.error.addFolder);
    }
  };

  return (
    <Modal
      modalId="addFolder"
      title="폴더 추가"
      onSubmit={handleSubmit(handleAddFolder)}
      action="add"
      isValid={isValid && isDirty}
      isPending={isPending}
    >
      <BaseInput
        type="text"
        id="name"
        placeholder="폴더 이름 입력"
        {...register("name")}
        errors={errors.name?.message}
      />
    </Modal>
  );
};

export default FolderAddModal;
