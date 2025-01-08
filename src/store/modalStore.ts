import { create } from "zustand";

interface ModalState {
  isOpen: boolean; // 모달 열림 상태
  content: React.ReactNode | null; // 모달의 동적 콘텐츠
  openModal: (content: React.ReactNode) => void; // 모달 열기
  closeModal: () => void; // 모달 닫기
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));
