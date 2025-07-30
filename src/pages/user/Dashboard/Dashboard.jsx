import React, { useState, useMemo } from "react";
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Mail,
  Phone,
  Calendar,
  BarChart2,
  Bell,
  MessageSquare,
  Download,
  Upload,
} from "lucide-react";
import BaseCard from "../../../components/elements/BaseCard"; // Đảm bảo đường dẫn đúng

// --- MOCK DATA ---
const loanStats = { total: 1, approved: 0, waiting: 1, rejected: 0 };
const notifications = [
  { id: 1, text: "Cần bổ sung bảng điểm học kỳ I năm 2024", type: "warning" },
  {
    id: 2,
    text: "Hẹn phỏng vấn online ngày 05/08/2025 lúc 14:00",
    type: "info",
  },
];
const progressChecklist = [
  { text: "Nộp hồ sơ trực tuyến", done: true },
  { text: "Xác minh thông tin cá nhân", done: true },
  { text: "Thẩm định hồ sơ", done: false, inProgress: true },
  { text: "Phỏng vấn trực tuyến", done: false },
  { text: "Phê duyệt và giải ngân", done: false },
];
const documents = [
  { name: "CMND/CCCD", status: "verified" },
  { name: "Bảng điểm", status: "needs_update" },
  { name: "Giấy xác nhận sinh viên", status: "verified" },
  { name: "Sổ hộ khẩu", status: "verified" },
];
const appointments = [
  { date: "05/08/2025", time: "14:00", event: "Phỏng vấn trực tuyến qua Zoom" },
  { date: "08/08/2025", time: "17:00", event: "Hạn nộp bổ sung bảng điểm" },
];
const pastLoans = [
  {
    id: "HDV-2023-001",
    amount: "20.000.000 ₫",
    date: "15/09/2023",
    status: "approved",
  },
  {
    id: "HDV-2023-002",
    amount: "25.000.000 ₫",
    date: "01/03/2024",
    status: "rejected",
  },
  {
    id: "HDV-2024-007",
    amount: "25.000.000 ₫",
    date: "20/07/2024",
    status: "processing",
  },
];

// --- COMPONENT NHỎ TÁI SỬ DỤNG ---
const ChecklistItem = ({ text, done, inProgress }) => (
  <div className="flex items-center gap-3">
    {done ? (
      <CheckCircle size={20} className="flex-shrink-0 text-green-500" />
    ) : (
      <div
        className={`h-5 w-5 rounded-full border-2 ${inProgress ? "animate-spin border-indigo-500" : "border-gray-300 dark:border-gray-600"}`}
      ></div>
    )}
    <span
      className={`${done ? "text-gray-500 line-through" : "text-gray-800 dark:text-gray-200"}`}
    >
      {text}
    </span>
  </div>
);

const DocumentStatus = ({ status }) => {
  const config = {
    verified: {
      text: "Đã xác minh",
      icon: <CheckCircle className="text-green-500" />,
      color: "text-green-500",
    },
    needs_update: {
      text: "Cần cập nhật",
      icon: <AlertTriangle className="text-orange-500" />,
      color: "text-orange-500",
    },
  };
  const current = config[status] || {};
  return (
    <span
      className={`flex items-center gap-1.5 text-xs font-semibold ${current.color}`}
    >
      {current.icon} {current.text}
    </span>
  );
};

