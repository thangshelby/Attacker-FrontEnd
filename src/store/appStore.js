import { create } from "zustand";

export const useAppStore = create((set) => ({
  toast: null,
  setToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),

  modal: null,
  setModal: (modal) => set({ modal }),
  clearModal: () => set({ modal: null }),

  expanded: true,
  setExpanded: (expanded) => set({ expanded }),

  loan: null,
  setLoan: (loan) => set({ loan }),
  clearLoan: () => set({ loan: null }),

  loading: false,
  error: null,
  isSidebarOpen: false,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
