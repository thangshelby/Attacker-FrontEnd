import { User, AuthError } from './user';
import { Student } from './student';
import { Loan } from './loan';
import { Toast, Modal } from './ui';
import { Notification } from './notification';

// Store Types
export interface AuthStore {
  user: User | null;
  student: Student | null;
  error: AuthError;
  setUser: (user: User | null) => void;
  setStudent: (student: Student | null) => void;
  clearUser: () => void;
  clearStudent: () => void;
  setError: (error: AuthError) => void;
  logout: () => void;
  clearError: (field: keyof AuthError) => void;
}

export interface AppStore {
  toast: Toast | null;
  modal: Modal | null;
  expanded: boolean;
  loan: Loan | null;
  loading: boolean;
  error: string | null;
  isSidebarOpen: boolean;
  setToast: (toast: Toast | null) => void;
  clearToast: () => void;
  setModal: (modal: Modal | null) => void;
  clearModal: () => void;
  setExpanded: (expanded: boolean) => void;
  setLoan: (loan: Loan | null) => void;
  clearLoan: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export interface Web3Store {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
} 