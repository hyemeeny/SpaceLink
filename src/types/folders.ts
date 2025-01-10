export interface Folder {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

export interface FolderProps {
  folders: Folder[];
}
