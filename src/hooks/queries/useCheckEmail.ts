import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { ApiError } from "@/types/api";
import { checkEmail } from "@/services/client/auth";

// 브라우저에서 실행되는 이메일 체크 fetch 함수
export const useCheckEmail = (email: string) => {
  return useQuery<boolean, ApiError>({
    queryKey: queryKeys.checkEmail(email),
    queryFn: () => checkEmail(email),
    enabled: !!email,
    staleTime: 1000 * 60 * 5,
  });
};
