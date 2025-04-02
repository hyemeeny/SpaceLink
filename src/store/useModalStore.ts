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
      const modals = new Set(state.openModals);
      modals.add(id);
      return { openModals: modals };
    }),

  closeModal: (id: string | number) =>
    set((state) => {
      const modals = new Set(state.openModals);
      modals.delete(id);
      return { openModals: modals };
    }),
}));
