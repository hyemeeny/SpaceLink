import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import LinksForm from "@/components/Links/LinksForm";
import { FolderType } from "@/types/folders";
import LinkInput from "@/components/Input/LinkInput";

// 폴더 목록 가져오기
const getAllFolders = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/folders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["folders"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error("전체 폴더 조회 중 에러 발생", error);
  }
};

// 전체 링크 가져오기
const getAllLinks = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/links`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["links"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    console.error("전체 링크 조회 중 에러 발생", error);
  }
};

// 폴더별 링크 가져오기
const getLinksById = async (folderId: number) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/folders/${folderId}/links`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["links"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("링크 조회 중 에러 발생", error);
  }
};

const LinksPage = async () => {
  const folders = await getAllFolders();
  const links = await getAllLinks();

  /**
   * getLinksById 함수: 이 함수는 폴더 ID를 받아서 해당 폴더의 링크를 가져옵니다.
folderLinksPromises: folders.map을 사용하여 각 폴더에 대해 getLinksById를 호출하고, 그 결과를 배열로 모읍니다. 이렇게 함으로써 각 폴더에 대해 해당하는 링크를 가져올 수 있습니다.
Promise.all: 모든 폴더에 대해 링크를 비동기적으로 가져오기 위해 Promise.all을 사용하여 모든 링크를 동시에 받아옵니다.
LinksForm에 전달: folderLinks는 각 폴더와 해당 폴더에 맞는 링크를 포함하는 배열이므로, 이를 LinksForm 컴포넌트에 전달할 수 있습니다.
   */

  // 폴더 ID마다 링크 가져오기
  const folderLinksPromises = folders.map(async (folder: FolderType) => {
    const linksForFolder = await getLinksById(folder.id); // 폴더 ID에 맞는 링크들 가져오기
    return {
      folder,
      links: linksForFolder, // 폴더에 해당하는 링크 리스트
    };
  });

  const folderLinks = await Promise.all(folderLinksPromises); // 모든 폴더에 대해 링크 데이터를 가져오기

  return (
    <section>
      <LinkInput folders={folders} />
      <LinksForm folders={folders} links={links.list} folderLinks={folderLinks} />
    </section>
  );
};

export default LinksPage;
