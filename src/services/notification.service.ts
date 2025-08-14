import socket from "./socket";
import { SOCKET_EVENTS } from "../constants/socketEvents";

export const notificationService = {
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),
  onNewNotification: (callback) => {
    socket.on(SOCKET_EVENTS.NOTIFICATION.NEW_NOTIFICATION, callback);
  },
  offNewNotification: (callback) => {
    socket.off(SOCKET_EVENTS.NOTIFICATION.NEW_NOTIFICATION, callback);
  },
  emitNewNotification: (notification) => {  
    socket.emit(SOCKET_EVENTS.NOTIFICATION.SEND_NOTIFICATION, notification);
  },
};
