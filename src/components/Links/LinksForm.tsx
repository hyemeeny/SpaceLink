"use client";

import { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { getLinksById } from "@/actions/links";
import { FolderType } from "@/types/folders";
import { LinkType } from "@/types/links";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";
import Container from "@/components/Layout/Container";
import LinkList from "@/components/Links/LinkList";
import LinkInput from "@/components/Input/LinkInput";
import SearchInput from "@/components/Input/SearchInput";
import FolderButton from "@/components/Button/FolderButton";
import FolderUpdateModal from "@/components/Modal/FolderModal/FolderUpdateModal";
import FolderDeleteModal from "@/components/Modal/FolderModal/FolderDeleteModal";
import FolderAddModal from "@/components/Modal/FolderModal/FolderAddModal";
import LinkUpdateModal from "../Modal/LinkModal/LinkUpdateModal";
import DeleteModal from "../Modal/components/DeleteModal";
import UpdateModal from "../Modal/components/UpdateModal";

const ALL_FOLDERS_ID = 0; // "전체 선택"의 고유 ID

interface LinksForm {
  folders: FolderType[];
  links: LinkType[];
}

const LinksForm = ({ folders, links }: LinksForm) => {
  const { openModals, openModal, closeModal } = useModalStore();
  const [folderId, setFolderId] = useState<number>(ALL_FOLDERS_ID);
  const [currentLinks, setCurrentLinks] = useState<LinkType[]>(links); // 현재 표시할 링크
  const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null); // 선택된 폴더

  const handleFolderClick = async (id: number, folder: FolderType | null) => {
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

  const handleEditClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    openModal(`folderUpdate-${folder.id}`);
  };

  const handleDeleteClick = (folder: FolderType) => {
    setSelectedFolder(folder);
    openModal(`folderDelete-${folder.id}`);
  };

  // console.log("folders", folders);
  // console.log("links", links);
  // console.log("currentLinks", currentLinks);
  // console.log("선택된 폴더", selectedFolder);

  const defaultName = folders.find((folder) => folder.id === folderId)?.name;

  return (
    <section>
      {/* 링크 추가 섹션 */}
      <LinkInput folders={folders} />

      <Container className="mt-10 mb-20 flex flex-col gap-6">
        <SearchInput />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
          <ul className="flex flex-wrap mr-auto gap-2">
            {/* 전체 선택 버튼 */}
            <li>
              <FolderButton
                onClick={() => handleFolderClick(ALL_FOLDERS_ID, null)}
                isSelected={folderId === ALL_FOLDERS_ID}
              >
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
          <button
            onClick={() => openModal(`addFolder-${folderId}`)}
            className="flex items-center gap-1 text-base font-medium fixed bottom-8 z-[1] bg-purple01 text-white rounded-[20px] px-7 py-1 md:bg-transparent md:text-purple01 md:text-lg md:min-w-[90px] md:static md:rounded-none md:p-0"
          >
            폴더 추가 <FiPlus />
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3">
          {/* 폴더 타이틀 */}
          <h2 className="text-2xl font-semibold">
            {folderId === ALL_FOLDERS_ID ? "전체" : defaultName || "알 수 없는 폴더"}
          </h2>

          {folderId !== 0 && (
            <div className="flex gap-3">
              <button
                onClick={() => openModal(`shareFolder-${folderId}`)}
                className="flex items-center gap-1 text-gray04 text-sm font-medium"
              >
                <Image src={"/icons/share.svg"} width={18} height={18} alt="공유" />
                공유
              </button>

              {/* 폴더 이름 변경 */}
              <button
                onClick={() => handleEditClick(selectedFolder!)}
                className="flex items-center gap-1 text-gray04 text-sm font-medium"
              >
                <Image src={"/icons/pen.svg"} width={18} height={18} alt="이름 변경" />
                이름 변경
              </button>

              {/* 폴더 삭제 */}
              <button
                onClick={() => handleDeleteClick(selectedFolder!)}
                className="flex items-center gap-1 text-gray04 text-sm font-medium"
              >
                <Image src={"/icons/delete.svg"} width={18} height={18} alt="삭제" />
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 링크 목록 */}
        <LinkList currentLinks={currentLinks} />
      </Container>

      {/* 폴더 추가 모달 */}
      {openModals.has(`addFolder-${folderId}`) && <FolderAddModal closeModal={closeModal} />}

      {/* 폴더 수정 모달 */}
      {selectedFolder && openModals.has(`folderUpdate-${selectedFolder.id}`) && (
        <UpdateModal
          selectedItem={selectedFolder}
          closeModal={closeModal}
          itemType="folder"
          defaultName={defaultName}
        />
      )}

      {/* 폴더 삭제 모달 */}
      {selectedFolder && openModals.has(`folderDelete-${selectedFolder.id}`) && (
        <DeleteModal selectedItem={selectedFolder} closeModal={closeModal} itemType="folder" />
      )}
    </section>
  );
};

export default LinksForm;
