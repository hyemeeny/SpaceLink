import { create } from "zustand";

interface FavoritesViewState {
  page: number;
  setPage: (page: number) => void;
  initFromUrl: (searchParams: URLSearchParams) => void;
}

const syncUrl = (updates: Record<string, string | null>) => {
  const params = new URLSearchParams(window.location.search);
  Object.entries(updates).forEach(([key, value]) => {
    value === null ? params.delete(key) : params.set(key, value);
  });
  const query = params.toString();
  window.history.replaceState(null, "", query ? `/favorites?${query}` : "/favorites");
};

export const useFavoritesViewStore = create<FavoritesViewState>((set) => ({
  page: 1,
  setPage: (page) => {
    syncUrl({ page: page > 1 ? String(page) : null });
    set({ page });
  },
  initFromUrl: (searchParams) => {
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    set({ page });
  },
}));
