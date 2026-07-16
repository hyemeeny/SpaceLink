export interface ApiError extends Error {
  status: number;
  field?: string;
}
