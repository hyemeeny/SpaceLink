"use client";

import { useModalStore } from "@/store/useModalStore";
import Image from "next/image";
import { ReactNode, FormEventHandler } from "react";
import CtaButton from "@/components/Button/CtaButton";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface ModalProps {
  modalId: string | number;
  title: string;
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  action?: "add" | "update" | "delete";
  isValid?: boolean;
  isSubmitting?: boolean;
}

const Modal = ({ modalId, title, children, onSubmit, action, isValid = true, isSubmitting = false }: ModalProps) => {
  const { openModals, closeModal } = useModalStore();
  const isOpen = openModals.has(modalId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="relative p-6 w-[90%] md:w-[360px] rounded-2xl bg-white shadow-lg flex flex-col items-center">
        <button onClick={() => closeModal(modalId)} className="absolute top-3 right-3 text-gray-500">
          <Image src="/icons/close.svg" width={24} height={24} alt="close" />
        </button>

        <h3 className="text-gray06 text-xl font-bold">{title}</h3>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-6 w-[280px]">
          {children}

          {action && (
            <CtaButton
              type="submit"
              disabled={isSubmitting || (action === "add" && !isValid)}
              variant={action === "delete" ? "red" : undefined}
            >
              {isSubmitting ? (
                <LoadingSpinner />
              ) : action === "update" ? (
                "변경하기"
              ) : action === "delete" ? (
                "삭제하기"
              ) : (
                "추가하기"
              )}
            </CtaButton>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
