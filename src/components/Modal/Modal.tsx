"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { ReactNode, FormEventHandler, useEffect, useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import CtaButton from "@/components/Button/CtaButton";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface ModalProps {
  modalId: string;
  title: string;
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  action?: "add" | "update" | "delete";
  isValid?: boolean;
  isPending?: boolean;
}

const Modal = ({ modalId, title, children, onSubmit, action, isValid = true, isPending = false }: ModalProps) => {
  const { activeModal, closeModal } = useModalStore();
  const isOpen = activeModal === modalId;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal(modalId);
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, modalId, closeModal]);

  if (!isOpen || !mounted) return null;

  return createPortal(
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
              disabled={isPending || (action === "add" && !isValid)}
              variant={action === "delete" ? "red" : undefined}
            >
              {isPending ? (
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
    </div>,
    document.body,
  );
};

export default Modal;
