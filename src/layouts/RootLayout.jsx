import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "@/components/Sidebar";

const RootLayout = () => {
  return (
    <div className="flex h-screen w-full flex-row bg-black/80">
      <Sidebar />
      {/* <div className="w-[20%]">

      </div> */}
      <div className="flex flex-1 flex-col overflow-hidden bg-gray-50  text-black transition-colors dark:bg-gray-800 dark:text-white">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
