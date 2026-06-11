import { queryOptions } from "@tanstack/react-query";
import { user } from "@/services/user/api";

export const userQueryOptions = queryOptions({
  queryKey: ["users"],
  queryFn: user,
  staleTime: 1000 * 60 * 5,
});

export const queryKeys = {
  checkEmail: (email: string) => ["users", "check-email", email] as const,
};
