import {
  DollarSign,
  Target,
  AlertCircle,
  User,
  Home,
  FileText,
  Briefcase,
} from "lucide-react";
import {
  loanPurposes,
  paymentMethods,
  paymentFrequencies,
  incomeRanges,
  studentGurantor,
  loanPeriod,
  formatCurrency,
} from "@/constants/newloan";

// FormField component
const FormField = ({
  label,
  icon: Icon,
  error,
  children,
  required = false,
  description,
}) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
      {Icon && <Icon className="mr-2 h-4 w-4 text-green-500" />}
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
    {description && (
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    )}
    <div className="relative">
      {children}
      {error && (
        <div className="mt-1 flex items-center text-sm text-red-600">
          <AlertCircle className="mr-1 h-4 w-4" />
          {error.message}
        </div>
      )}
    </div>
  </div>
);
const Step1 = ({ formData, errors, handleInputChange }) => {      
  return (
    <>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <h2 className="flex items-center text-lg font-semibold text-white">
          <DollarSign className="mr-2 h-5 w-5" />
          Bước 1: Thu thập thông tin khoản vay
        </h2>
      </div>

      <div className="space-y-8 p-6">
        {/* Student ID Display */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/30">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800 dark:text-green-200">
              Mã sinh viên: {formData.student_id}
            </span>
          </div>
        </div>

        {/* Simplified Loan Form - 5 fields only */}
        <div className="space-y-6">
          {/* Số tiền vay */}
          <FormField
            label="Số tiền vay"
            icon={DollarSign}
            error={errors.loan_amount_requested}
            required
            description="Nhập số tiền bạn muốn vay (VND)"
          >
            <input
              type="number"
              value={formData.loan_amount_requested}
              onChange={(e) =>
                handleInputChange("loan_amount_requested", e.target.value)
              }
              placeholder="Ví dụ: 30000000"
              min="1"
              max="100000000"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {formData.loan_amount_requested && (
              <p className="mt-1 text-sm text-green-600">
                {formatCurrency(formData.loan_amount_requested)}
              </p>
            )}
          </FormField>

          {/* Người bảo lãnh */}
          <FormField
            label="Người bảo lãnh"
            icon={User}
            error={errors.guarantor}
            required
            description="Chọn người bảo lãnh cho khoản vay"
          >
            <input
              type="text"
              value={formData.guarantor}
              onChange={(e) => handleInputChange("guarantor", e.target.value)}
              placeholder="Ví dụ: mẹ, bố, anh trai..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </FormField>

          {/* Thu nhập gia đình */}
          <FormField
            label="Thu nhập gia đình (VND/tháng)"
            icon={Home}
            error={errors.family_income}
            required
            description="Nhập thu nhập hàng tháng của gia đình"
          >
            <input
              type="number"
              value={formData.family_income}
              onChange={(e) => handleInputChange("family_income", e.target.value)}
              placeholder="Ví dụ: 15000000"
              min="0"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {formData.family_income && (
              <p className="mt-1 text-sm text-green-600">
                {formatCurrency(formData.family_income)}
              </p>
            )}
          </FormField>

          {/* Có nợ xấu hay không */}
          <FormField
            label="Có nợ xấu hay không"
            icon={AlertCircle}
            error={errors.existing_debt}
            required
            description="Bạn có đang có khoản nợ xấu nào khác không?"
          >
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="existing_debt"
                  value="false"
                  checked={formData.existing_debt === "false"}
                  onChange={(e) => handleInputChange("existing_debt", e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Không</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="existing_debt"
                  value="true"
                  checked={formData.existing_debt === "true"}
                  onChange={(e) => handleInputChange("existing_debt", e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Có</span>
              </label>
            </div>
          </FormField>

          {/* Có đi làm thêm không */}
          <FormField
            label="Bạn có đi làm thêm không?"
            icon={Briefcase}
            error={errors.has_part_time_job}
            required
            description="Việc làm thêm giúp đánh giá khả năng tài chính của bạn"
          >
            <div className="flex space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="has_part_time_job"
                  value="true"
                  checked={formData.has_part_time_job === "true"}
                  onChange={(e) => handleInputChange("has_part_time_job", e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Có</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="has_part_time_job"
                  value="false"
                  checked={formData.has_part_time_job === "false"}
                  onChange={(e) => handleInputChange("has_part_time_job", e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Không</span>
              </label>
            </div>
          </FormField>

          {/* Mục đích vay */}
          <FormField
            label="Mục đích vay"
            icon={Target}
            error={errors.loan_purpose}
            required
            description="Nhập mục đích sử dụng khoản vay"
          >
            <input
              type="text"
              value={formData.loan_purpose}
              onChange={(e) => handleInputChange("loan_purpose", e.target.value)}
              placeholder="Ví dụ: Học phí, mua laptop, chi phí sinh hoạt..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </FormField>
        </div>
      </div>
    </>
  );
};

export default Step1;
