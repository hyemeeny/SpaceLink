"use client";

import { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { postFolders } from "@/actions/folders";
import { getLinksById } from "@/actions/links";
import { Folder } from "@/types/folders";
import { Link } from "@/types/links";
import { ModalContainer, Content, Header } from "@/components/Modal/ModalContainer";
import { FiPlus } from "react-icons/fi";
import LinkList from "@/components/Links/LinkList";
import LinkInput from "@/components/Input/LinkInput";
import BaseInput from "@/components/Input/BaseInput";
import CtaButton from "@/components/Button/CtaButton";
import FolderButton from "@/components/Button/FolderButton";

const ALL_FOLDERS_ID = 0; // "전체 선택"의 고유 ID

interface LinksForm {
  folders: Folder[];
  links: Link[];
}

const LinksForm = ({ folders, links }: LinksForm) => {
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
      console.log("folderLinks", folderLinks.list);
      setCurrentLinks(folderLinks.list);
    }
  };

  // console.log("folders", folders);
  // console.log("links", links);
  // console.log("currentLinks", currentLinks);

  return (
    <section>
      {/* 링크 추가 섹션 */}
      <LinkInput />

      <div className="flex items-center justify-between">
        <ul className="flex items-center flex-wrap gap-3">
          {/* 전체 선택 버튼 */}
          <li>
            <FolderButton onClick={() => handleFolderClick(ALL_FOLDERS_ID)} isSelected={folderId === ALL_FOLDERS_ID}>
              전체
            </FolderButton>
          </li>

          {/* 폴더 리스트 */}
          {folders.map((folder) => (
            <li key={folder.id}>
              <FolderButton onClick={() => handleFolderClick(folder.id)} isSelected={folderId === folder.id}>
                {folder.name}
              </FolderButton>
            </li>
          ))}
        </ul>

        {/* 폴더 추가 버튼 */}
        <button onClick={openModal} className="flex items-center gap-1 text-purple01 text-lg font-medium min-w-[90px]">
          폴더 추가 <FiPlus />
        </button>

        {/* 모달 */}
        <ModalContainer>
          <Header>폴더 추가</Header>
          <Content>
            <form action={postFolders} className="flex flex-col gap-4 mt-6 w-[280px]">
              <BaseInput type="text" name="name" placeholder="내용 입력" />
              <CtaButton onClick={() => closeModal()} type="submit" width="w-[280px]" height="h-[52px]">
                추가하기
              </CtaButton>
            </form>
          </Content>
        </ModalContainer>
      </div>

      {/* 폴더 타이틀 */}
      <h2 className="text-2xl font-semibold">
        {folderId === ALL_FOLDERS_ID ? "전체" : folders.find((folder) => folder.id === folderId)?.name || "알 수 없는 폴더"}
      </h2>

      {/* 링크 목록 */}
      <LinkList currentLinks={currentLinks} />
    </section>
  );
};

export default LinksForm;
