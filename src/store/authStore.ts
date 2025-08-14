import { create } from "zustand";
import { AuthStore, User, Student, AuthError } from "@/types";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  student: null,
  error: {
    email: null,
    password: null,
    server: null,
  },
  setUser: (user: User | null) => set({ user }),
  setStudent: (student: Student | null) => set({ student }),
  clearUser: () => set({ user: null }),
  clearStudent: () => set({ student: null }),
  setError: (error: AuthError) => set({ error }),
  logout: () => set({ user: null }),
  clearError: (field: keyof AuthError) =>
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
