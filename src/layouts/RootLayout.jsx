import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex h-screen w-full bg-black/80">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-gray-50 text-black transition-colors dark:bg-gray-800 dark:text-white">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
