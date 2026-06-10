export type ApiError = Error & {
  field?: string;
  status?: number;
};
