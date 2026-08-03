import { create } from "zustand";

interface ModalState {
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: (id?: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,

  openModal: (id: string) => set({ activeModal: id }),

  closeModal: (id?: string) =>
    set((state) => {
      if (id !== undefined && state.activeModal !== id) return state;
      return { activeModal: null };
    }),
}));
