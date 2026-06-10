"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { userQueryOptions } from "@/constants/queryKeys";
import { User } from "@/services/user/types";

type QueryProviderProps = {
  children: React.ReactNode;
  initialUser?: User | null;
};

const QueryProvider = ({ children, initialUser }: QueryProviderProps) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
    });

    // 로그인 여부 관계없이 초기값 세팅 (null이면 비로그인 상태로 확정)
    client.setQueryData(userQueryOptions.queryKey, initialUser ?? null);

    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
