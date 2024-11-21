import axios from "axios";

// 유저 정보 조회
export const fetchUser = async () => {
  const { data } = await axios.get("/api/user");
  return data;
};

// 로그인
export const loginUser = async (credentials: { email: string; password: string }) => {
  const { data } = await axios.post("/api/auth/sign-in", credentials);
  return data;
};

// 로그아웃
export const logoutUser = async () => {
  const { data } = await axios.get("/api/auth/logout");
  return data;
};

// 폴더 조회
export const fetchFolders = async () => {
  const { data } = await axios.get("/api/folders");
  return data;
};

// 폴더 생성
export const createFolders = async (folderName: string) => {
  const { data } = await axios.post("/api/folders", { folderName });
  return data;
};
