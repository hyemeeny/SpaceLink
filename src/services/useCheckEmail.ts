import API_URL from "@/constants/config";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { ApiError } from "@/types/api";

const checkEmail = async (email: string) => {
  const res = await fetch(`${API_URL}/users/check-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw { status: res.status, message: error.message };
  }

  return res.json();
};

export const useCheckEmail = (email: string) => {
  return useQuery<boolean, ApiError>({
    queryKey: queryKeys.checkEmail(email),
    queryFn: () => checkEmail(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 5,
  });
};
