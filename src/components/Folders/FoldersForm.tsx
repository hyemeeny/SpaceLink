"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useActionState } from "react";
import { useModalStore } from "@/store/modalStore"; // 모달 상태 사용
import { postFolders } from "@/actions/folders"; // 서버 액션 임포트
import { FolderProps } from "@/types/folders";
import CtaButton from "@/components/Button/CtaButton"; // 예시 버튼 컴포넌트
import ModalContainer from "../Modal/ModalContainer";
import CreateFolderModal from "../Modal/components/CreateFolderModal";

const FoldersForm = ({ folders }: FolderProps) => {
  const { openModal } = useModalStore();
  // const [formData, setFormData] = useState({ name: "" });
  // const { register, handleSubmit } = useForm();

  const handleOpenModal = () => {
    openModal(
      "폴더 추가",
      <ModalContainer title="폴더 추가">
        <CreateFolderModal buttonTitle="추가하기" />
      </ModalContainer>,
    );
  };

  // const [state, formAction, isPending] = useActionState(postFolders, {
  //   name: "",
  //   success: true,
  //   message: "",
  //   isError: false,
  // });

  // // 폴더 생성 후 상태와 메시지 관리
  // const { name, message, isError } = state;

  // // 서버 액션 호출 및 처리
  // if (!isError) {
  //   openModal(<div>{message}</div>); // 성공 모달 표시
  // } else {
  //   openModal(<div>{message}</div>); // 에러 모달 표시
  // }

  // 폴더 생성 핸들러
  // const handleFolderCreation = async (data) => {};

  return (
    <div>
      <input className="w-full h-[60px] ring-1 ring-inset px-4 ring-gray03 rounded-lg placeholder-gray04 text-gray06 text-base transition duration-500 ease-in-out focus-within:ring-purple01 focus-within:ring-2" />
      <CtaButton width="w-[80px]" height="h-[37px]">
        추가하기
      </CtaButton>

      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>

      <button onClick={handleOpenModal} className="text-purple01 text-lg">
        폴더 추가
      </button>

      <ModalContainer title="폴더 추가">
        <CreateFolderModal buttonTitle="추가하기" />
      </ModalContainer>
    </div>
  );
};

export default FoldersForm;
