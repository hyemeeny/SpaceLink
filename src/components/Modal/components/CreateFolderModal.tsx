import { postFolders } from "@/actions/folders";
import CtaButton from "@/components/Button/CtaButton";
import { useModalStore } from "@/store/modalStore";
import ModalContainer from "../ModalContainer";

const CreateFolderModal = ({ buttonTitle }: { buttonTitle: string }) => {
  return (
    <form action={postFolders}>
      <input
        type="text"
        name="name"
        placeholder="폴더 이름"
        className="input"
      />
      <CtaButton type="submit" width="w-[280px]" height="h-[52px]">
        {buttonTitle}
      </CtaButton>
    </form>
  );
};

export default CreateFolderModal;
