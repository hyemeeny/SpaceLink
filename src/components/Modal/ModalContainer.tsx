import Modal from "react-modal";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { useModalStore } from "@/store/modalStore";
import { Header } from "@/components/Modal/components/ModalHeader";
import { Content } from "@/components/Modal/components/ModalContent";
import { Button } from "@/components/Modal/components/ModalButton";

interface ModalContainerProps {
  children: ReactNode;
  modalId: string; // 각 모달을 식별하는 고유 ID
}

const ModalContainer = ({ children, modalId, ...props }: ModalContainerProps) => {
  const { openModals, closeModal } = useModalStore();
  const isOpen = openModals.has(modalId); // 현재 모달 ID가 열려 있는지 확인

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null; // 모달이 열려 있지 않으면 렌더링하지 않음

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeModal(modalId)}
      contentLabel="Modal Container"
      className="flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 pb-8 w-[360px] rounded-2xl bg-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      {...props}
    >
      <button onClick={() => closeModal(modalId)} className="ml-auto">
        <Image src="/icons/close.svg" width={24} height={24} alt="close" />
      </button>
      {children}
    </Modal>
  );
};

export { ModalContainer, Header, Content, Button };
