import { create } from "zustand";

interface LinksViewState {
  folderId: number | null;
  page: number;
  search: string | undefined;
  setFolderId: (id: number | null) => void;
  setPage: (page: number) => void;
  setSearch: (search: string | undefined) => void;
  initFromUrl: (params: URLSearchParams) => void;
}

const syncUrl = (updates: Record<string, string | null>) => {
  const params = new URLSearchParams(window.location.search);
  Object.entries(updates).forEach(([key, value]) => {
    value === null ? params.delete(key) : params.set(key, value);
  });
  window.history.replaceState(null, "", `/links?${params.toString()}`);
};

export const useLinksViewStore = create<LinksViewState>((set) => ({
  folderId: null,
  page: 1,
  search: undefined,
  setFolderId: (id) => {
    set({ folderId: id, page: 1 });
    syncUrl({ folderId: id === null ? null : String(id), page: null });
  },
  setPage: (page) => {
    set({ page });
    syncUrl({ page: String(page) });
  },
  setSearch: (search) => {
    set({ search, page: 1 });
    syncUrl({ search: search || null, page: null });
  },
  initFromUrl: (params) => {
    set({
      folderId: params.get("folderId") ? Number(params.get("folderId")) : null,
      page: Number(params.get("page") ?? "1"),
      search: params.get("search") ?? undefined,
    });
  },
}));
