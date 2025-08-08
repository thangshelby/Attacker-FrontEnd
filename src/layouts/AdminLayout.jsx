import React, { useState } from "react";
import {
  BarChart3,
  Users,
  FileText,
  CreditCard,
  AlertTriangle,
  Settings,
  TrendingUp,
  Shield,
  Bell,
  Search,
  Menu,
  X,
  Home,
  DollarSign,
  UserCheck,
  Calendar,
  PieChart,
  AlertCircle,
  MessageSquare,
  Download,
  Clock,
  Filter,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Tổng Quan",
      icon: Home,
      color: "text-blue-500",
      to: "dashboard",
    },
    {
      id: "loans",
      label: "Danh Sách Khoản Vay",
      icon: FileText,
      color: "text-purple-500",
      to: "loans",
    },
    {
      id: "analyticss",
      label: "Báo Cáo & Phân Tích",
      icon: PieChart,
      color: "text-cyan-500",
      to: "debate",
    },
    {
      id: "students",
      label: "Quản Lý Sinh Viên",
      icon: Users,
      color: "text-green-500",
      to: "debate-2",
    },
    {
      id: "applications",
      label: "Đơn Xin Vay Mới",
      icon: CreditCard,
      color: "text-orange-500",
    },
    {
      id: "risk",
      label: "Phân Tích Rủi Ro",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      id: "payments",
      label: "Theo Dõi Thanh Toán",
      icon: DollarSign,
      color: "text-emerald-500",
    },
    {
      id: "approval",
      label: "Phê Duyệt Khoản Vay",
      icon: UserCheck,
      color: "text-indigo-500",
    },
    {
      id: "schedule",
      label: "Lịch Thanh Toán",
      icon: Calendar,
      color: "text-pink-500",
    },
    {
      id: "analytics",
      label: "Báo Cáo & Phân Tích",
      icon: PieChart,
      color: "text-cyan-500",
      to: "debate",
    },
    {
      id: "alerts",
      label: "Cảnh Báo & Thông Báo",
      icon: Bell,
      color: "text-yellow-500",
    },
    {
      id: "compliance",
      label: "Tuân Thủ & Kiểm Soát",
      icon: Shield,
      color: "text-gray-500",
    },
    {
      id: "support",
      label: "Hỗ Trợ Khách Hàng",
      icon: MessageSquare,
      color: "text-teal-500",
    },
    {
      id: "settings",
      label: "Cài Đặt Hệ Thống",
      icon: Settings,
      color: "text-slate-500",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-16"} flex flex-col bg-slate-800 transition-all duration-300`}
      >
        {/* Header */}
        <div className="border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
                  <CreditCard className="text-white" size={16} />
                </div>
                <span className="font-semibold text-white">LoanAdmin</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.to) {
                    navigate(`/admin/${item.to}`);
                  }
                  setActiveTab(item.id);
                }}
                className={`flex w-full items-center space-x-3 rounded-lg p-3 transition-colors ${
                  activeTab === item.id
                    ? "bg-slate-700 text-white"
                    : "text-gray-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon size={20} className={item.color} />
                {sidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-slate-700 bg-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-white">
                {menuItems.find((item) => item.id === activeTab)?.label ||
                  "Admin Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-400 hover:text-white">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </button>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
                <span className="text-sm font-medium text-white">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="h-full overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
