import { create } from "zustand";

interface TopStore {
  isPaginationVisible: boolean;
  setIsPaginationVisible: (visible: boolean) => void;
}

export const useTopStore = create<TopStore>((set) => ({
  isPaginationVisible: false,
  setIsPaginationVisible: (visible) => set({ isPaginationVisible: visible }),
}));
