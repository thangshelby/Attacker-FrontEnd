import { create } from "zustand";
import { AppStore, Toast, Modal, Loan } from "@/types";

export const useAppStore = create<AppStore>((set) => ({
  toast: null,
  setToast: (toast: Toast | null) => set({ toast }),
  clearToast: () => set({ toast: null }),

  modal: null,
  setModal: (modal: Modal | null) => set({ modal }),
  clearModal: () => set({ modal: null }),

  expanded: true,
  setExpanded: (expanded: boolean) => set({ expanded }),

  loan: null,
  setLoan: (loan: Loan | null) => set({ loan }),
  clearLoan: () => set({ loan: null }),

  loading: false,
  error: null,
  isSidebarOpen: false,
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
