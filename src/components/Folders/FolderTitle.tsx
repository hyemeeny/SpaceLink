import { FolderTitleProps } from "@/types/folders";
import { useFolderStore } from "@/store/useFolderStore";
import { ALL_FOLDERS_ID } from "@/constants/folderConstants";

const FolderTitle = ({ defaultName }: FolderTitleProps) => {
  const { folderId } = useFolderStore();

  return <h2 className="text-2xl font-semibold">{folderId === ALL_FOLDERS_ID ? "전체" : defaultName}</h2>;
};

export default FolderTitle;
