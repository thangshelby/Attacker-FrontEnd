import React, { useState } from "react";
import {
  DollarSign,
  Calendar,
  Target,
  Calculator,
  CheckCircle,
  AlertCircle,
  Send,
  X,
  CreditCard,
  TrendingUp,
  FileText,
  Clock,
  User,
  Home,
} from "lucide-react";

// Mock data for loan purposes
const loanPurposes = [
  { id: 1, name: "Học phí", description: "Chi trả học phí học kỳ" },
  { id: 2, name: "Sinh hoạt phí", description: "Chi phí sinh hoạt hàng tháng" },
  {
    id: 3,
    name: "Mua sách và tài liệu",
    description: "Sách giáo khoa, tài liệu học tập",
  },
  {
    id: 4,
    name: "Thiết bị học tập",
    description: "Laptop, máy tính, thiết bị",
  },
  { id: 5, name: "Chi phí khác", description: "Các chi phí học tập khác" },
  { id: 6, name: "Khác", description: "Mục đích khác (vui lòng ghi rõ)" },
];

// Validation functions
const validateAmount = (amount) => {
  return amount > 0 && amount <= 100000000; // Max 100 million VND
};

const validateTenor = (tenor) => {
  return tenor >= 3 && tenor <= 60; // 3-60 months
};

const validateFamilyIncome = (income) => {
  return income > 0 && income <= 1000000000; // Max 1 billion VND
};

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

