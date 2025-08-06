import {
  DollarSign,
  Calendar,
  Target,
  Calculator,
  AlertCircle,
  TrendingUp,
  FileText,
  Clock,
  User,
  Home,
  Settings,
} from "lucide-react";
import {
  loanPurposes,
  paymentMethods,
  paymentFrequencies,
  incomeRanges,
  studentGurantor,
  loanPeriod,
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
  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(
      (pm) => pm.id === parseInt(formData.payment_method),
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const selectedPurpose = loanPurposes.find(
    (p) => p.id === parseInt(formData.loan_purpose),
  );

  const selectedPaymentMethod = getSelectedPaymentMethod();
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

        {/* Loan Details */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
              placeholder="Ví dụ: 10000000"
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

          <FormField
            label="Thời hạn vay"
            icon={Calendar}
            error={errors.loan_tenor}
            required
            description="Số tháng bạn muốn trả nợ (3-60 tháng)"
          >
            <select
              value={formData.loan_tenor}
              onChange={(e) => handleInputChange("loan_tenor", e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {Array.isArray(loanPeriod) && loanPeriod.length > 0 ? (
                loanPeriod.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))
              ) : (
                <option value="">Chọn thời hạn</option>
              )}
            </select>
          </FormField>

          <FormField
            label="Người bảo lãnh"
            icon={User}
            error={errors.guarantor}
            required
            description="Họ tên người bảo lãnh cho khoản vay"
          >
            <select
              value={formData.guarantor}
              onChange={(e) =>
                handleInputChange("guarantor", e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {Array.isArray(studentGurantor) &&
                studentGurantor.length > 0 &&
                studentGurantor.map((guarantor) => (
                  <option key={guarantor.value} value={guarantor.value}>
                    {guarantor.label}
                  </option>
                ))}
            </select>
          </FormField>

          <FormField
            label="Thu nhập gia đình"
            icon={Home}
            error={errors.family_income}
            required
            description="Thu nhập hàng tháng của gia đình (VND)"
          >
            <select
              value={formData.family_income}
              onChange={(e) =>
                handleInputChange("family_income", e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {Array.isArray(incomeRanges) &&
                incomeRanges.length > 0 &&
                incomeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
            </select>
            {/* {formData.family_income && (
              <p className="mt-1 text-sm text-green-600">
                {formData.family_income}
              </p>
            )} */}
          </FormField>

          <div className="lg:col-span-2">
            <FormField
              label="Mục đích vay"
              icon={Target}
              error={errors.loan_purpose}
              required
              description="Chọn mục đích sử dụng khoản vay"
            >
              <select
                value={formData.loan_purpose}
                onChange={(e) =>
                  handleInputChange("loan_purpose", e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Chọn mục đích vay</option>
                {loanPurposes.map((purpose) => (
                  <option key={purpose.id} value={purpose.id}>
                    {purpose.name} - {purpose.description}
                  </option>
                ))}
              </select>
            </FormField>

            {formData.loan_purpose === "6" && (
              <div className="mt-4">
                <FormField
                  label="Mô tả mục đích cụ thể"
                  icon={FileText}
                  error={errors.custom_purpose}
                  required
                  description="Vui lòng mô tả chi tiết mục đích vay của bạn"
                >
                  <textarea
                    value={formData.custom_purpose}
                    onChange={(e) =>
                      handleInputChange("custom_purpose", e.target.value)
                    }
                    placeholder="Mô tả chi tiết mục đích vay của bạn..."
                    rows="3"
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>
              </div>
            )}
          </div>

          {/* Payment Method Selection */}
          <div className="lg:col-span-2">
            <FormField
              label="Phương thức trả lãi"
              icon={Settings}
              error={errors.payment_method}
              required
              description="Chọn cách thức trả lãi phù hợp với khả năng tài chính"
            >
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="relative">
                    <label
                      className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-all duration-200 ${
                        formData.payment_method === method.id.toString()
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-300 hover:border-gray-400 dark:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.id}
                        checked={
                          formData.payment_method === method.id.toString()
                        }
                        onChange={(e) =>
                          handleInputChange("payment_method", e.target.value)
                        }
                        className="mt-0.5 h-4 w-4 text-green-600 focus:ring-green-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {method.name}
                          </span>
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            {(method.interestRate * 100).toFixed(1)}
                            %/năm
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {method.description}
                        </p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </FormField>

            {formData.payment_method &&
              paymentMethods.find(
                (pm) => pm.id === parseInt(formData.payment_method),
              )?.hasFrequency && (
                <div className="mt-4">
                  <FormField
                    label="Tần suất trả tiền"
                    icon={Clock}
                    error={errors.payment_frequency}
                    required
                    description="Chọn tần suất bạn muốn trả tiền"
                  >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      {paymentFrequencies.map((freq) => {
                        const isDisabled =
                          parseInt(formData.loan_tenor) < freq.months ||
                          (freq.months === 6 &&
                            parseInt(formData.loan_tenor) < 12);

                        return (
                          <label
                            key={freq.id}
                            className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-all duration-200 ${
                              formData.payment_frequency ===
                              freq.months.toString()
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-300 hover:border-gray-400 dark:border-gray-600"
                            } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                          >
                            <input
                              type="radio"
                              name="payment_frequency"
                              value={freq.months}
                              checked={
                                formData.payment_frequency ===
                                freq.months.toString()
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "payment_frequency",
                                  e.target.value,
                                )
                              }
                              disabled={isDisabled}
                              className="h-4 w-4 text-green-600 focus:ring-green-500"
                            />
                            <div className="flex-1">
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {freq.name}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {freq.description}
                              </p>
                              {isDisabled && (
                                <p className="text-xs text-red-500">
                                  {freq.months === 6
                                    ? "Cần thời hạn ≥12 tháng"
                                    : `Cần thời hạn ≥${freq.months} tháng`}
                                </p>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </FormField>
                </div>
              )}
          </div>
        </div>

        {/* Calculation Results */}
        {formData.loan_amount_requested &&
          formData.loan_tenor &&
          formData.payment_method && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/30">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-green-800 dark:text-green-200">
                <Calculator className="mr-2 h-5 w-5" />
                Thông tin trả nợ (ước tính)
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Số tiền vay
                      </p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(formData.loan_amount_requested)}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Thời hạn
                      </p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formData.loan_tenor} tháng
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-500" />
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Tổng lãi
                      </p>
                      <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {formatCurrency(formData.total_interest)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-500" />
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Tổng tiền trả
                      </p>
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(formData.total_payment)}
                      </p>
                    </div>
                    <Calculator className="h-8 w-8 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Step1;
