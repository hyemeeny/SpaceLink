"use client";

import { useModalStore } from "@/store/useModalStore";
import Image from "next/image";
import { ReactNode } from "react";
import { Header } from "@/components/Modal/components/ModalHeader";
import { Content } from "@/components/Modal/components/ModalContent";
import { Button } from "@/components/Modal/components/ModalButton";

interface ModalProps {
  modalId: string | number;
  children: ReactNode;
}

const ModalContainer = ({ modalId, children }: ModalProps) => {
  const { openModals, closeModal } = useModalStore();
  const isOpen = openModals.has(modalId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div
        className={
          "flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 pb-8 w-[90%] md:w-[360px] rounded-2xl bg-white"
        }
      >
        <button onClick={() => closeModal(modalId)} className="absolute top-3 right-3 text-gray-500">
          <Image src="/icons/close.svg" width={24} height={24} alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export { ModalContainer, Header, Content, Button };
