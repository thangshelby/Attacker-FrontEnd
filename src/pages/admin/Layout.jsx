import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Building2,
  GraduationCap,
  CreditCard,
  Banknote,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Brain,
  Zap,
  Star,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Percent,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Pie,
} from "recharts";

// Mock data
const monthlyData = [
  {
    month: "T1",
    applications: 45,
    approved: 32,
    rejected: 8,
    pending: 5,
    totalAmount: 2.1,
  },
  {
    month: "T2",
    applications: 52,
    approved: 38,
    rejected: 9,
    pending: 5,
    totalAmount: 2.8,
  },
  {
    month: "T3",
    applications: 48,
    approved: 35,
    rejected: 7,
    pending: 6,
    totalAmount: 2.4,
  },
  {
    month: "T4",
    applications: 65,
    approved: 45,
    rejected: 12,
    pending: 8,
    totalAmount: 3.2,
  },
  {
    month: "T5",
    applications: 58,
    approved: 42,
    rejected: 10,
    pending: 6,
    totalAmount: 2.9,
  },
  {
    month: "T6",
    applications: 72,
    approved: 55,
    rejected: 11,
    pending: 6,
    totalAmount: 3.8,
  },
  {
    month: "T7",
    applications: 68,
    approved: 48,
    rejected: 15,
    pending: 5,
    totalAmount: 3.5,
  },
  {
    month: "T8",
    applications: 75,
    approved: 58,
    rejected: 12,
    pending: 5,
    totalAmount: 4.1,
  },
];

const purposeData = [
  { name: "Học phí", value: 45, color: "#3B82F6" },
  { name: "Sinh hoạt phí", value: 30, color: "#10B981" },
  { name: "Sách/Thiết bị", value: 15, color: "#F59E0B" },
  { name: "Khác", value: 10, color: "#EF4444" },
];

const universityData = [
  { name: "ĐH Kinh Tế - Luật", students: 125, amount: 6.2, avgGPA: 3.2 },
  { name: "ĐH Bách Khoa", students: 98, amount: 5.8, avgGPA: 3.4 },
  { name: "ĐH Quốc Gia", students: 87, amount: 4.9, avgGPA: 3.6 },
  { name: "ĐH Công Nghệ", students: 76, amount: 4.1, avgGPA: 3.1 },
  { name: "ĐH Khoa học Tự nhiên", students: 65, amount: 3.7, avgGPA: 3.3 },
];

const aiPerformanceData = [
  { agent: "Academic Agent", accuracy: 92, decisions: 345, avgTime: 2.3 },
  { agent: "Finance Agent", accuracy: 89, decisions: 345, avgTime: 1.8 },
  { agent: "Critical Academic", accuracy: 94, decisions: 345, avgTime: 3.1 },
  { agent: "Critical Finance", accuracy: 87, decisions: 345, avgTime: 2.7 },
];

const recentActivities = [
  {
    id: 1,
    type: "approval",
    student: "SV001",
    amount: "50,000,000",
    time: "5 phút trước",
    university: "ĐH Kinh Tế - Luật",
  },
  {
    id: 2,
    type: "rejection",
    student: "SV002",
    amount: "30,000,000",
    time: "12 phút trước",
    university: "ĐH Bách Khoa",
  },
  {
    id: 3,
    type: "pending",
    student: "SV003",
    amount: "40,000,000",
    time: "18 phút trước",
    university: "ĐH Quốc Gia",
  },
  {
    id: 4,
    type: "approval",
    student: "SV004",
    amount: "25,000,000",
    time: "25 phút trước",
    university: "ĐH Công Nghệ",
  },
  {
    id: 5,
    type: "approval",
    student: "SV005",
    amount: "35,000,000",
    time: "32 phút trước",
    university: "ĐH Khoa học Tự nhiên",
  },
];

