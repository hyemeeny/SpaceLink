import React from "react";
import Modal from "react-modal";
import { useModalStore } from "@/store/modalStore";

// 접근성 설정 (Next.js에서는 body나 root로 설정)
Modal.setAppElement("#modal-root");

const ModalContainer = () => {
  const { isOpen, content, closeModal } = useModalStore();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          width: "400px",
          borderRadius: "8px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
      contentLabel="Common Modal"
    >
      <div>{content}</div>
      <button onClick={closeModal} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Close
      </button>
    </Modal>
  );
};

export default ModalContainer;
