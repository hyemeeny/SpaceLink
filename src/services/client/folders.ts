import { Folder } from "@/types/folder";

export const fetchFolders = async (): Promise<Folder[]> => {
  const res = await fetch(`/api/folders`);
  if (!res.ok) throw new Error("폴더 조회 실패");
  return res.json();
};

export const postFolders = async ({ name }: { name: string }) => {
  const res = await fetch(`/api/folders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "폴더 생성 실패");
  }
  return res.json();
};

export const putFolders = async ({ name, folderId }: { name: string; folderId: number }) => {
  const res = await fetch(`/api/folders/${folderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "폴더 수정 실패");
  }
  return res.json();
};

export const deleteFolders = async (folderId: number) => {
  const res = await fetch(`/api/folders/${folderId}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
};
