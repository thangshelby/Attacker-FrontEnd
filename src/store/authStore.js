import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  student: null,
  error: {
    email: null,
    password: null,
    server: null,
  },
  setUser: (user) => set({ user }),
  setStudent: (student) => set({ student }),
  clearUser: () => set({ user: null }),
  clearStudent: () => set({ student: null }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null }),
  clearError: (field) =>
    set((prev) => {
      return {
        ...prev,
        error: {
          ...prev.error,
          [field]: null,
        },
      };
    }),
}));
