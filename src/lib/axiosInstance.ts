import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://linkbrary-api.vercel.app/hyemin-9", // 실제 API URL로 변경
  headers: {
    "Content-Type": "application/json",
  },
});
