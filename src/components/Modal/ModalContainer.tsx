import React, { ReactNode } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { useModalStore } from "@/store/modalStore";
import CtaButton from "../Button/CtaButton";

// 접근성 설정 (Next.js에서는 body나 root로 설정)
Modal.setAppElement("#modal-root");

interface ModalContainerProps {
  title: string;
  children: ReactNode;
}

const ModalContainer = ({ title, children }: ModalContainerProps) => {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal Container"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 w-[360px] rounded-lg bg-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <button onClick={closeModal}>
        <Image src="/icons/close.svg" width={24} height={24} alt="close" />
      </button>
      <h3 className="text-gray06 text-xl font-bold">{title}</h3>
      <div>{children}</div>
    </Modal>
  );
};

export default ModalContainer;
