"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

// 유저 정보 조회
const fetchUser = async () => {
  const { data } = await axios.get("/api/user");
  return data;
};

// 로그인 처리
const loginUser = async (credentials: { email: string; password: string }) => {
  const { data } = await axios.post("/api/auth/sign-in", credentials);
  return data;
};

// 로그아웃 처리
const logoutUser = async () => {
  const { data } = await axios.get("/api/auth/logout");
  return data;
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 유저 정보 가져오기
  const {
    data: user,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: true, // 로그인 후에만 활성화
  });

  // 로그인 처리
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // 로그인 후 유저 정보 업데이트
      router.push("/"); // 로그인 후 랜딩 페이지로 리디렉션
    },
    onError: (error) => {
      console.error("로그인 실패", error);
    },
  });

  // 로그아웃 처리
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // 로그아웃 후 유저 정보 업데이트
      router.push("/login"); // 로그아웃 후 로그인 페이지로 리디렉션
    },
    onError: (error) => {
      console.error("로그아웃 실패", error);
    },
  });

  return {
    user,
    isPending,
    isError,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    refetchUser: refetch, // 유저 정보 강제로 리패치
  };
};
