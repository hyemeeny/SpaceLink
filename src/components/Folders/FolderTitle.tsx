import { Folder } from "@/types/folder";

const FolderTitle = ({ selectedFolder }: { selectedFolder: Folder | null }) => {
  return (
    <h2 className="text-2xl font-semibold">
      {!selectedFolder || selectedFolder?.id === null ? "전체" : selectedFolder?.name}
    </h2>
  );
};

export default FolderTitle;
