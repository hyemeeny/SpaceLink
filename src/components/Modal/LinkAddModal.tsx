import { zodResolver } from "@hookform/resolvers/zod";
import { LinkAddSchema, LinkAddFormValues } from "@/app/schema/zodSchema";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { postLinks } from "@/actions/links";
import { FolderType } from "@/types/folders";
import { useFolderStore } from "@/store/useFolderStore";
import { useModalStore } from "@/store/useModalStore";
import CtaButton from "@/components/Button/CtaButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";

const LinkAddModal = ({ folders, url }: { folders: FolderType[]; url: string }) => {
  const { closeModal } = useModalStore();
  const { folderId, setFolderId } = useFolderStore();

  const {
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<LinkAddFormValues>({
    resolver: zodResolver(LinkAddSchema),
    mode: "onChange",
    defaultValues: { url, folderId: folders.length > 0 ? folders[0].id : 0 },
  });

  // useEffect(() => {
  //   setValue("url", url); // 모달이 열릴 때 URL 업데이트
  //   setValue("folderId", folderId); // ✅ 폴더 ID 업데이트
  // }, [url, folderId, setValue]);

  const handleAddLink = async (data: LinkAddFormValues) => {
    try {
      await postLinks(data);
      toast.success(toastMessages.success.addLink);
      closeModal("addLink");
    } catch (error) {
      toast.error(toastMessages.error.addLink);
    }
  };

  const handleFolderSelection = (id: number) => {
    setFolderId(id);
    setValue("folderId", id);
  };

  return (
    <ModalContainer modalId={"addLink"}>
      <Header>폴더에 추가</Header>
      <Content>
        <form onSubmit={handleSubmit(handleAddLink)} className="flex flex-col gap-4 mt-6 w-[280px]">
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
                    {folder.id === folderId && <span className="ml-auto text-purple01">✔</span>} {/* 선택 표시 */}
                  </button>
                </li>
              ))}
          </ul>

          <CtaButton type="submit" width="w-[280px]" height="h-[52px]" disabled={!isValid || isSubmitting}>
            {isSubmitting ? <LoadingSpinner /> : "추가하기"}
          </CtaButton>
        </form>
      </Content>
    </ModalContainer>
  );
};

export default LinkAddModal;
