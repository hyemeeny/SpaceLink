export interface FolderType {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

export interface SelectedFolderProps {
  selectedFolder: FolderType | null;
}
