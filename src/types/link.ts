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
