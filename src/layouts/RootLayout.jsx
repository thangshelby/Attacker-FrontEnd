import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const RootLayout = () => {
  return (
    <div className="flex h-screen w-full bg-black/80">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-gray-50 text-black transition-colors dark:bg-black/90 dark:text-white">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
