import { create } from "zustand";

interface ModalState {
  openModals: Set<string | number>;
  openModal: (id: string | number) => void;
  closeModal: (id: string | number) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModals: new Set(),
  openModal: (id: string | number) =>
    set((state) => {
      const updatedModals = new Set(state.openModals);
      updatedModals.add(id);
      return { openModals: updatedModals };
    }),
  closeModal: (id: string | number) =>
    set((state) => {
      const updatedModals = new Set(state.openModals);
      updatedModals.delete(id);
      return { openModals: updatedModals };
    }),
}));
