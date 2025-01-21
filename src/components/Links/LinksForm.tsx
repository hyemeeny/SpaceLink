"use client";

import { useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { getLinksById } from "@/actions/links";
import { Folder } from "@/types/folders";
import { LinkType } from "@/types/links";
import { FiPlus } from "react-icons/fi";
import LinkList from "@/components/Links/LinkList";
import LinkInput from "@/components/Input/LinkInput";
import FolderButton from "@/components/Button/FolderButton";
import Container from "../Layout/Container";
import Image from "next/image";
import FolderUpdateModal from "../Modal/FolderUpdateModal";
import FolderDeleteModal from "../Modal/FolderDeleteModal";
import FolderAddModal from "../Modal/FolderAddModal";

const ALL_FOLDERS_ID = 0; // "전체 선택"의 고유 ID

interface LinksForm {
  folders: Folder[];
  links: LinkType[];
}

const LinksForm = ({ folders, links }: LinksForm) => {
  const { openModals, openModal, closeModal } = useModalStore();
  const [folderId, setFolderId] = useState<number>(ALL_FOLDERS_ID);
  const [currentLinks, setCurrentLinks] = useState<LinkType[]>(links); // 현재 표시할 링크
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null); // 선택된 폴더

  const handleFolderClick = async (id: number, folder: Folder | null) => {
    setFolderId(id);
    setSelectedFolder(folder); // 폴더 클릭 시 selectedFolder 상태 갱신

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
  console.log("선택된 폴더", selectedFolder);

  const defaultName = folders.find((folder) => folder.id === folderId)?.name;

  return (
    <section>
      {/* 링크 추가 섹션 */}
      <LinkInput folders={folders} />

      <Container>
        <div className="flex items-center justify-between">
          <ul className="flex items-center flex-wrap gap-3">
            {/* 전체 선택 버튼 */}
            <li>
              <FolderButton onClick={() => handleFolderClick(ALL_FOLDERS_ID, null)} isSelected={folderId === ALL_FOLDERS_ID}>
                전체
              </FolderButton>
            </li>

            {/* 폴더 리스트 */}
            {folders.map((folder) => (
              <li key={folder.id}>
                <FolderButton onClick={() => handleFolderClick(folder.id, folder)} isSelected={folderId === folder.id}>
                  {folder.name}
                </FolderButton>
              </li>
            ))}
          </ul>

          {/* 폴더 추가 버튼 */}
          <button onClick={() => openModal("addFolder")} className="flex items-center gap-1 text-purple01 text-lg font-medium min-w-[90px]">
            폴더 추가 <FiPlus />
          </button>
        </div>

        <div className="flex justify-between">
          {/* 폴더 타이틀 */}
          <h2 className="text-2xl font-semibold">{folderId === ALL_FOLDERS_ID ? "전체" : defaultName || "알 수 없는 폴더"}</h2>

          <div className="flex gap-3">
            <button onClick={() => openModal("shareFolder")} className="flex items-center gap-1 text-gray04 text-sm font-medium">
              <Image src={"/icons/share.svg"} width={18} height={18} alt="공유" />
              공유
            </button>

            {/* 폴더 이름 변경 */}
            <button onClick={() => openModal("updateFolder")} className="flex items-center gap-1 text-gray04 text-sm font-medium">
              <Image src={"/icons/pen.svg"} width={18} height={18} alt="이름 변경" />
              이름 변경
            </button>
            {openModals.has("updateFolder") && selectedFolder && (
              <FolderUpdateModal selectedFolder={selectedFolder} closeModal={closeModal} defaultName={defaultName} />
            )}

            {/* 폴더 삭제 */}
            <button onClick={() => openModal("deleteFolder")} className="flex items-center gap-1 text-gray04 text-sm font-medium">
              <Image src={"/icons/delete.svg"} width={18} height={18} alt="삭제" />
              삭제
            </button>
            {openModals.has("deleteFolder") && selectedFolder && <FolderDeleteModal selectedFolder={selectedFolder} closeModal={closeModal} />}
          </div>
        </div>

        {/* 링크 목록 */}
        <LinkList currentLinks={currentLinks} />
      </Container>

      {/* 폴더 추가 모달 */}
      {openModals.has("addFolder") && <FolderAddModal closeModal={closeModal} />}
    </section>
  );
};

export default LinksForm;
