import { FavoritesParams } from "@/types/favorite";
import { LinksParams } from "@/types/link";
import { DEFAULT_PAGE_SIZE } from "./constants";

export const queryKeys = {
  checkEmail: (email: string) => ["check-email", email] as const,

  links: {
    all: () => ["links"] as const,
    list: ({ folderId = null, page = 1, pageSize = DEFAULT_PAGE_SIZE, search }: LinksParams) =>
      [...queryKeys.links.all(), "list", { folderId, page, pageSize, search }] as const,
    detail: (linkId: number) => [...queryKeys.links.all(), "detail", linkId] as const,
    favorites: ({ page = 1, pageSize = DEFAULT_PAGE_SIZE }: FavoritesParams) =>
      [...queryKeys.links.all(), "favorites", { page, pageSize }] as const,
  },

  folders: {
    all: () => ["folders"] as const,
    detail: (folderId: number) => [...queryKeys.folders.all(), "detail", folderId] as const,
  },
};
