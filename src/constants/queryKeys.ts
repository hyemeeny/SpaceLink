export const queryKeys = {
  checkEmail: (email: string) => ["check-email", email] as const,

  links: {
    all: () => ["links"] as const,
    list: (folderId?: number) => ["links", folderId] as const,
    detail: (linkId: number) => ["links", linkId] as const,
  },

  folders: {
    all: () => ["folders"] as const,
    detail: (folderId: number) => ["folders", folderId] as const,
  },
};
