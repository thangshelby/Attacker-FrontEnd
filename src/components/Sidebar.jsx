
import {
  SidebarLayout,
  SidebarItem,
  SidebarDropdownItem,
} from "../layouts/SidebarLayout";
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
  ChevronDown,
  LogOut,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname !== "/VCs" && location.pathname !== "/DIDs") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [location.pathname]);

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
            to="/profile/student-info "
          />
          <SidebarItem
            icon={<NotebookPen size={18} />}
            text="Hồ sơ học vấn"
            to="/profile/academic-info"
          />
        </SidebarDropdownItem>

        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger
            className={`flex w-full cursor-pointer hover:bg-indigo-50 items-center rounded-md p-0 justify-between pr-4 focus:ring-0 focus:outline-none focus-visible:ring-0 ${open && "bg-gradient-to-r from-indigo-200 to-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100"} `}
          >
            <SidebarItem
              icon={<ShieldCheck className={`${open&&'text-indigo-800'}`} />}
              text={<span className={`${open&&'text-indigo-800'}`}>Định danh</span>}
              to="not-used"
            />
            <ChevronDown
              size={16}
              className={`${!open ? "rotate-180" : "text-indigo-800"}  transition-transform duration-300`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-2 flex flex-col space-y-1 pl-6">
            <SidebarItem
              icon={<BanknoteArrowUp />}
              text="Chung chi cua ban"
              to="/VCs"
            />
            <SidebarItem
              icon={<ShieldUser />}
              text="Định danh phi tập trung"
              to="/DIDs"
            />
          </CollapsibleContent>
        </Collapsible>

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
          <SidebarItem
            icon={<LogOut size={20} />}
            text="Đăng xuất"
            to="/logout"
          />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Sidebar;
