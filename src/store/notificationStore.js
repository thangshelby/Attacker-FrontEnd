import { create } from "zustand";
import { sampleNotifications } from "@/constants/constants";

export const useNotificationStore = create((set) => ({
  notifications: sampleNotifications,
  addNotification: (newNotification) =>
    set((prev) => {
      // console.log(prev.notifications, newNotification)
      return {
        ...prev,
        notifications: [newNotification, ...prev.notifications],
      };
    }),
  updateNotification: (id, data) =>
    set({
      notifications: notifications.map((n) =>
        n.id === id ? { ...n, ...data } : n,
      ),
    }),
}));