const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  subtitle,
}) => {
  const isPositive = changeType === "positive";

  return (
    <div className="transform overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-105 dark:bg-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {subtitle && (
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {subtitle}
              </p>
            )}
            {change && (
              <div
                className={`mt-2 flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}
              >
                {isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                <span className="text-sm font-medium">{change}</span>
                <span className="ml-1 text-xs text-gray-500">
                  so với tháng trước
                </span>
              </div>
            )}
          </div>
          <div className={`rounded-2xl p-4 ${color}`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => {
  const getActivityColor = (type) => {
    switch (type) {
      case "approval":
        return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "rejection":
        return "text-red-600 bg-red-100 dark:bg-red-900/30";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-700";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "approval":
        return CheckCircle;
      case "rejection":
        return XCircle;
      case "pending":
        return Clock;
      default:
        return AlertTriangle;
    }
  };

  const getActivityText = (type) => {
    switch (type) {
      case "approval":
        return "được duyệt";
      case "rejection":
        return "bị từ chối";
      case "pending":
        return "đang chờ xử lý";
      default:
        return "cập nhật";
    }
  };

  const Icon = getActivityIcon(activity.type);

  return (
    <div className="flex items-center space-x-4 rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-900 dark:text-white">
          Khoản vay <span className="font-semibold">{activity.student}</span>{" "}
          {getActivityText(activity.type)}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {activity.university} • {activity.amount} VND
        </p>
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500">
        {activity.time}
      </div>
    </div>
  );
};

const OverviewDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months");
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalApplications = monthlyData.reduce(
    (sum, month) => sum + month.applications,
    0,
  );
  const totalApproved = monthlyData.reduce(
    (sum, month) => sum + month.approved,
    0,
  );
  const totalRejected = monthlyData.reduce(
    (sum, month) => sum + month.rejected,
    0,
  );
  const totalAmount = monthlyData.reduce(
    (sum, month) => sum + month.totalAmount,
    0,
  );
  const approvalRate = ((totalApproved / totalApplications) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                Dashboard Tổng Quan
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Thống kê và phân tích tình hình vay vốn sinh viên
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="1month">1 tháng</option>
                <option value="3months">3 tháng</option>
                <option value="6months">6 tháng</option>
                <option value="1year">1 năm</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Tổng đơn vay"
            value={totalApplications.toLocaleString()}
            change="+12.5%"
            changeType="positive"
            icon={Users}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            subtitle="trong 8 tháng"
          />
          <StatCard
            title="Tỷ lệ duyệt"
            value={`${approvalRate}%`}
            change="+2.3%"
            changeType="positive"
            icon={Target}
            color="bg-gradient-to-r from-green-500 to-green-600"
            subtitle={`${totalApproved}/${totalApplications} đơn`}
          />
          <StatCard
            title="Tổng giá trị"
            value={`${totalAmount.toFixed(1)}B`}
            change="+8.7%"
            changeType="positive"
            icon={DollarSign}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
            subtitle="VNĐ đã giải ngân"
          />
          <StatCard
            title="Đơn chờ xử lý"
            value="23"
            change="-15%"
            changeType="positive"
            icon={Clock}
            color="bg-gradient-to-r from-yellow-500 to-yellow-600"
            subtitle="cần được duyệt"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Charts Section */}
          <div className="space-y-8 lg:col-span-2">
            {/* Monthly Trends */}
            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Xu hướng theo tháng
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Đơn vay
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Được duyệt
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Từ chối
                    </span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="approved"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="rejected"
                    stackId="3"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* University Performance */}
            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Thống kê theo trường
              </h2>
              <div className="space-y-4">
                {universityData.map((uni, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/30">
                        <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {uni.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {uni.students} sinh viên
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {uni.amount}B VNĐ
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        GPA: {uni.avgGPA}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Performance */}
            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-6 flex items-center space-x-2">
                <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Hiệu suất AI Agents
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {aiPerformanceData.map((agent, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-4 dark:border-gray-600"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {agent.agent}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {agent.accuracy}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Quyết định:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {agent.decisions}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Thời gian TB:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {agent.avgTime}s
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000"
                          style={{ width: `${agent.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Purpose Distribution */}
            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Mục đích vay
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    data={purposeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {purposeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activities */}
            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Hoạt động gần đây
                </h2>
                <Activity className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-1">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
              <button className="mt-4 w-full rounded-lg bg-gray-100 p-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                Xem tất cả hoạt động
              </button>
            </div>

            {/* Quick Stats */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
              <h2 className="mb-4 text-xl font-bold">Thống kê nhanh</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>Số trường tham gia</span>
                  </div>
                  <span className="font-bold">25</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Sinh viên đăng ký</span>
                  </div>
                  <span className="font-bold">1,245</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Banknote className="h-5 w-5" />
                    <span>Số tiền TB/khoản</span>
                  </div>
                  <span className="font-bold">42.5M</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Tốc độ xử lý</span>
                  </div>
                  <span className="font-bold">2.1s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Detailed Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Monthly Amount Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Giá trị giải ngân theo tháng
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}B VNĐ`, "Giá trị"]} />
                <Bar
                  dataKey="totalAmount"
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Success Rate Trend */}
          <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Tỷ lệ thành công theo tháng
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData.map((month) => ({
                  ...month,
                  successRate: (
                    (month.approved / month.applications) *
                    100
                  ).toFixed(1),
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Tỷ lệ thành công"]}
                />
                <Line
                  type="monotone"
                  dataKey="successRate"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "#10B981", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