// --- TRANG DASHBOARD CHÍNH ---
const Dashboard = () => {
  const [filter, setFilter] = useState("all");

  const filteredHistory = useMemo(() => {
    if (filter === "all") return pastLoans;
    return pastLoans.filter((loan) => loan.status === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Bảng điều khiển
      </h1>

      <div className="grid grid-cols-12 gap-6">
        {/* === KHU VỰC TRUNG TÂM === */}
        <div className="col-span-12 space-y-6 lg:col-span-7">
          {/* Card 2: Trạng thái hồ sơ */}
          <BaseCard title="Trạng thái hồ sơ">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-xl font-bold text-orange-500">ĐANG XỬ LÝ</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Timeline</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Nộp hồ sơ ✓ → Xét duyệt 🔄 → Giải ngân ⏳
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Thời gian</p>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Còn 7 ngày để hoàn thiện
                </p>
              </div>
            </div>
          </BaseCard>

          {/* Card 4: Tiến độ xử lý */}
          <BaseCard
            title="Tiến độ xử lý"
            headerActions={
              <span className="font-bold text-indigo-500">40%</span>
            }
          >
            <div className="space-y-4">
              {progressChecklist.map((item, index) => (
                <ChecklistItem key={index} {...item} />
              ))}
            </div>
          </BaseCard>
        </div>

        <div className="col-span-12 space-y-6 lg:col-span-5">
          {/* Card 3: Thông báo */}
          <BaseCard
            title="Thông báo"
            headerActions={
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                2
              </span>
            }
          >
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <Bell
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-indigo-500"
                  />
                  {n.text}
                </li>
              ))}
            </ul>
          </BaseCard>

          {/* Card 9: Lịch hẹn */}
          <BaseCard title="Lịch hẹn sắp tới">
            <ul className="space-y-3">
              {appointments.map((a) => (
                <li
                  key={a.event}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <Calendar
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-green-500"
                  />{" "}
                  <div>
                    <strong>
                      {a.date} - {a.time}:
                    </strong>{" "}
                    {a.event}
                  </div>
                </li>
              ))}
            </ul>
          </BaseCard>
        </div>

        {/* === KHU VỰC CHI TIẾT === */}
        <div className="col-span-12 lg:col-span-7">
          {/* Card 8: Quản lý hồ sơ */}
          <BaseCard
            title="Quản lý hồ sơ"
            footer={
              <div className="flex gap-4">
                <button className="btn-primary flex-1">
                  <Upload size={16} /> Tải lên
                </button>
                <button className="btn-secondary flex-1">
                  <Download size={16} /> Tải mẫu
                </button>
              </div>
            }
          >
            <ul className="space-y-3">
              {documents.map((d) => (
                <li key={d.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText size={18} />
                    {d.name}
                  </span>{" "}
                  <DocumentStatus status={d.status} />
                </li>
              ))}
            </ul>
          </BaseCard>
        </div>

        <div className="col-span-12 lg:col-span-5">
          {/* Card 6: Biểu đồ thống kê */}
          <BaseCard title="Kế hoạch giải ngân">
            <div className="space-y-2 text-sm">
              <p>
                Học kỳ I/2025:{" "}
                <span className="font-semibold">12.500.000 VNĐ</span>
              </p>
              <p>
                Học kỳ II/2025:{" "}
                <span className="font-semibold">12.500.000 VNĐ</span>
              </p>
              <div className="mt-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                Chưa giải ngân
              </div>
            </div>
          </BaseCard>
        </div>

        {/* === KHU VỰC PHỤ TRỢ === */}
        <div className="col-span-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Thống kê */}
          <BaseCard title="Tổng quan hồ sơ">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>
                Tổng: <span className="font-bold">{loanStats.total}</span>
              </p>
              <p>
                Đã duyệt:{" "}
                <span className="font-bold">{loanStats.approved}</span>
              </p>
              <p>
                Đang chờ: <span className="font-bold">{loanStats.waiting}</span>
              </p>
              <p>
                Từ chối: <span className="font-bold">{loanStats.rejected}</span>
              </p>
            </div>
          </BaseCard>
          {/* Card 5: Thông tin tài chính */}
          <BaseCard title="Thông tin khoản vay">
            <div className="space-y-1 text-sm">
              <p>
                Số tiền: <span className="font-bold">25.000.000 VNĐ</span>
              </p>
              <p>
                Lãi suất: <span className="font-bold">0%/năm</span>
              </p>
              <p>
                Thời hạn: <span className="font-bold">4 năm</span>
              </p>
            </div>
          </BaseCard>
          {/* Card 7: Hỗ trợ */}
          <BaseCard title="Hỗ trợ">
            <div className="space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <MessageSquare size={14} /> 0 tin nhắn mới
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> 1900-1234
              </p>
              <p className="text-xs text-gray-500">
                Tư vấn viên sẽ online lúc 8:00
              </p>
            </div>
          </BaseCard>
        </div>

        {/* === KHU VỰC LỊCH SỬ === */}
        <div className="col-span-12">
          <BaseCard
            title="Lịch sử vay"
            headerActions={
              <div className="flex gap-2">
                {["all", "processing", "approved", "rejected"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-md px-3 py-1 text-sm transition ${filter === f ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700"}`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            }
          >
            <div className="max-h-60 space-y-3 overflow-y-auto pr-2">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((loan) => (
                  <div
                    key={loan.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                  >
                    <div>
                      <p className="font-bold">{loan.id}</p>
                      <p className="text-sm text-gray-500">{loan.date}</p>
                    </div>
                    <p className="font-semibold">{loan.amount}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        loan.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : loan.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-gray-500">
                  Không có dữ liệu phù hợp.
                </p>
              )}
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
