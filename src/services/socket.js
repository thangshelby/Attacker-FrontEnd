// src/services/socket.js
import { io } from "socket.io-client";
let socket = null;

export const initSocket = (citizen_id) => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: {
        citizen_id: citizen_id,
      },
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.warn("⚠️ Socket not initialized. Call initSocket() first.");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    // console.log("❌ Socket disconnected");
  }
};
