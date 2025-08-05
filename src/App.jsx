import { BrowserRouter } from "react-router-dom";
import Router from "./routers/router";
import { ToastContainer } from "react-toastify";
import { useAppStore } from "./store/appStore";
import { toast } from "react-toastify";
import { useEffect } from "react";
import NotificationModal from "./components/NotificationModal";
import FloatingChatBot from "./components/chatbot/chatbot";

function App() {
  const { toast: toastState, clearToast, modal } = useAppStore();

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
      <FloatingChatBot />
    </BrowserRouter>
  );
}

export default App;
