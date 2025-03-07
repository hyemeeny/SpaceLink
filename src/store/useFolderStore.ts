import { FolderType } from "@/types/folders";
import { create } from "zustand";

interface FolderStore {
  folderId: number;
  selectedFolder: FolderType | null;
  setFolderId: (id: number) => void;
  setSelectedFolder: (folder: FolderType | null) => void;
}

export const useFolderStore = create<FolderStore>((set) => ({
  folderId: 0,
  selectedFolder: null,
  setFolderId: (id) => set({ folderId: id }),
  setSelectedFolder: (folder) => set({ selectedFolder: folder }),
}));
