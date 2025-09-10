import React from 'react';
import {
  BookOpen,
  Trophy,
  TrendingUp,
  Star,
  FileText,
  Award,
  ChevronRight,
  GraduationCap,
  Heart,
  Zap,
  ArrowUp,
  ArrowDown,
  User,
  School
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useStudent } from '@/hooks/useStudent';
import { useAcademic } from '@/hooks/useAcademic';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = "blue",
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

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

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon: Icon, color = "blue", onClick }) => {
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

interface InfoItem {
  label: string;
  value: string;
}

interface InfoCardProps {
  title: string;
  items: InfoItem[];
  icon: LucideIcon;
  color?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items, icon: Icon, color = "blue" }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-full bg-${color}-100 p-2 dark:bg-${color}-900/30`}>
          <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item: InfoItem, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { student } = useStudent(user?.citizen_id || '');
  const { academicData, isLoading: academicLoading } = useAcademic(student?.student_id || '');

  const quickActions = [
    {
      title: "Hồ sơ cá nhân",
      description: "Cập nhật thông tin cá nhân",
      icon: User,
      color: "blue",
      onClick: () => navigate('/profile/general-info')
    },
    {
      title: "Hồ sơ sinh viên",
      description: "Quản lý thông tin học tập",
      icon: School,
      color: "green",
      onClick: () => navigate('/profile/student-info')
    },
    {
      title: "Hồ sơ học thuật",
      description: "Cập nhật bảng điểm và thành tích",
      icon: FileText,
      color: "yellow",
      onClick: () => navigate('/profile/academic-info')
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const formatGPA = (gpa: number) => {
    return gpa ? gpa.toFixed(2) : '0.00';
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 text-white">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold">
                {getGreeting()}, {user?.name || 'Sinh viên'}! 👋
              </h1>
              <p className="mt-2 text-blue-100">
                Chào mừng bạn đến với hệ thống Student Credit
              </p>
              {academicData && (
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-300" />
                    <span className="text-sm">GPA: {formatGPA(academicData.gpa)}/4.0</span>
                  </div>
                  {academicData.has_scholarship && (
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-300" />
                      <span className="text-sm">Có học bổng</span>
                    </div>
                  )}
                </div>
              )}
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
            value={academicData ? formatGPA(academicData.gpa) : '0.00'}
            subtitle="Trên thang điểm 4.0"
            icon={TrendingUp}
            color="green"
            loading={academicLoading}
          />
          <StatCard
            title="Tín Chỉ Tích Lũy"
            value={academicData?.total_credits_earned || 0}
            subtitle="Tín chỉ đã hoàn thành"
            icon={BookOpen}
            color="blue"
            loading={academicLoading}
          />
          <StatCard
            title="Thành Tích"
            value={academicData?.achievement_award_count || 0}
            subtitle="Giải thưởng & chứng nhận"
            icon={Trophy}
            color="yellow"
            loading={academicLoading}
          />
          <StatCard
            title="Hoạt Động XH"
            value={academicData?.extracurricular_activity_count || 0}
            subtitle="Hoạt động ngoại khóa"
            icon={Heart}
            color="red"
            loading={academicLoading}
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
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {quickActions.map((action, index) => (
                  <QuickActionCard key={index} {...action} />
                ))}
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-8">
            {/* User Information */}
            <InfoCard
              title="Thông tin cá nhân"
              icon={User}
              color="blue"
              items={[
                { label: 'Họ tên', value: user?.name || 'Chưa cập nhật' },
                { label: 'Email', value: user?.email || 'Chưa cập nhật' },
                { label: 'Số CCCD', value: user?.citizen_id?.startsWith('TEMP_') ? 'Chưa cập nhật' : (user?.citizen_id || 'Chưa cập nhật') },
                { label: 'Trạng thái KYC', value: user?.kyc_status === 'Verified' ? 'Đã xác thực' : 'Chưa xác thực' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
