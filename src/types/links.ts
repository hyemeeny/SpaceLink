export interface LinkType {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

export interface PageParams {
  page: number;
  pageSize: number;
}

export interface getAllLinksParams extends PageParams {
  search: string;
}

export interface getLinksByIdParams extends PageParams {
  folderId: number;
}
