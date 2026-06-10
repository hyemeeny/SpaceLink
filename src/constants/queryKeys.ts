export const queryKeys = {
  user: ["users"] as const,
  checkEmail: (email: string) => ["users", "check-email", email] as const,
};
