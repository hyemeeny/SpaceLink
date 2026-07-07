interface LinkListParams {
  folderId?: number | null;
  page?: number;
  pageSize?: number;
  search?: string;
}

export const queryKeys = {
  checkEmail: (email: string) => ["check-email", email] as const,

  links: {
    all: () => ["links"] as const,
    list: (params: LinkListParams) => [...queryKeys.links.all(), "list", params] as const,
    detail: (linkId: number) => [...queryKeys.links.all(), "detail", linkId] as const,
  },

  folders: {
    all: () => ["folders"] as const,
    detail: (folderId: number) => [...queryKeys.folders.all(), "detail", folderId] as const,
  },
};
