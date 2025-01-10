import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  openModal: (title: string, content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
