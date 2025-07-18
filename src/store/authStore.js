import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null }),
  clearError: () => set({ error: null }),
}))