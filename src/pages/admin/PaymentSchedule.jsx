import React, { useState } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Send,
  Bell,
  Users,
  TrendingUp,
  FileText,
} from "lucide-react";

const PaymentSchedulePage = () => {
  const [selectedView, setSelectedView] = useState("calendar");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample data
  const paymentStats = {
    totalDue: 1250000000,
    dueToday: 45000000,
    overdue: 180000000,
    upcoming7days: 320000000,
    totalStudents: 847,
    onTimeRate: 92.3,
  };

  const paymentSchedule = [
    {
      id: "PAY001",
      studentId: "SV001",
      studentName: "Nguyễn Văn A",
      school: "ĐH Bách Khoa",
      amount: 2500000,
      dueDate: "2025-08-05",
      status: "due_today",
      loanId: "LN001",
      paymentMethod: "Bank Transfer",
      phone: "0901234567",
    },
    {
      id: "PAY002",
      studentId: "SV002",
      studentName: "Trần Thị B",
      school: "ĐH Kinh Tế",
      amount: 3000000,
      dueDate: "2025-08-06",
      status: "upcoming",
      loanId: "LN002",
      paymentMethod: "E-wallet",
      phone: "0907654321",
    },
    {
      id: "PAY003",
      studentId: "SV003",
      studentName: "Lê Văn C",
      school: "ĐH Khoa Học Xã Hội",
      amount: 1500000,
      dueDate: "2025-08-03",
      status: "overdue",
      loanId: "LN003",
      paymentMethod: "Bank Transfer",
      phone: "0909876543",
      overdueDays: 2,
    },
    {
      id: "PAY004",
      studentId: "SV004",
      studentName: "Phạm Thị D",
      school: "ĐH Y Khoa",
      amount: 4000000,
      dueDate: "2025-08-07",
      status: "upcoming",
      loanId: "LN004",
      paymentMethod: "Bank Transfer",
      phone: "0903456789",
    },
    {
      id: "PAY005",
      studentId: "SV005",
      studentName: "Hoàng Văn E",
      school: "ĐH Bách Khoa",
      amount: 2200000,
      dueDate: "2025-08-04",
      status: "paid",
      loanId: "LN005",
      paymentMethod: "E-wallet",
      phone: "0905678901",
      paidDate: "2025-08-04",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-600 text-green-100";
      case "due_today":
        return "bg-orange-600 text-orange-100";
      case "upcoming":
        return "bg-blue-600 text-blue-100";
      case "overdue":
        return "bg-red-600 text-red-100";
      default:
        return "bg-gray-600 text-gray-100";
    }
  };

  const getStatusText = (payment) => {
    switch (payment.status) {
      case "paid":
        return "Đã thanh toán";
      case "due_today":
        return "Đến hạn hôm nay";
      case "upcoming":
        return "Sắp đến hạn";
      case "overdue":
        return `Quá hạn ${payment.overdueDays} ngày`;
      default:
        return "Không xác định";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Calendar component for date view
  const CalendarView = () => {
    const currentDate = new Date();
    const firstDay = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1,
    );
    const lastDay = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0,
    );
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-slate-700"></div>,
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayPayments = paymentSchedule.filter((p) => p.dueDate === dateStr);
      const isToday = dateStr === currentDate.toISOString().split("T")[0];

      days.push(
        <div
          key={day}
          className={`h-24 cursor-pointer border border-slate-700 p-1 hover:bg-slate-700 ${isToday ? "bg-blue-900" : ""}`}
          onClick={() => setSelectedDate(dateStr)}
        >
          <div
            className={`mb-1 text-sm font-medium ${isToday ? "text-blue-300" : "text-white"}`}
          >
            {day}
          </div>
          <div className="space-y-1">
            {dayPayments.slice(0, 2).map((payment) => (
              <div
                key={payment.id}
                className={`rounded px-1 py-0.5 text-xs ${getStatusColor(payment.status)}`}
              >
                {payment.studentName.split(" ").pop()}
              </div>
            ))}
            {dayPayments.length > 2 && (
              <div className="text-xs text-gray-400">
                +{dayPayments.length - 2} khác
              </div>
            )}
          </div>
        </div>,
      );
    }

    return (
      <div className="rounded-lg bg-slate-800 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            Tháng {selectedMonth.getMonth() + 1}, {selectedMonth.getFullYear()}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                setSelectedMonth(
                  new Date(
                    selectedMonth.getFullYear(),
                    selectedMonth.getMonth() - 1,
                  ),
                )
              }
              className="rounded bg-slate-700 p-2 hover:bg-slate-600"
            >
              <ChevronLeft className="text-white" size={16} />
            </button>
            <button
              onClick={() =>
                setSelectedMonth(
                  new Date(
                    selectedMonth.getFullYear(),
                    selectedMonth.getMonth() + 1,
                  ),
                )
              }
              className="rounded bg-slate-700 p-2 hover:bg-slate-600"
            >
              <ChevronRight className="text-white" size={16} />
            </button>
          </div>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-0">
          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0 border border-slate-700">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-900 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Lịch Trình Thanh Toán</h2>
        <div className="flex space-x-3">
          <select className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white">
            <option>Tháng này</option>
            <option>30 ngày tới</option>
            <option>90 ngày tới</option>
            <option>Tất cả</option>
          </select>
          <button className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <Download size={16} />
            <span>Xuất Lịch</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <div className="rounded-lg border-l-4 border-blue-500 bg-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Tổng Phải Thu</p>
              <p className="text-xl font-bold text-blue-400">
                {formatCurrency(paymentStats.totalDue)}
              </p>
            </div>
            <DollarSign className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-orange-500 bg-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Đến Hạn Hôm Nay</p>
              <p className="text-xl font-bold text-orange-400">
                {formatCurrency(paymentStats.dueToday)}
              </p>
            </div>
            <Clock className="text-orange-500" size={24} />
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-red-500 bg-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Quá Hạn</p>
              <p className="text-xl font-bold text-red-400">
                {formatCurrency(paymentStats.overdue)}
              </p>
            </div>
            <AlertTriangle className="text-red-500" size={24} />
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-purple-500 bg-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">7 Ngày Tới</p>
              <p className="text-xl font-bold text-purple-400">
                {formatCurrency(paymentStats.upcoming7days)}
              </p>
            </div>
            <Calendar className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-green-500 bg-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Sinh Viên</p>
              <p className="text-xl font-bold text-green-400">
                {paymentStats.totalStudents}
              </p>
            </div>
            <Users className="text-green-500" size={24} />
          </div>
        </div>

        <div className="rounded-lg border-l-4 border-cyan-500 bg-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Tỷ Lệ Đúng Hạn</p>
              <p className="text-xl font-bold text-cyan-400">
                {paymentStats.onTimeRate}%
              </p>
            </div>
            <TrendingUp className="text-cyan-500" size={24} />
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedView("calendar")}
          className={`flex items-center space-x-2 rounded-lg px-4 py-2 ${
            selectedView === "calendar"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-gray-300 hover:bg-slate-600"
          }`}
        >
          <Calendar size={16} />
          <span>Lịch</span>
        </button>
        <button
          onClick={() => setSelectedView("list")}
          className={`flex items-center space-x-2 rounded-lg px-4 py-2 ${
            selectedView === "list"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-gray-300 hover:bg-slate-600"
          }`}
        >
          <FileText size={16} />
          <span>Danh Sách</span>
        </button>
      </div>

      {/* Calendar View */}
      {selectedView === "calendar" && <CalendarView />}

      {/* List View */}
      {selectedView === "list" && (
        <div className="rounded-lg bg-slate-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Danh Sách Thanh Toán
            </h3>
            <div className="flex space-x-3">
              <div className="relative">
                <Search
                  className="absolute top-2.5 left-3 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm sinh viên..."
                  className="rounded border border-slate-600 bg-slate-700 py-2 pr-4 pl-10 text-white"
                />
              </div>
              <select className="rounded border border-slate-600 bg-slate-700 px-3 py-2 text-white">
                <option>Tất cả trạng thái</option>
                <option>Đến hạn hôm nay</option>
                <option>Quá hạn</option>
                <option>Sắp đến hạn</option>
                <option>Đã thanh toán</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-4 py-3 text-left text-sm text-gray-400">
                    SINH VIÊN
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">
                    SỐ TIỀN
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">
                    NGÀY ĐẾN HẠN
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">
                    TRẠNG THÁI
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">
                    PHƯƠNG THỨC
                  </th>
                  <th className="px-4 py-3 text-left text-sm text-gray-400">
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-slate-700 hover:bg-slate-700"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-white">
                          {payment.studentName}
                        </div>
                        <div className="text-sm text-gray-400">
                          {payment.studentId} - {payment.school}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">
                        {formatCurrency(payment.amount)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Khoản vay: {payment.loanId}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white">
                        {formatDate(payment.dueDate)}
                      </div>
                      {payment.paidDate && (
                        <div className="text-sm text-green-400">
                          Đã trả: {formatDate(payment.paidDate)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-sm font-medium ${getStatusColor(payment.status)}`}
                      >
                        {getStatusText(payment)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-300">
                        {payment.paymentMethod}
                      </div>
                      <div className="text-sm text-gray-400">
                        {payment.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-1 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                          <Eye size={12} />
                          <span>Chi tiết</span>
                        </button>
                        {payment.status !== "paid" && (
                          <>
                            <button className="flex items-center space-x-1 rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">
                              <Send size={12} />
                              <span>Nhắc nhở</span>
                            </button>
                            {payment.status === "overdue" && (
                              <button className="flex items-center space-x-1 rounded bg-orange-600 px-3 py-1 text-sm text-white hover:bg-orange-700">
                                <Bell size={12} />
                                <span>Cảnh báo</span>
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4">
            <span className="text-sm text-gray-400">
              Hiển thị 1-5 trong {paymentSchedule.length} kết quả
            </span>
            <div className="flex space-x-2">
              <button className="rounded bg-slate-700 px-3 py-1 text-sm text-white hover:bg-slate-600">
                Trước
              </button>
              <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white">
                1
              </button>
              <button className="rounded bg-slate-700 px-3 py-1 text-sm text-white hover:bg-slate-600">
                Sau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Date Details */}
      {selectedDate && selectedView === "calendar" && (
        <div className="rounded-lg bg-slate-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Chi Tiết Ngày {formatDate(selectedDate)}
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-gray-400 hover:text-white"
            >
              <XCircle size={20} />
            </button>
          </div>

          <div className="space-y-3">
            {paymentSchedule
              .filter((p) => p.dueDate === selectedDate)
              .map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-lg border border-slate-700 p-4 hover:bg-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center space-x-3">
                        <h4 className="font-medium text-white">
                          {payment.studentName}
                        </h4>
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(payment.status)}`}
                        >
                          {getStatusText(payment)}
                        </span>
                      </div>
                      <p className="mb-1 text-sm text-gray-400">
                        Số tiền:{" "}
                        <span className="font-medium text-white">
                          {formatCurrency(payment.amount)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Phương thức: {payment.paymentMethod} | SĐT:{" "}
                        {payment.phone}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                        Chi tiết
                      </button>
                      {payment.status !== "paid" && (
                        <button className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">
                          Nhắc nhở
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {paymentSchedule.filter((p) => p.dueDate === selectedDate)
              .length === 0 && (
              <div className="py-8 text-center text-gray-400">
                Không có lịch thanh toán nào trong ngày này
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSchedulePage;
