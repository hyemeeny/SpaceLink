import { LinkType } from "./links";

export interface FolderType {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

export interface FolderProps {
  folders: FolderType[];
}

export interface FolderTitleProps {
  defaultName?: string;
}

export interface FolderListProps extends FolderProps {
  handleFolderClick: (id: number, folder: FolderType | null) => void;
}

export interface FolderLinkData {
  folder: FolderType;
  links: {
    totalCount: number;
    list: LinkType[];
  };
}
