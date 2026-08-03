export interface FavoritesParams {
  page?: number;
  pageSize?: number;
}

export interface ToggleFavoriteParams {
  linkId: number;
  favorite: boolean;
}
