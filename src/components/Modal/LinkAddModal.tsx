import { zodResolver } from "@hookform/resolvers/zod";
import { LinkFolderAddSchema, LinkAddFormValues, LinkFolderAddFormValues } from "@/schema/zodSchema";
import { useForm, UseFormReset } from "react-hook-form";
import clsx from "clsx";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { postLinks } from "@/actions/links";
import { FolderType } from "@/types/folders";
import { useFolderStore } from "@/store/useFolderStore";
import { useModalStore } from "@/store/useModalStore";
import { ModalContainer, Header, Content, Button } from "@/components/Modal/ModalContainer";
import { IoCheckmarkCircle } from "react-icons/io5";

interface LinkAddModalProps {
  folders: FolderType[];
  url: string;
  reset: UseFormReset<LinkAddFormValues>;
}

const LinkAddModal = ({ folders, url, reset }: LinkAddModalProps) => {
  const { closeModal } = useModalStore();
  const { folderId, setFolderId } = useFolderStore();

  const {
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<LinkFolderAddFormValues>({
    resolver: zodResolver(LinkFolderAddSchema),
    mode: "onChange",
    defaultValues: { url, folderId: folders.length > 0 ? folders[0].id : 0 },
  });

  const handleAddLink = async (data: LinkFolderAddFormValues) => {
    try {
      await postLinks(data);
      toast.success(toastMessages.success.addLink);
      closeModal("addLink");
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : toastMessages.error.addLink);
    }
  };

  const handleFolderSelection = (id: number) => {
    setFolderId(id);
    setValue("folderId", id);
  };

  return (
    <ModalContainer modalId={"addLink"}>
      <Header>폴더에 추가</Header>
      <Content onSubmit={handleSubmit(handleAddLink)}>
        <ul className="flex flex-col gap-2">
          {folders
            .sort((a, b) => a.id - b.id)
            .map((folder) => (
              <li
                key={folder.id}
                className={clsx(
                  "text-base rounded-lg px-2 py-1",
                  folder.id === folderId ? "bg-gray01 text-purple01" : "text-gray06",
                )}
              >
                <button
                  type="button"
                  onClick={() => handleFolderSelection(folder.id)}
                  className="flex items-center gap-4 w-full"
                >
                  {folder.name}
                  <span className="text-sm text-gray04">{folder.linkCount}개 링크</span>
                  {folder.id === folderId && <IoCheckmarkCircle className="ml-auto text-xl text-purple01" />}
                </button>
              </li>
            ))}
        </ul>
        <Button isValid={isValid} isSubmitting={isSubmitting} label="추가하기" />
      </Content>
    </ModalContainer>
  );
};

export default LinkAddModal;
