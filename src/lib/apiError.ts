const STATUS_MESSAGES: Record<number, string> = {
  401: "로그인이 필요해요.",
  403: "권한이 없거나 처리할 수 없는 요청이에요.",
  404: "요청하신 항목을 찾을 수 없어요.",
};

export const getErrorMessage = (errorData: any, status: number, fallback: string) => {
  if (STATUS_MESSAGES[status]) return STATUS_MESSAGES[status];
  return errorData?.message || fallback;
};
