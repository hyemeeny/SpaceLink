import Modal from "react-modal";
import Image from "next/image";
import { ReactNode } from "react";
import { useModalStore } from "@/store/useModalStore";
import { Header } from "@/components/Modal/components/ModalHeader";
import { Content } from "@/components/Modal/components/ModalContent";
import { Button } from "@/components/Modal/components/ModalButton";

Modal.setAppElement("#modal-root");

interface ModalContainerProps {
  children: ReactNode;
  modalId: string | number;
}

const ModalContainer = ({ children, modalId, ...props }: ModalContainerProps) => {
  const { openModals, closeModal } = useModalStore();
  const isOpen = openModals.has(modalId);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeModal(modalId)}
      contentLabel="Modal Container"
      className="flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 pb-8 w-[90%] md:w-[360px] rounded-2xl bg-white"
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
