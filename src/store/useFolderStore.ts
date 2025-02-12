import { create } from "zustand";

interface FolderStore {
  folderId: number;
  setFolderId: (id: number) => void;
}

export const useFolderStore = create<FolderStore>((set) => ({
  folderId: 0,
  setFolderId: (id) => set({ folderId: id }),
}));
