import { useEffect, useRef } from "react";
import { useFolders } from "@/hooks/queries/useFolders";
import clsx from "clsx";

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
            <button
              key={key}
              ref={(el) => {
                tabRefs.current[key] = el;
              }}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(folder.id)}
              className={clsx(
                "border border-purple01 rounded-md md:rounded-lg px-3 py-2 text-xs md:text-sm font-light transition duration-200 whitespace-nowrap",
                isSelected && "bg-purple01 text-black02 font-semibold",
              )}
            >
              {folder.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FolderList;
