import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import Container from "@/components/Layout/Container";
import FoldersForm from "@/components/Folders/FoldersForm";

const getAllFolders = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Access token is missing.");
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
      console.error("전체 폴더를 가져오는 데 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("폴더 조회 중 에러 발생", error);
  }
};

export const getAllLinks = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Access token is missing.");
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
      console.error("전체 링크를 조회하는 데 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    throw new Error("전체 링크 조회 중 에러 발생");
  }
};

const LinksPage = async () => {
  const folders = await getAllFolders();
  const links = await getAllLinks();

  //console.log("폴더 리스트", folders);
  // console.log("전체 링크 리스트", links);

  return (
    <Container>
      <FoldersForm folders={folders} links={links.list} />
    </Container>
  );
};

export default LinksPage;
