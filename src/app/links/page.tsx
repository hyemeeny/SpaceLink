import { cookies } from "next/headers";
import { FolderType } from "@/types/folders";
import { getAllLinksParams, getLinksByIdParams } from "@/types/links";
import API_URL from "@/constants/config";
import LinkInput from "@/components/Input/LinkInput";
import FolderTitle from "@/components/Folders/FolderTitle";
import FolderButtonList from "@/components/Folders/FolderButtonList";
import SearchInput from "@/components/Input/SearchInput";
import LinkList from "@/components/Links/LinkList";
import Pagination from "@/components/Button/Pagination";
import Notfound from "../not-found";
import FolderList from "@/components/Folders/FolderList";
import FolderAddButton from "@/components/Button/FolderAddButton";
import Container from "@/components/Layout/Container";
import Modals from "@/components/Modal/Modals";
import TopButton from "@/components/Button/TopButton";

const fetchWithAuth = async (url: string, tags: string[]) => {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) throw new Error("인증 정보가 유효하지 않습니다.");

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

// 전체 폴더 조회
const getAllFolders = () => fetchWithAuth(`${API_URL}/folders`, ["folders"]);

// 전체 링크 조회
const getAllLinks = ({ page, pageSize, search }: getAllLinksParams) => {
  const searchParams = search ? `&search=${search}` : "";
  return fetchWithAuth(`${API_URL}/links?page=${page}&pageSize=${pageSize}${searchParams}`, ["links"]);
};

// 폴더별 링크 조회
const getLinksByFolder = ({ page, pageSize, folderId }: getLinksByIdParams) => {
  return fetchWithAuth(`${API_URL}/folders/${folderId}/links?page=${page}&pageSize=${pageSize}`, ["links"]);
};

const LinksPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 9;
  const search = searchParams.search || "";
  const folderId = searchParams.folderId ? Number(searchParams.folderId) : null;

  try {
    const [folders, linksData] = await Promise.all([
      getAllFolders(),
      folderId ? getLinksByFolder({ page, pageSize, folderId }) : getAllLinks({ page, pageSize, search }),
    ]);

    const { list, totalCount } = linksData;
    const selectedFolder = folders.find((folder: FolderType) => folder.id === folderId);

    return (
      <>
        <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col gap-6">
          <LinkInput folders={folders} />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center">
            <FolderList folders={folders} selectedFolderId={folderId} />
            <FolderAddButton />
          </div>
          <SearchInput search={search} />
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <FolderTitle selectedFolder={selectedFolder} />
            {selectedFolder && <FolderButtonList selectedFolder={selectedFolder} />}
          </div>
          <LinkList links={list} />
          {list.length > 0 && <Pagination totalCount={totalCount} currentPage={page} pageSize={pageSize} />}

          <Modals selectedFolder={selectedFolder} />
        </Container>
        <TopButton />
      </>
    );
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return <Notfound />;
  }
};

export default LinksPage;
