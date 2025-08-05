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
  Filter,
} from "lucide-react";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Tổng Quan",
      icon: Home,
      color: "text-blue-500",
    },
    {
      id: "loans",
      label: "Danh Sách Khoản Vay",
      icon: FileText,
      color: "text-purple-500",
    },
    {
      id: "students",
      label: "Quản Lý Sinh Viên",
      icon: Users,
      color: "text-green-500",
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

  const renderPageContent = () => {
    switch (activeTab) {
      case "students":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Quản Lý Sinh Viên
              </h2>
              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  <Download size={16} />
                  <span>Xuất Excel</span>
                </button>
                <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                  Thêm Sinh Viên
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Tổng Sinh Viên</p>
                    <p className="text-2xl font-bold text-white">12,847</p>
                  </div>
                  <Users className="text-blue-500" size={32} />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Đang Vay</p>
                    <p className="text-2xl font-bold text-white">3,421</p>
                  </div>
                  <CreditCard className="text-orange-500" size={32} />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Quá Hạn</p>
                    <p className="text-2xl font-bold text-white">127</p>
                  </div>
                  <AlertTriangle className="text-red-500" size={32} />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Hoàn Thành</p>
                    <p className="text-2xl font-bold text-white">8,299</p>
                  </div>
                  <UserCheck className="text-green-500" size={32} />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Danh Sách Sinh Viên
                </h3>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search
                      className="absolute top-3 left-3 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sinh viên..."
                      className="rounded-lg border border-slate-600 bg-slate-700 py-2 pr-4 pl-10 text-white"
                    />
                  </div>
                  <button className="flex items-center space-x-2 rounded-lg bg-slate-700 px-4 py-2 text-white">
                    <Filter size={16} />
                    <span>Lọc</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="px-4 py-3 text-left text-gray-400">
                        MSSV
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Họ Tên
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Trường
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Tổng Nợ
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Trạng Thái
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700 hover:bg-slate-700">
                      <td className="px-4 py-3 text-white">SV001</td>
                      <td className="px-4 py-3 text-white">Nguyễn Văn A</td>
                      <td className="px-4 py-3 text-gray-300">nva@email.com</td>
                      <td className="px-4 py-3 text-gray-300">ĐH Bách Khoa</td>
                      <td className="px-4 py-3 text-green-400">45,000,000 đ</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-yellow-600 px-2 py-1 text-sm text-yellow-100">
                          Đang vay
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-400 hover:text-blue-300">
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "applications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Đơn Xin Vay Mới</h2>
              <div className="flex space-x-3">
                <select className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white">
                  <option>Tất cả trạng thái</option>
                  <option>Chờ duyệt</option>
                  <option>Đã duyệt</option>
                  <option>Từ chối</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Chờ Duyệt</p>
                    <p className="text-2xl font-bold text-white">23</p>
                  </div>
                  <Clock className="text-yellow-500" size={32} />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Đã Duyệt Hôm Nay</p>
                    <p className="text-2xl font-bold text-white">8</p>
                  </div>
                  <UserCheck className="text-green-500" size={32} />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Từ Chối</p>
                    <p className="text-2xl font-bold text-white">5</p>
                  </div>
                  <X className="text-red-500" size={32} />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Cần Bổ Sung</p>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                  <AlertCircle className="text-orange-500" size={32} />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Đơn Mới Cần Xử Lý
              </h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-slate-700 p-4 hover:bg-slate-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-3">
                          <h4 className="font-medium text-white">
                            Trần Thị B - SV002
                          </h4>
                          <span className="rounded bg-yellow-600 px-2 py-1 text-xs text-yellow-100">
                            Chờ duyệt
                          </span>
                        </div>
                        <p className="mb-2 text-sm text-gray-400">
                          Số tiền:{" "}
                          <span className="text-white">35,000,000 đ</span>
                        </p>
                        <p className="text-sm text-gray-400">
                          Mục đích: Học phí năm học 2024-2025
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">
                          Duyệt
                        </button>
                        <button className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700">
                          Từ chối
                        </button>
                        <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "risk":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Phân Tích Rủi Ro
              </h2>
              <select className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white">
                <option>30 ngày qua</option>
                <option>90 ngày qua</option>
                <option>6 tháng qua</option>
                <option>1 năm qua</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Tỷ Lệ Nợ Xấu</p>
                    <p className="text-2xl font-bold text-red-400">3.2%</p>
                  </div>
                  <TrendingUp className="text-red-500" size={32} />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Điểm Rủi Ro TB</p>
                    <p className="text-2xl font-bold text-yellow-400">7.5/10</p>
                  </div>
                  <BarChart3 className="text-yellow-500" size={32} />
                </div>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Cảnh Báo Cao</p>
                    <p className="text-2xl font-bold text-red-400">47</p>
                  </div>
                  <AlertTriangle className="text-red-500" size={32} />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-800 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Danh Sách Rủi Ro Cao
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="px-4 py-3 text-left text-gray-400">
                        Sinh Viên
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Điểm Rủi Ro
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Số Nợ
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Ngày Quá Hạn
                      </th>
                      <th className="px-4 py-3 text-left text-gray-400">
                        Hành Động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="px-4 py-3 text-white">Lê Văn C</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-red-600 px-2 py-1 text-sm text-red-100">
                          9.2/10
                        </span>
                      </td>
                      <td className="px-4 py-3 text-red-400">15,000,000 đ</td>
                      <td className="px-4 py-3 text-gray-300">45 ngày</td>
                      <td className="px-4 py-3">
                        <button className="rounded bg-orange-600 px-3 py-1 text-sm text-white hover:bg-orange-700">
                          Liên hệ
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-20 text-center">
            <div className="mb-4 text-6xl">🚧</div>
            <h2 className="mb-2 text-2xl font-bold text-white">
              Trang đang phát triển
            </h2>
            <p className="text-gray-400">Chức năng này sẽ được cập nhật sớm</p>
          </div>
        );
    }
  };

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
                onClick={() => setActiveTab(item.id)}
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
        <main className="flex-1 overflow-y-auto p-6">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
