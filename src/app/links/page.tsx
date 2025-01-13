import Container from "@/components/Layout/Container";
import FoldersForm from "@/components/Folders/FoldersForm";
import API_URL from "@/constants/config";
import { cookies } from "next/headers";
import { FolderProps } from "@/types/folders";

const getAllCategories = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  console.log("Access Token: ", accessToken);
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
      console.error("전체 카테고리를 가져오는 데 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("폴더 조회 중 에러 발생", error);
  }
};

const LinksPage = async () => {
  const allCategories = await getAllCategories();

  console.log("폴더 리스트", allCategories);

  return (
    <Container>
      <FoldersForm allCategories={allCategories} />
    </Container>
  );
};

export default LinksPage;
