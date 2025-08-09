import React from "react";
import {
  User,
  GraduationCap,
  DollarSign,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  Shield,
  Sparkles,
  ChevronRight
} from "lucide-react";


// Modern Minimalist Overview
const OverviewSection = ({ selectedLoan, formatCurrency }) => {
  const decisionConfig = {
    approved: {
      icon: CheckCircle,
      color: 'emerald',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      text: 'Chấp thuận',
      textColor: 'text-emerald-400'
    },
    rejected: {
      icon: XCircle,
      color: 'red',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      text: 'Từ chối',
      textColor: 'text-red-400'
    },
    pending: {
      icon: Clock,
      color: 'amber',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      text: 'Đang xử lý',
      textColor: 'text-amber-400'
    }
  };

  const currentDecision = decisionConfig[selectedLoan.decision] || decisionConfig.pending;
  const DecisionIcon = currentDecision.icon;

  // Calculate key metrics
  const paymentRatio = Math.round((selectedLoan.monthly_installment / (parseInt(selectedLoan.family_income) / 12)) * 100);
  const riskScore = Math.round(Math.random() * 100); // Mock risk score

  return (
    <div className="space-y-8">
      {/* Hero Section - Main Decision */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${currentDecision.bgColor} ${currentDecision.borderColor} border shadow-lg`}>
                <DecisionIcon className={`h-8 w-8 ${currentDecision.textColor}`} />
              </div>
              <div>
                <div className={`text-3xl font-bold ${currentDecision.textColor}`}>
                  {currentDecision.text}
                </div>
                <div className="text-slate-400">
                  Xử lý trong {selectedLoan.processing_time}s • {new Date(selectedLoan.created_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {formatCurrency(selectedLoan.loan_amount_requested)}
              </div>
              <div className="text-slate-400">
                {selectedLoan.loan_tenor} tháng • {formatCurrency(selectedLoan.monthly_installment)}/tháng
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MetricCard
          icon={TrendingUp}
          label="Tỷ lệ thu nhập"
          value={`${paymentRatio}%`}
          status={paymentRatio < 30 ? 'good' : paymentRatio < 50 ? 'warning' : 'danger'}
          progress={Math.min(paymentRatio, 100)}
        />
        
        <MetricCard
          icon={Shield}
          label="Risk Score"
          value={`${riskScore}/100`}
          status={riskScore < 30 ? 'good' : riskScore < 70 ? 'warning' : 'danger'}
          progress={riskScore}
        />
        
        <MetricCard
          icon={GraduationCap}
          label="GPA"
          value={`${selectedLoan.academicInfo?.current_gpa}/4.0`}
          status={selectedLoan.academicInfo?.current_gpa >= 3.0 ? 'good' : selectedLoan.academicInfo?.current_gpa >= 2.5 ? 'warning' : 'danger'}
          progress={(selectedLoan.academicInfo?.current_gpa / 4) * 100}
        />
        
        <MetricCard
          icon={Zap}
          label="Độ ưu tiên"
          value="Cao"
          status={selectedLoan.academicInfo?.has_scholarship ? 'good' : 'warning'}
          badge={selectedLoan.academicInfo?.has_scholarship ? 'Học bổng' : null}
        />
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Student Profile */}
        <QuickInfoCard
          title="Sinh viên"
          icon={<User className="h-5 w-5 text-blue-400" />}
          items={[
            { label: "Họ tên", value: selectedLoan.studentInfo?.name },
            { label: "Trường", value: selectedLoan.studentInfo?.university },
            { label: "Năm", value: `Năm ${selectedLoan.studentInfo?.year_of_study}` },
            { label: "Lớp", value: selectedLoan.studentInfo?.class_id }
          ]}
          highlight={selectedLoan.userInfo?.kyc_status === 'Verified'}
        />

        {/* Academic Summary */}
        <QuickInfoCard
          title="Học tập"
          icon={<GraduationCap className="h-5 w-5 text-emerald-400" />}
          items={[
            { label: "GPA", value: `${selectedLoan.academicInfo?.current_gpa}/4.0` },
            { label: "Tín chỉ", value: `${selectedLoan.academicInfo?.total_credits_earned}` },
            { label: "Học bổng", value: selectedLoan.academicInfo?.has_scholarship ? "Có" : "Không" },
            { label: "Hoạt động", value: `${selectedLoan.academicInfo?.extracurricular_activity_count || 0}` }
          ]}
          highlight={selectedLoan.academicInfo?.has_scholarship}
        />

        {/* Financial Summary */}
        <QuickInfoCard
          title="Tài chính"
          icon={<DollarSign className="h-5 w-5 text-purple-400" />}
          items={[
            { label: "Thu nhập GĐ", value: formatCurrency(parseInt(selectedLoan.family_income)) },
            { label: "Lãi suất", value: `${Math.round((selectedLoan.total_interest / selectedLoan.loan_amount_requested) * 100)}%` },
            { label: "Tổng trả", value: formatCurrency(selectedLoan.total_payment) },
            { label: "Mục đích", value: loanPurposes[selectedLoan.loan_purpose] }
          ]}
          highlight={paymentRatio < 30}
        />
      </div>

      {/* AI Insights (Mock) */}
      <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-r from-slate-800/60 to-slate-700/60 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">AI Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-600/50 bg-slate-800/50 p-4">
            <div className="text-sm text-slate-400 mb-1">Điểm mạnh</div>
            <div className="text-white">
              • GPA cao ({selectedLoan.academicInfo?.current_gpa}/4.0)<br/>
              {selectedLoan.academicInfo?.has_scholarship && "• Có học bổng"}<br/>
              • Thu nhập gia đình ổn định
            </div>
          </div>
          
          <div className="rounded-xl border border-slate-600/50 bg-slate-800/50 p-4">
            <div className="text-sm text-slate-400 mb-1">Khuyến nghị</div>
            <div className="text-white">
              {paymentRatio < 30 ? "• Tỷ lệ trả góp phù hợp" : "• Cân nhắc giảm số tiền vay"}<br/>
              • Theo dõi kết quả học tập<br/>
              • {selectedLoan.decision === 'approved' ? 'Thiết lập auto-pay' : 'Cải thiện hồ sơ'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ icon: Icon, label, value, status, progress, badge }) => {
  const statusColors = {
    good: 'from-emerald-500 to-green-500',
    warning: 'from-amber-500 to-orange-500',
    danger: 'from-red-500 to-pink-500'
  };

  const textColors = {
    good: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-red-400'
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-4 shadow-lg backdrop-blur-xl transition-all hover:scale-105">
      <div className="flex items-center justify-between mb-3">
        <Icon className={`h-6 w-6 ${textColors[status]}`} />
        {badge && (
          <span className="rounded-full bg-purple-900/30 px-2 py-1 text-xs text-purple-400 border border-purple-700/50">
            {badge}
          </span>
        )}
      </div>
      
      <div className="text-lg font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400 mb-3">{label}</div>
      
      {progress !== undefined && (
        <div className="h-1.5 w-full rounded-full bg-slate-700">
          <div 
            className={`h-1.5 rounded-full bg-gradient-to-r ${statusColors[status]} transition-all duration-300`}
            style={{width: `${Math.min(progress, 100)}%`}}
          />
        </div>
      )}
    </div>
  );
};

// Quick Info Card Component
const QuickInfoCard = ({ title, icon, items, highlight }) => (
  <div className={`rounded-2xl border p-6 shadow-xl backdrop-blur-xl transition-all hover:scale-102 ${
    highlight 
      ? 'border-emerald-500/30 bg-emerald-900/10' 
      : 'border-slate-700/50 bg-slate-800/60'
  }`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`rounded-xl p-2 ${highlight ? 'bg-emerald-500/20' : 'bg-slate-700/50'}`}>
          {icon}
        </div>
        <h3 className="font-bold text-white">{title}</h3>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </div>
    
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <span className="text-slate-400">{item.label}</span>
          <span className="font-medium text-white text-right">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const loanPurposes = {
  1: "Học phí",
  2: "Sinh hoạt phí", 
  3: "Mua sách/thiết bị",
  4: "Khác"
};

export default OverviewSection;

