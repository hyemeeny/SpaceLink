"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFolders, createFolders } from "@/lib/api";
import CtaButton from "@/components/Button/CtaButton";
import Container from "@/components/Layout/Container";

interface Folder {
  id: number;
  createdAt: Date;
  name: string;
  linkCount: number;
}

const LinksPage = () => {
  const { data: folders, isError, isPending } = useQuery<Folder[]>({ queryKey: ["folders"], queryFn: fetchFolders });

  const queryClient = useQueryClient();

  const [folderName, setFolderName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: createFolders,
    onSuccess: (data) => {
      // 리액트 쿼리 키는 객체 형태로 불러와야한다
      // 폴더 목록을 자동으로 업데이트 => 쿼리를 무효화하여 새 폴더 목록을 가져온다
      queryClient.invalidateQueries({ queryKey: ["folders"] }); // 폴더 목록 쿼리 무효화
      setFolderName("");
    },
    onError: (err: any) => {
      console.error("폴더 생성 실패:", err);
      setError("폴더 생성 실패: " + err?.response?.data?.error || "알 수 없는 오류");
    },
  });

  const handleFolderCreate = () => {
    if (!folderName) {
      setError("폴더 이름을 입력하세요.");
      return;
    }

    mutation.mutate(folderName); // 폴더 생성 요청
  };

  return (
    <Container>
      <input className="w-full h-[60px] ring-1 ring-inset px-4 ring-gray03 rounded-lg placeholder-gray04 text-gray06 text-base transition duration-500 ease-in-out focus-within:ring-purple01 focus-within:ring-2" />
      <CtaButton width="w-[80px]" height="h-[37px]">
        추가하기
      </CtaButton>

      <input id="name" name="name" type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="폴더 이름" />
      <button onClick={handleFolderCreate} disabled={mutation.isPending}>
        {mutation.isPending ? "로딩 중..." : "폴더 생성"}
      </button>

      {mutation.isError && <div style={{ color: "red" }}>{error}</div>}
      {mutation.isSuccess && <div style={{ color: "green" }}>폴더 생성 성공!</div>}

      <ul>
        {folders?.map((folder) => (
          <li key={folder.id}>{folder.name}</li>
        ))}
      </ul>
    </Container>
  );
};

export default LinksPage;
