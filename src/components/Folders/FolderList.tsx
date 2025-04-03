"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FolderType } from "@/types/folders";
import FolderButton from "@/components/Button/FolderButton";

const FolderList = ({ folders, selectedFolderId }: { folders: FolderType[]; selectedFolderId: number | null }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFolderClick = (folderId: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (folderId) {
      params.set("folderId", String(folderId));
    } else {
      params.delete("folderId");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <ul className="flex flex-wrap mr-auto gap-2">
      <li>
        <FolderButton onClick={() => handleFolderClick(null)} isSelected={selectedFolderId === null}>
          전체
        </FolderButton>
      </li>
      {folders
        .sort((a, b) => a.id - b.id)
        .map((folder) => (
          <li key={folder.id}>
            <FolderButton onClick={() => handleFolderClick(folder.id)} isSelected={selectedFolderId === folder.id}>
              {folder.name}
            </FolderButton>
          </li>
        ))}
    </ul>
  );
};

export default FolderList;
