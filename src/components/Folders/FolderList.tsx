import { FolderListProps } from "@/types/folders";
import { useFolderStore } from "@/store/useFolderStore";
import { ALL_FOLDERS_ID } from "@/constants/folderConstants";
import FolderButton from "@/components/Button/FolderButton";

const FolderList = ({ folders, handleFolderClick }: FolderListProps) => {
  const { folderId } = useFolderStore();

  return (
    <ul className="flex flex-wrap mr-auto gap-2">
      <li>
        <FolderButton onClick={() => handleFolderClick(ALL_FOLDERS_ID, null)} isSelected={folderId === ALL_FOLDERS_ID}>
          전체
        </FolderButton>
      </li>

      {folders
        .sort((a, b) => a.id - b.id)
        .map((folder) => (
          <li key={folder.id}>
            <FolderButton onClick={() => handleFolderClick(folder.id, folder)} isSelected={folderId === folder.id}>
              {folder.name}
            </FolderButton>
          </li>
        ))}
    </ul>
  );
};

export default FolderList;
