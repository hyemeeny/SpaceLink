import { create } from "zustand";

interface ModalState {
  openModals: Set<string>; // 열려 있는 모달의 ID 목록
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openModals: new Set(),
  openModal: (id: string) =>
    set((state) => ({
      openModals: new Set(state.openModals).add(id),
    })),
  closeModal: (id: string) =>
    set((state) => {
      const updatedModals = new Set(state.openModals);
      updatedModals.delete(id);
      return { openModals: updatedModals };
    }),
}));
