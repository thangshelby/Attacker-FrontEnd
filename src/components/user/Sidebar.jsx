import {
  SidebarLayout,
  SidebarItem,
  SidebarDropdownItem,
} from "../../layouts/SidebarLayout";
import { useEffect } from "react";
import {
  Home,
  LayoutDashboard,
  UserCircle,
  BadgeInfo,
  SchoolIcon,
  NotebookPen,
  Wallet,
  History,
  CreditCard,
  LifeBuoy,
  Settings,
  ShieldCheck,
  ShieldUser,
  BanknoteArrowUp,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    if (location.pathname !== "/VCs" && location.pathname !== "/DIDs") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex">
      <SidebarLayout>
        {/* Thay active và onClick bằng prop 'to' */}
        <SidebarItem icon={<Home />} text="Trang chủ" alert to="/" />
        <SidebarItem
          icon={<LayoutDashboard />}
          text="Tổng quan"
          to="/dashboard"
        />

        <SidebarDropdownItem icon={<UserCircle />} text="Hồ sơ cá nhân">
          {/* 3. Thêm các item con vào đây */}
          <SidebarItem
            icon={<BadgeInfo size={18} />} // Có thể dùng icon khác hoặc nhỏ hơn
            text="Thông tin chung"
            to="/profile/general-info"
          />
          <SidebarItem
            icon={<SchoolIcon size={18} />}
            text="Hồ sơ sinh viên"
            to="/profile/student-info"
          />
          <SidebarItem
            icon={<NotebookPen size={18} />}
            text="Hồ sơ học vấn"
            to="/profile/academic-info"
          />
        </SidebarDropdownItem>
        <SidebarItem
          icon={<ShieldCheck />}
          text="Định danh phi tập trung"
          to="/DIDs"
        />

        {/* <SidebarItem icon={<Wallet />} text="Khoản vay của tôi" to="/loans" /> */}
        <SidebarItem icon={<History />} text="Lịch sử vay" to="/history" />
        <SidebarItem icon={<CreditCard />} text="Khoản vay mới" to="/newloan" />
        <div className="mt-auto">
          <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Cài đặt"
            to="/settings"
          />

          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Trợ giúp"
            to="/help"
          />
          
          {/* Custom logout button */}
          <div
            onClick={handleLogout}
            className="group relative flex cursor-pointer items-center rounded-md py-2 px-3 font-medium transition-colors text-gray-600 hover:bg-red-50 dark:text-gray-300 dark:hover:bg-red-900/20"
          >
            <div className="flex h-5 min-h-[20px] w-5 min-w-[20px] flex-shrink-0 items-center justify-center">
              <LogOut size={20} className="text-red-500" />
            </div>
            <span className="ml-3 overflow-hidden text-ellipsis whitespace-nowrap text-red-600 dark:text-red-400">
              Đăng xuất
            </span>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Sidebar;
