import Modal from "react-modal";
import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { useModalStore } from "@/store/modalStore";
import { Header } from "@/components/Modal/components/ModalHeader";
import { Content } from "@/components/Modal/components/ModalContent";
import { Button } from "@/components/Modal/components/ModalButton";

const ModalContainer = ({ children, ...props }: { children: ReactNode }) => {
  const { isOpen, closeModal } = useModalStore();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal Container"
      className="flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 pb-8 w-[360px] rounded-2xl bg-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      {...props}
    >
      <button onClick={closeModal} className="ml-auto">
        <Image src="/icons/close.svg" width={24} height={24} alt="close" />
      </button>
      {children}
    </Modal>
  );
};

export { ModalContainer, Header, Content, Button };
