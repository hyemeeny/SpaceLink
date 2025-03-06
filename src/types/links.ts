import { FolderLinkData, FolderType } from "./folders";

export interface LinkType {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

export interface LinkProps {
  list: LinkType[];
}

export interface LinkPost {
  url: string;
  folderId: number;
}

export interface LinksFormProps {
  folders: FolderType[];
  links: { totalCount: number; list: LinkType[] };
  folderLinks: FolderLinkData[];
}

interface PageParams {
  page: number;
  pageSize: number;
}

export interface getAllLinksParams extends PageParams {
  search: string;
}

export interface getLinksByIdParams extends PageParams {
  folderId: number;
}
