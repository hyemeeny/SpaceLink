import { FormEvent } from "react";
import { Folder } from "@/types/folders";
import { deleteFolders } from "@/actions/folders";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import CtaButton from "@/components/Button/CtaButton";

interface FolderDeleteModalProps {
  selectedFolder: Folder | null;
  closeModal: (modalId: string) => void;
}

const FolderDeleteModal = ({ selectedFolder, closeModal }: FolderDeleteModalProps) => {
  const handleDeleteFolder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFolder) {
      await deleteFolders(selectedFolder.id);
      toast.success(toastMessages.success.deleteFolder);
      closeModal("deleteFolder");
    }
  };

  return (
    <ModalContainer modalId="deleteFolder">
      <Header>폴더 삭제</Header>
      <Content>
        <form onSubmit={handleDeleteFolder} className="flex flex-col gap-4 mt-3 w-[280px]">
          <h4 className="text-sm text-gray04 text-center mb-3">{selectedFolder?.name}</h4>
          <CtaButton type="submit" width="w-[280px]" height="h-[52px]" variant="red">
            삭제하기
          </CtaButton>
        </form>
      </Content>
    </ModalContainer>
  );
};

export default FolderDeleteModal;
