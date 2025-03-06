import { Suspense } from "react";
import { cookies } from "next/headers";
import { FolderType } from "@/types/folders";
import { getAllLinksParams, getLinksByIdParams } from "@/types/links";
import API_URL from "@/constants/config";
import SkeletonCard from "@/ui/SkeletonCard";
import LinkInput from "@/components/Input/LinkInput";
import LinksForm from "@/components/Links/LinksForm";

// 폴더 목록 조회
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
    return [];
  }
};

// 전체 링크 조회
const getAllLinks = async ({ page, pageSize, search }: getAllLinksParams) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const searchParams = search ? `&search=${search}` : "";
    const response = await fetch(`${API_URL}/links?page=${page}&pageSize=${pageSize}${searchParams}`, {
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

    const data = await response.json();
    return {
      totalCount: data?.totalCount || 0,
      list: data?.list || [],
    };
  } catch (error) {
    console.error("전체 링크 조회 중 에러 발생", error);
    return { totalCount: 0, list: [] };
  }
};

// 폴더별 링크 조회
const getLinksById = async ({ page, pageSize, folderId }: getLinksByIdParams) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/folders/${folderId}/links?page=${page}&pageSize=${pageSize}`, {
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

    const data = await response.json();
    return {
      totalCount: data?.totalCount || 0,
      list: data?.list || [],
    };
  } catch (error) {
    console.error("링크 조회 중 에러 발생", error);
    return { totalCount: 0, list: [] };
  }
};

const LinksPage = async ({ searchParams }: { searchParams: getAllLinksParams }) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 9;
  const search = searchParams.search || "";

  const folders = await getAllFolders();
  const links = await getAllLinks({ page, pageSize, search });

  const folderLinksPromises = folders.map(async (folder: FolderType) => {
    const { totalCount, list } = await getLinksById({
      page,
      pageSize,
      folderId: folder.id,
    });
    return {
      folder,
      links: { totalCount, list },
    };
  });

  const folderLinks = await Promise.all(folderLinksPromises);

  return (
    <section>
      <LinkInput folders={folders} />
      <Suspense key={search + page} fallback={<SkeletonCard />}>
        <LinksForm folders={folders} links={links} folderLinks={folderLinks} />
      </Suspense>
    </section>
  );
};

export default LinksPage;
