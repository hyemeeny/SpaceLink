export interface FolderType {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

export interface FolderProps {
  folders: FolderType[];
}