const NewLoans = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "SV001", // Mock student ID
    requested_loan_amount: "",
    loan_tenor: "",
    loan_purpose: "",
    custom_purpose: "",
    guarantor: "",
    family_income: "",
    monthly_installment: 0,
  });
  const [errors, setErrors] = useState({});

  // Calculate monthly installment (simple calculation for demo)
  const calculateMonthlyInstallment = (amount, tenor) => {
    if (!amount || !tenor) return 0;
    const interestRate = 0.05; // 5% annual interest rate
    const monthlyRate = interestRate / 12;
    const installment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenor)) /
      (Math.pow(1 + monthlyRate, tenor) - 1);
    return Math.round(installment);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.requested_loan_amount) {
      newErrors.requested_loan_amount = { message: "Số tiền vay là bắt buộc" };
    } else if (!validateAmount(parseFloat(formData.requested_loan_amount))) {
      newErrors.requested_loan_amount = {
        message: "Số tiền vay không hợp lệ (1-100 triệu VND)",
      };
    }

    if (!formData.loan_tenor) {
      newErrors.loan_tenor = { message: "Thời hạn vay là bắt buộc" };
    } else if (!validateTenor(parseInt(formData.loan_tenor))) {
      newErrors.loan_tenor = { message: "Thời hạn vay phải từ 3-60 tháng" };
    }

    if (!formData.loan_purpose) {
      newErrors.loan_purpose = { message: "Mục đích vay là bắt buộc" };
    }

    // Validate custom purpose if "Khác" is selected
    if (formData.loan_purpose === "6" && !formData.custom_purpose.trim()) {
      newErrors.custom_purpose = { message: "Vui lòng mô tả mục đích vay" };
    }

    if (!formData.guarantor.trim()) {
      newErrors.guarantor = { message: "Người bảo lãnh là bắt buộc" };
    }

    if (!formData.family_income) {
      newErrors.family_income = { message: "Thu nhập gia đình là bắt buộc" };
    } else if (!validateFamilyIncome(parseFloat(formData.family_income))) {
      newErrors.family_income = {
        message: "Thu nhập gia đình không hợp lệ",
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };

    // Clear custom purpose if loan purpose is not "Khác"
    if (field === "loan_purpose" && value !== "6") {
      newFormData.custom_purpose = "";
    }

    // Auto-calculate monthly installment when amount or tenor changes
    if (field === "requested_loan_amount" || field === "loan_tenor") {
      const amount = parseFloat(newFormData.requested_loan_amount) || 0;
      const tenor = parseInt(newFormData.loan_tenor) || 0;
      newFormData.monthly_installment = calculateMonthlyInstallment(
        amount,
        tenor,
      );
    }

    setFormData(newFormData);

    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirmModal(false);

    try {
      const submitData = {
        ...formData,
        requested_loan_amount: parseFloat(formData.requested_loan_amount),
        loan_tenor: parseInt(formData.loan_tenor),
        loan_purpose: parseInt(formData.loan_purpose),
        family_income: parseFloat(formData.family_income),
      };

      console.log("Loan request data:", submitData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);

      // Reset form after successful submission
      setFormData({
        student_id: "SV001",
        requested_loan_amount: "",
        loan_tenor: "",
        loan_purpose: "",
        custom_purpose: "",
        guarantor: "",
        family_income: "",
        monthly_installment: 0,
      });
    } catch (error) {
      console.error("Error submitting loan request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      student_id: "SV001",
      requested_loan_amount: "",
      loan_tenor: "",
      loan_purpose: "",
      custom_purpose: "",
      guarantor: "",
      family_income: "",
      monthly_installment: 0,
    });
    setErrors({});
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

  const getPurposeDisplayText = () => {
    if (formData.loan_purpose === "6" && formData.custom_purpose) {
      return formData.custom_purpose;
    }
    return selectedPurpose?.name || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Xác nhận tạo khoản vay
              </h3>

              <div className="mb-6 space-y-2 rounded-lg bg-gray-50 p-4 text-left dark:bg-gray-700">
                <p className="text-sm">
                  <strong>Số tiền vay:</strong>{" "}
                  {formatCurrency(formData.requested_loan_amount)}
                </p>
                <p className="text-sm">
                  <strong>Thời hạn:</strong> {formData.loan_tenor} tháng
                </p>
                <p className="text-sm">
                  <strong>Mục đích:</strong> {getPurposeDisplayText()}
                </p>
                <p className="text-sm">
                  <strong>Người bảo lãnh:</strong> {formData.guarantor}
                </p>
                <p className="text-sm">
                  <strong>Thu nhập gia đình:</strong>{" "}
                  {formatCurrency(formData.family_income)}
                </p>
                <p className="text-sm">
                  <strong>Trả hàng tháng:</strong>{" "}
                  {formatCurrency(formData.monthly_installment)}
                </p>
              </div>

              <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                Bạn có chắc chắn muốn gửi yêu cầu vay này không?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmSubmit}
                  className="cursor-pointer min-w-[100px] rounded-full bg-green-500 px-8 py-3 font-medium text-white transition-colors hover:bg-green-600"
                >
                  Xác nhận
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="cursor-pointer min-w-[100px] rounded-full bg-gray-500 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-600"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent">
            Tạo Khoản Vay Mới
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Điền thông tin để tạo yêu cầu vay học tập
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="animate-fade-in mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <div className="flex items-center">
              <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
              <span className="font-medium text-green-800 dark:text-green-200">
                Tạo khoản vay thành công! Yêu cầu của bạn đang được xử lý.
              </span>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="flex items-center text-lg font-semibold text-white">
                <DollarSign className="mr-2 h-5 w-5" />
                Thông tin khoản vay
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
                  error={errors.requested_loan_amount}
                  required
                  description="Nhập số tiền bạn muốn vay (VND)"
                >
                  <input
                    type="number"
                    value={formData.requested_loan_amount}
                    onChange={(e) =>
                      handleInputChange("requested_loan_amount", e.target.value)
                    }
                    placeholder="Ví dụ: 10000000"
                    min="1"
                    max="100000000"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {formData.requested_loan_amount && (
                    <p className="mt-1 text-sm text-green-600">
                      {formatCurrency(formData.requested_loan_amount)}
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
                    onChange={(e) =>
                      handleInputChange("loan_tenor", e.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Chọn thời hạn</option>
                    <option value="3">3 tháng</option>
                    <option value="6">6 tháng</option>
                    <option value="12">12 tháng</option>
                    <option value="18">18 tháng</option>
                    <option value="24">24 tháng</option>
                    <option value="36">36 tháng</option>
                    <option value="48">48 tháng</option>
                    <option value="60">60 tháng</option>
                  </select>
                </FormField>

                <FormField
                  label="Người bảo lãnh"
                  icon={User}
                  error={errors.guarantor}
                  required
                  description="Họ tên người bảo lãnh cho khoản vay"
                >
                  <input
                    type="text"
                    value={formData.guarantor}
                    onChange={(e) =>
                      handleInputChange("guarantor", e.target.value)
                    }
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Thu nhập gia đình"
                  icon={Home}
                  error={errors.family_income}
                  required
                  description="Thu nhập hàng tháng của gia đình (VND)"
                >
                  <input
                    type="number"
                    value={formData.family_income}
                    onChange={(e) =>
                      handleInputChange("family_income", e.target.value)
                    }
                    placeholder="Ví dụ: 15000000"
                    min="1"
                    max="1000000000"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  {formData.family_income && (
                    <p className="mt-1 text-sm text-green-600">
                      {formatCurrency(formData.family_income)}
                    </p>
                  )}
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

                  {/* Custom Purpose Input - Shows when "Khác" is selected */}
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
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none"
                        />
                      </FormField>
                    </div>
                  )}
                </div>
              </div>

              {/* Calculation Results */}
              {/* {formData.requested_loan_amount && formData.loan_tenor && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/30">
                  <h3 className="mb-4 flex items-center text-lg font-semibold text-green-800 dark:text-green-200">
                    <Calculator className="mr-2 h-5 w-5" />
                    Thông tin trả nợ
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Số tiền vay
                          </p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(formData.requested_loan_amount)}
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
                            Trả hàng tháng
                          </p>
                          <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            {formatCurrency(formData.monthly_installment)}
                          </p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-orange-500" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Lưu ý:</strong> Lãi suất 5%/năm. Số tiền trả hàng
                      tháng chỉ mang tính chất ước tính.
                    </p>
                  </div>
                </div>
              )} */}
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-6 py-4 dark:bg-gray-700/50">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="cursor-pointer rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  <X className="mr-2 inline h-4 w-4" />
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="cursor-pointer relative rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Đang gửi...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Tạo khoản vay
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoans;