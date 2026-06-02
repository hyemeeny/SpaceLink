import { fetcher } from "@/lib/fetcher";
import { User } from "./types";

export const user = (): Promise<User | null> => {
  return fetcher("/api/users/me");
};
