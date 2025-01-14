"use client";

import { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { getLinksById, postFolders } from "@/actions/folders";
import { Folder } from "@/types/folders";
import { Link } from "@/types/links";
import CtaButton from "@/components/Button/CtaButton";
import {
  ModalContainer,
  Content,
  Header,
} from "@/components/Modal/ModalContainer";
import BaseInput from "@/components/Input/BaseInput";
import FolderButton from "@/components/Button/FolderButton";
import { FiPlus } from "react-icons/fi";

const ALL_FOLDERS_ID = 0; // "전체 선택"의 고유 ID

interface FoldersForm {
  folders: Folder[];
  links: Link[];
}

const FoldersForm = ({ folders, links }: FoldersForm) => {
  const { openModal, closeModal } = useModalStore();
  const [folderId, setFolderId] = useState<number>(ALL_FOLDERS_ID);
  const [currentLinks, setCurrentLinks] = useState<Link[]>(links); // 현재 표시할 링크

  const handleFolderClick = async (id: number) => {
    setFolderId(id);

    if (id === ALL_FOLDERS_ID) {
      // 전체 폴더 선택 시 기본 링크로 설정
      setCurrentLinks(links);
    } else {
      // 특정 폴더 선택 시 서버에서 해당 폴더의 링크 가져오기
      const folderLinks = await getLinksById(id);
      const data = folderLinks.list;
      console.log("folderLinks", folderLinks.list);
      setCurrentLinks(folderLinks.list);
    }
  };

  // console.log("folders", folders);
  // console.log("links", links);
  // console.log("currentLinks", currentLinks);

  return (
    <div>
      <div className="flex">
        <input className="w-full h-[60px] ring-1 ring-inset px-4 ring-gray03 rounded-lg placeholder-gray04 text-gray06 text-base transition duration-500 ease-in-out focus-within:ring-purple01 focus-within:ring-2" />
        <CtaButton width="w-[80px]" height="h-[37px]">
          추가하기
        </CtaButton>
      </div>

      <div className="flex items-center justify-between">
        <ul className="flex items-center flex-wrap gap-3">
          {/* 전체 선택 버튼 */}
          <li>
            <FolderButton
              onClick={() => handleFolderClick(ALL_FOLDERS_ID)}
              isSelected={folderId === ALL_FOLDERS_ID}
            >
              전체
            </FolderButton>
          </li>

          {/* 폴더 리스트 */}
          {folders.map((folder) => (
            <li key={folder.id}>
              <FolderButton
                onClick={() => handleFolderClick(folder.id)}
                isSelected={folderId === folder.id}
              >
                {folder.name}
              </FolderButton>
            </li>
          ))}
        </ul>

        {/* 폴더 추가 버튼 */}
        <button
          onClick={openModal}
          className="flex items-center gap-1 text-purple01 text-lg font-medium min-w-[90px]"
        >
          폴더 추가 <FiPlus />
        </button>

        <ModalContainer>
          <Header>폴더 추가</Header>
          <Content>
            <form
              action={postFolders}
              className="flex flex-col gap-4 mt-6 w-[280px]"
            >
              <BaseInput type="text" name="name" placeholder="내용 입력" />
              <CtaButton
                onClick={() => closeModal()}
                type="submit"
                width="w-[280px]"
                height="h-[52px]"
              >
                추가하기
              </CtaButton>
            </form>
          </Content>
        </ModalContainer>
      </div>

      <h2 className="text-2xl font-semibold">
        {folderId === ALL_FOLDERS_ID
          ? "전체"
          : folders.find((folder) => folder.id === folderId)?.name ||
            "알 수 없는 폴더"}
      </h2>

      {/* 링크 목록 */}
      <div>
        {currentLinks.length > 0 ? (
          <ul>
            {currentLinks.map((link) => (
              <li key={link.id}>{link.title}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">링크가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default FoldersForm;
