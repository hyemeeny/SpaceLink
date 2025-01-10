import Container from "@/components/Layout/Container";
import FoldersForm from "@/components/Folders/FoldersForm";
import API_URL from "@/constants/config";
import { cookies } from "next/headers";
import { FolderProps } from "@/types/folders";

const getFolders = async () => {
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

    return response.json();
  } catch (error) {
    console.error("폴더 조회 중 에러 발생", error);
  }
};

const LinksPage = async () => {
  const folders = await getFolders();

  console.log("폴더 리스트", folders);

  return (
    <Container>
      <FoldersForm folders={folders} />
    </Container>
  );
};

export default LinksPage;
