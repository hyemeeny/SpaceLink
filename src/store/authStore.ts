import { create } from "zustand";

interface AuthState {
  user: { name: string; email: string } | null;
  token: string | null;
  setUser: (user: { name: string; email: string }, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;
