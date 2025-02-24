import { create } from "zustand";

interface TopStore {
  isTopVisible: boolean;
  setIsTopVisible: (visible: boolean) => void;
}

export const useTopStore = create<TopStore>((set) => ({
  isTopVisible: false,
  setIsTopVisible: (visible) => set({ isTopVisible: visible }),
}));
