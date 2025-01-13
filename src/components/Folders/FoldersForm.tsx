"use client";

import { useModalStore } from "@/store/modalStore";
import {
  getCategoriesByFolder,
  getLinks,
  postFolders,
} from "@/actions/folders";
import { FolderProps } from "@/types/folders";
import CtaButton from "@/components/Button/CtaButton";
import {
  ModalContainer,
  Content,
  Header,
} from "@/components/Modal/ModalContainer";
import BaseInput from "@/components/Input/BaseInput";
import FolderButton from "@/components/Button/FolderButton";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";

const FoldersForm = ({
  allCategories,
}: {
  allCategories: { id: number; name: string }[];
}) => {
  const { openModal, closeModal } = useModalStore();
  const [categories, setCategories] = useState(allCategories);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedFolderId) {
        setCategories(allCategories); // "전체"를 선택했을 경우
      } else {
        const folderCategories = await getCategoriesByFolder(selectedFolderId);
        setCategories(folderCategories);
      }
    };
    fetchCategories();
  }, [selectedFolderId]);

  const handleFolderClick = async (folderId: number) => {
    setLoading(true);
    setSelectedFolderId(folderId);
    try {
      const fetchedLinks = await getLinks(folderId);
      setLinks(fetchedLinks.list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("links", links);

  return (
    <div>
      <div className="flex">
        <input className="w-full h-[60px] ring-1 ring-inset px-4 ring-gray03 rounded-lg placeholder-gray04 text-gray06 text-base transition duration-500 ease-in-out focus-within:ring-purple01 focus-within:ring-2" />
        <CtaButton width="w-[80px]" height="h-[37px]">
          추가하기
        </CtaButton>
      </div>

      <h1>폴더 목록</h1>
      <div>
        {Array.isArray(allCategories) ? (
          allCategories.map((folder: any) => (
            <div key={folder.id}>
              <button onClick={() => handleFolderClick(folder.id)}>
                {folder.name}
              </button>
            </div>
          ))
        ) : (
          <p>폴더 데이터가 잘못되었습니다.</p>
        )}
      </div>

      {selectedFolderId && (
        <div>
          <h2>링크 목록 (폴더 {selectedFolderId})</h2>
          <ul>
            {links.length > 0 ? (
              links.map((link: any) => <li key={link.id}>{link.title}</li>)
            ) : (
              <p>해당 폴더에 링크가 없습니다.</p>
            )}
          </ul>
        </div>
      )}

      {/* 전체 보기 */}
      <button
        onClick={() => setSelectedFolderId(null)}
        className={`px-4 py-2 rounded ${
          !selectedFolderId ? "bg-blue-500 text-white" : "bg-gray-100"
        }`}
      >
        전체
      </button>

      <div className="flex items-center justify-between">
        <ul className="flex items-center flex-wrap gap-3">
          {/* 특정 폴더 보기 */}
          {allCategories.map((folder) => (
            // <li key={folder.id}>
            //   <FolderButton onClick={() => setSelectedFolderId(folder.id)}>
            //     {folder.name}
            //   </FolderButton>
            // </li>
            <button
              key={folder.id}
              onClick={() => setSelectedFolderId(folder.id)}
              className={`px-4 py-2 rounded ${
                selectedFolderId === folder.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {folder.name}
            </button>
          ))}
        </ul>

        <button
          onClick={openModal}
          className="flex items-center gap-1 text-purple01 text-lg font-medium"
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
    </div>
  );
};

export default FoldersForm;
