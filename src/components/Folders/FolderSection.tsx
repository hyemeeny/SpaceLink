import { FolderSectionProps } from "@/types/folders";
import FolderAddButton from "@/components/Button/FolderAddButton";
import FolderTitle from "@/components/Folders/FolderTitle";
import FolderList from "@/components/Folders/FolderList";
import FolderButtonList from "@/components/Folders/FolderButtonList";

const FolderSection = ({
  folders,
  handleFolderClick,
  handleEditClick,
  handleDeleteClick,
  selectedFolder,
  defaultName,
}: FolderSectionProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
        <FolderList folders={folders} handleFolderClick={handleFolderClick} />
        <FolderAddButton />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-3">
        <FolderTitle defaultName={defaultName} />
        <FolderButtonList
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          selectedFolder={selectedFolder}
        />
      </div>
    </>
  );
};

export default FolderSection;
