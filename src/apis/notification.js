import api from "./api";

export const notification = {
  getAllNotifications: () =>
    api.get("/notification", {
      withCredentials: true,
    }),
  getNotificationsByCitizenId: (citizen_id) =>
    api.get(`notification/user/${citizen_id}`, {
      withCredentials: true,
    }),
  createNotification: (data) => api.post(`/notification`, data),
  updateNotification: (notification_id, data) =>
    api.patch(`notification/${notification_id}`, data),
  markAllAsRead: (citizen_id) => {
    api.post("/notification/mark_all_as_read", {
      citizen_id,
    });
  },
  deleteNotification: (notification_id) =>
    api.delete(`/notification/${notification_id}`),
};
