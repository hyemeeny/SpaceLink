// types/link.ts
export interface Link {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

export interface LinksResponse {
  list: Link[];
  totalCount: number;
}

export interface LinksParams {
  folderId?: number | null;
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface CreateLinkParams {
  url: string;
  folderId: number;
}

export interface UpdateLinkParams {
  linkId: number;
  url: string;
}
