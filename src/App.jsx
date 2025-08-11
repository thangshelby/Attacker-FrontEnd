import { BrowserRouter } from "react-router-dom";
import Router from "./routers/router";
import { ToastContainer } from "react-toastify";
import { useAppStore } from "./store/appStore";
import { toast } from "react-toastify";
import { useEffect } from "react";
import NotificationModal from "./components/user/NotificationModal";
import { initSocket, disconnectSocket } from "./services/socket";
import FloatingChatBot from "./components/user/chatbot/chatbot";
import { useAuthStore } from "./store/authStore";

function App() {
  const { user } = useAuthStore();
  const { toast: toastState, clearToast, modal } = useAppStore();
  useEffect(() => {
    initSocket(user?.citizen_id || "default_citizen_id");

    return () => {
      disconnectSocket();
    };
  }, [user]);

  useEffect(() => {
    if (toastState) {
      if (toastState.type == "success") {
        toast.success(toastState.message);
      } else if (toastState.type == "warn") {
        toast.warn(toastState.message);
      } else if (toastState.type == "error") {
        toast.error(toastState.message);
      }
      clearToast();
    }
  }, [toastState]);

  return (
    <BrowserRouter>
      <NotificationModal />
      <Router />
      <ToastContainer />
      {user && user.role !== "Admin" && <FloatingChatBot />}
    </BrowserRouter>
  );
}

export default App;
