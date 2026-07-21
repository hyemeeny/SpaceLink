import { useEffect, useRef } from "react";
import { useFolders } from "@/hooks/queries/useFolders";
import FolderButton from "@/components/Button/FolderButton";

interface FolderListProps {
  folderId: number | null;
  onSelect: (folderId: number | null) => void;
}

const FolderList = ({ folderId, onSelect }: FolderListProps) => {
  const { data: folders = [] } = useFolders();
  const tabRefs = useRef<Record<string | number, HTMLButtonElement | null>>({});
  const allFolders = [{ id: null, name: "전체" }, ...folders];

  useEffect(() => {
    const key = folderId ?? "all";
    const el = tabRefs.current[key];

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [folderId]);

  return (
    <div className="w-full overflow-hidden folder-scroll">
      <div role="tablist" className="flex flex-nowrap overflow-x-auto gap-2">
        {allFolders.map((folder) => {
          const key = folder.id ?? "all";
          const isSelected = folderId === folder.id;

          return (
            <FolderButton
              key={key}
              ref={(el) => {
                tabRefs.current[key] = el;
              }}
              role="tab"
              aria-selected={isSelected}
              isSelected={isSelected}
              onClick={() => onSelect(folder.id)}
              className="whitespace-nowrap"
            >
              {folder.name}
            </FolderButton>
          );
        })}
      </div>
    </div>
  );
};

export default FolderList;
