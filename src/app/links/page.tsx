import { cookies } from "next/headers";
import { FolderType } from "@/types/folders";
import { getAllLinksParams, getLinksByIdParams } from "@/types/links";
import API_URL from "@/constants/config";
import LinkInput from "@/components/Input/LinkInput";
import LinksForm from "@/components/Links/LinksForm";

const fetchWithAuth = async (url: string) => {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) throw new Error("인증 정보가 유효하지 않습니다.");

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return response.json();
};

// 전체 폴더 조회
const getAllFolders = () => fetchWithAuth(`${API_URL}/folders`);

// 전체 링크 조회
const getAllLinks = ({ page, pageSize, search }: getAllLinksParams) => {
  const searchParams = search ? `&search=${search}` : "";
  return fetchWithAuth(`${API_URL}/links?page=${page}&pageSize=${pageSize}${searchParams}`);
};

// 폴더별 링크 조회
const getLinksByFolder = ({ page, pageSize, folderId }: getLinksByIdParams) => {
  return fetchWithAuth(`${API_URL}/folders/${folderId}/links?page=${page}&pageSize=${pageSize}`);
};

// 특정 폴더 조회
const getFoldersById = (folderId: number) => fetchWithAuth(`${API_URL}/folders/${folderId}`);

const LinksPage = async ({ searchParams }: { searchParams: getAllLinksParams }) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 9;
  const search = searchParams.search || "";

  try {
    const [folders, links] = await Promise.all([getAllFolders(), getAllLinks({ page, pageSize, search })]);

    const folderLinks = await Promise.all(
      folders.map(async (folder: FolderType) => ({
        folder,
        links: await getLinksByFolder({ page, pageSize, folderId: folder.id }),
      })),
    );

    return (
      <>
        <LinkInput folders={folders} />
        <LinksForm folders={folders} links={links} folderLinks={folderLinks} />
      </>
    );
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return <p className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }
};

export default LinksPage;
