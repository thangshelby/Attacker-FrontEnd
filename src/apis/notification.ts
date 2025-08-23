import api from "./api";
import { Notification } from "@/types/notification";

export const notification = {
  getAllNotifications: () =>
    api.get("/notification", {
      withCredentials: true,
    }),
  getNotificationsByCitizenId: (citizen_id: string) =>
    api.get(`notification/user/${citizen_id}`, {
      withCredentials: true,
    }),
  createNotification: (data: {
    header: string;
    content: string;
    icon: string;
  }) => api.post(`/notification`, data),
  updateNotification: (notification_id: string, data: Partial<Notification>) =>
    api.patch(`notification/${notification_id}`, data),
  markAllAsRead: (citizen_id: string) =>
    api.post("/notification/mark_all_as_read", {
      citizen_id,
    }),
  deleteNotification: (notification_id: string) =>
    api.delete(`/notification/${notification_id}`),
};
