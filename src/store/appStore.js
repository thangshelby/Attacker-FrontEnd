import { create } from "zustand";

export const useAppStore = create((set) => ({
  loading: false,
  success: null,
  message: null,
  error: null,
  isSidebarOpen: false,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setMessage: (message) => set({ message }),
  clearMessage: () => set({ message: null }),
  setSuccess: (success) => set({ success }),
  clearSuccess: () => set({ success: null }),
  clearError: () => set({ error: null }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
    