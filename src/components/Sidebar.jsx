import { SidebarLayout, SidebarItem } from "../layouts/SidebarLayout";
import {
  Home,
  LayoutDashboard,
  UserCircle,
  Wallet,
  History,
  CreditCard,
  LifeBuoy,
  Settings,
} from "lucide-react";

const Sidebar = () => {
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
        <SidebarItem
          icon={<UserCircle />}
          text="Hồ sơ cá nhân"
          to="/profiles"
        />
        <SidebarItem icon={<Wallet />} text="Khoản vay của tôi" to="/loans" />
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
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Sidebar;
