import { FolderType } from "@/types/folders";
import FolderButton from "@/components/Button/FolderButton";

interface FolderListProps {
  folders: FolderType[];
  folderId: number | null;
  onSelect: (folderId: number | null) => void;
}

const FolderList = ({ folders, folderId, onSelect }: FolderListProps) => {
  return (
    <div role="tablist" className="flex flex-wrap mr-auto gap-2">
      <FolderButton
        onClick={() => onSelect(null)}
        role="tab"
        aria-selected={folderId === null}
        isSelected={folderId === null}
      >
        전체
      </FolderButton>

      {folders.map((folder) => (
        <FolderButton
          key={folder.id}
          role="tab"
          aria-selected={folderId === folder.id}
          isSelected={folderId === folder.id}
          onClick={() => onSelect(folder.id)}
        >
          {folder.name}
        </FolderButton>
      ))}
    </div>
  );
};

export default FolderList;
