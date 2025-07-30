import { BrowserRouter } from "react-router-dom";
import Router from "./routers/router";
import { ToastContainer } from "react-toastify";
import { useAppStore } from "./store/appStore";
import { toast } from "react-toastify";
import { useEffect } from "react";

function App() {
  const { loading, message, clearMessage } = useAppStore();

  useEffect(() => {
    if (message) {
      toast.success(message);
      clearMessage();
    }
  }, [message, clearMessage]);

  return (

    <BrowserRouter>
      <Router />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
