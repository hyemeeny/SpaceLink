import { SelectedFolderProps } from "@/types/folders";

const FolderTitle = ({ selectedFolder }: SelectedFolderProps) => {
  return (
    <h2 className="text-2xl font-semibold">
      {!selectedFolder || selectedFolder?.id === null ? "전체" : selectedFolder?.name}
    </h2>
  );
};

export default FolderTitle;
