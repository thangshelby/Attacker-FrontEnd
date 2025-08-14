import React, { useState } from 'react';
import {
  BookOpen,
  Trophy,
  Calendar,
  TrendingUp,
  Clock,
  Star,
  Users,
  FileText,
  Award,
  Target,
  ChevronRight,
  Plus,
  Activity,
  BarChart3,
  GraduationCap,
  Heart,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, trend, trendValue, color = "blue" }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
          {trend && (
            <div className={`mt-2 flex items-center text-sm ${
              trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`rounded-full bg-${color}-100 p-3 dark:bg-${color}-900/30`}>
          <Icon className={`h-6 w-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-${color}-500 to-${color}-600 opacity-0 transition-opacity group-hover:opacity-100`}></div>
    </div>
  );
};

const QuickActionCard = ({ title, description, icon: Icon, color = "blue", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative w-full rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-600 p-6 text-left text-white transition-all hover:scale-105 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm opacity-90">{description}</p>
        </div>
        <Icon className="h-8 w-8 opacity-80 transition-transform group-hover:scale-110" />
      </div>
      <ChevronRight className="absolute bottom-4 right-4 h-5 w-5 opacity-60 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
    </button>
  );
};

const RecentActivityItem = ({ title, subtitle, time, type, icon: Icon }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'info': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className={`rounded-full p-2 ${getTypeColor(type)}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

const ProgressCard = ({ title, current, total, color = "blue" }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div 
          className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{percentage.toFixed(0)}% hoàn thành</p>
    </div>
  );
};

const UpcomingEventCard = ({ title, date, time, type, location }) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
      <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
        <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{type}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-blue-600 dark:text-blue-400">{date}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
        </div>
        {location && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{location}</p>
        )}
      </div>
    </div>
  );
};

const StudentHomeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const quickActions = [
    {
      title: "Upload Bảng Điểm",
      description: "Thêm bảng điểm học kỳ mới",
      icon: FileText,
      color: "blue",
      onClick: () => console.log("Navigate to transcript upload")
    },
    {
      title: "Thêm Thành Tích",
      description: "Ghi nhận thành tích cá nhân",
      icon: Trophy,
      color: "yellow",
      onClick: () => console.log("Navigate to achievements")
    },
    {
      title: "Hoạt Động Xã Hội",
      description: "Cập nhật hoạt động tình nguyện",
      icon: Heart,
      color: "red",
      onClick: () => console.log("Navigate to social activities")
    },
    {
      title: "Đăng Ký Học Bổng",
      description: "Khám phá cơ hội học bổng",
      icon: GraduationCap,
      color: "green",
      onClick: () => console.log("Navigate to scholarships")
    }
  ];

  const recentActivities = [
    {
      title: "Cập nhật bảng điểm HK1",
      subtitle: "Môn Lập trình Web - Điểm A",
      time: "2 giờ trước",
      type: "success",
      icon: BookOpen
    },
    {
      title: "Thành tích mới được thêm",
      subtitle: "Giải nhì Olympic Tin học",
      time: "1 ngày trước",
      type: "success",
      icon: Trophy
    },
    {
      title: "Nhắc nhở: Hạn nộp hồ sơ",
      subtitle: "Học bổng khuyến khích học tập",
      time: "2 ngày trước",
      type: "warning",
      icon: AlertCircle
    },
    {
      title: "Hoạt động tình nguyện",
      subtitle: "Mùa hè xanh 2024 - 40 giờ",
      time: "3 ngày trước",
      type: "info",
      icon: Users
    }
  ];

  const upcomingEvents = [
    {
      title: "Thi cuối kỳ môn Cơ sở dữ liệu",
      date: "15/08/2024",
      time: "07:30",
      type: "Thi cử",
      location: "Phòng A101"
    },
    {
      title: "Hội thảo Khởi nghiệp",
      date: "18/08/2024",
      time: "14:00",
      type: "Sự kiện",
      location: "Hội trường lớn"
    },
    {
      title: "Hạn nộp đơn học bổng",
      date: "20/08/2024",
      time: "23:59",
      type: "Deadline",
      location: "Online"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold">Chào mừng trở lại, Thắng! 👋</h1>
              <p className="mt-2 text-blue-100">
                Hôm nay là ngày tuyệt vời để cập nhật thành tích của bạn
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">Hoàn thành 85% mục tiêu học kỳ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">GPA: 3.75/4.0</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 opacity-10">
              <GraduationCap className="h-full w-full" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="GPA Hiện Tại"
            value="3.75"
            subtitle="Trên thang điểm 4.0"
            icon={TrendingUp}
            trend="up"
            trendValue="+0.15 so với HK trước"
            color="green"
          />
          <StatCard
            title="Tín Chỉ Tích Lũy"
            value="95"
            subtitle="/ 120 tín chỉ"
            icon={BookOpen}
            color="blue"
          />
          <StatCard
            title="Thành Tích"
            value="12"
            subtitle="Giải thưởng & chứng nhận"
            icon={Trophy}
            trend="up"
            trendValue="+3 tháng này"
            color="yellow"
          />
          <StatCard
            title="Hoạt Động XH"
            value="156"
            subtitle="Giờ tình nguyện"
            icon={Heart}
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Thao Tác Nhanh
                </h2>
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  Xem tất cả
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {quickActions.map((action, index) => (
                  <QuickActionCard key={index} {...action} />
                ))}
              </div>
            </div>

            {/* Progress Section */}
            <div>
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Tiến Độ Học Tập
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ProgressCard
                  title="Tín chỉ học kỳ này"
                  current={18}
                  total={22}
                  color="blue"
                />
                <ProgressCard
                  title="Bài tập đã hoàn thành"
                  current={24}
                  total={28}
                  color="green"
                />
                <ProgressCard
                  title="Thực hành chuyên ngành"
                  current={8}
                  total={10}
                  color="purple"
                />
                <ProgressCard
                  title="Dự án nhóm"
                  current={3}
                  total={4}
                  color="orange"
                />
              </div>
            </div>

            {/* Recent Activities */}
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Hoạt Động Gần Đây
                </h2>
                <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                  <Eye className="h-4 w-4" />
                  Xem chi tiết
                </button>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                <div className="space-y-2">
                  {recentActivities.map((activity, index) => (
                    <RecentActivityItem key={index} {...activity} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Calendar Widget */}
            <div>
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Lịch Sắp Tới
              </h2>
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <UpcomingEventCard key={index} {...event} />
                  ))}
                </div>
                <button className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700">
                  Xem lịch đầy đủ
                </button>
              </div>
            </div>

            {/* Achievement Highlight */}
            <div className="rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">Thành Tích Nổi Bật</h3>
                  <p className="mt-2 text-sm opacity-90">
                    Bạn đã đạt được 12 thành tích trong năm học này!
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    <span className="text-sm font-medium">Top 5% khoa</span>
                  </div>
                </div>
                <Award className="h-12 w-12 opacity-80" />
              </div>
            </div>

            {/* Study Tips */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                💡 Gợi Ý Hôm Nay
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cập nhật thông tin học bổng mới nhất
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tham gia hoạt động ngoại khóa để tăng điểm rèn luyện
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ôn tập cho kỳ thi cuối kỳ sắp tới
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHomeDashboard;