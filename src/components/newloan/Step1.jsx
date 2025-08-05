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
  Phone,
  MapPin,
  Briefcase,
  Users,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

// Constants
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

const paymentMethods = [
  {
    id: 1,
    name: "Trả cả gốc và lãi vào ngày đáo hạn",
    description: "Trả toàn bộ số tiền vay và lãi khi hết hạn",
    interestRate: 0.08,
    shortName: "Trả cuối kỳ",
    hasFrequency: false,
  },
  {
    id: 2,
    name: "Trả lãi định kỳ, gốc cuối kỳ",
    description: "Trả lãi định kỳ theo tần suất đã chọn, trả gốc khi hết hạn",
    interestRate: 0.06,
    shortName: "Trả lãi định kỳ",
    hasFrequency: true,
  },
  {
    id: 3,
    name: "Trả đều gốc và lãi định kỳ",
    description: "Trả một phần gốc và lãi theo tần suất đã chọn",
    interestRate: 0.05,
    shortName: "Trả đều định kỳ",
    hasFrequency: true,
  },
];

const paymentFrequencies = [
  { id: 1, name: "1 tháng", months: 1, description: "Trả hàng tháng" },
  { id: 3, name: "3 tháng", months: 3, description: "Trả mỗi quý" },
  { id: 6, name: "6 tháng", months: 6, description: "Trả mỗi 6 tháng" },
];

const guarantorRelationships = [
  { value: "father", label: "Bố" },
  { value: "mother", label: "Mẹ" },
  { value: "brother", label: "Anh trai" },
  { value: "sister", label: "Chị gái" },
  { value: "uncle", label: "Chú" },
  { value: "aunt", label: "Cô/Dì" },
  { value: "grandfather", label: "Ông" },
  { value: "grandmother", label: "Bà" },
  { value: "relative", label: "Người thân khác" },
  { value: "other", label: "Người khác" },
];

const occupations = [
  { value: "employee", label: "Nhân viên văn phòng" },
  { value: "teacher", label: "Giáo viên" },
  { value: "doctor", label: "Bác sĩ" },
  { value: "engineer", label: "Kỹ sư" },
  { value: "business", label: "Kinh doanh" },
  { value: "farmer", label: "Nông dân" },
  { value: "worker", label: "Công nhân" },
  { value: "civil_servant", label: "Công chức" },
  { value: "retired", label: "Đã nghỉ hưu" },
  { value: "other", label: "Nghề khác" },
];

// Validation functions
const validateAmount = (amount) => {
  return amount >= 1000000 && amount <= 100000000;
};

const validateTenor = (tenor) => {
  return tenor >= 3 && tenor <= 60;
};

const validateFamilyIncome = (income) => {
  return income >= 1000000 && income <= 1000000000;
};

const validatePhone = (phone) => {
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return phoneRegex.test(phone);
};

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

// Main Component
const ImprovedLoanForm = () => {
  const [currentSection, setCurrentSection] = useState(1); // 1: Loan Info, 2: Guarantor Info
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data
  const [formData, setFormData] = useState({
    // Loan Information
    student_id: "SV001",
    requested_loan_amount: "",
    loan_tenor: "",
    loan_purpose: "",
    custom_purpose: "",
    family_income: "",
    payment_method: "",
    payment_frequency: "",
    monthly_installment: 0,
    total_interest: 0,
    total_payment: 0,

    // Guarantor Information
    guarantor_name: "",
    guarantor_relationship: "",
    guarantor_phone: "",
    guarantor_address: "",
    guarantor_occupation: "",
    guarantor_custom_occupation: "",
    guarantor_income: "",
    guarantor_workplace: "",
  });

  const calculatePaymentDetails = (
    amount,
    tenor,
    paymentMethodId,
    frequency,
  ) => {
    if (!amount || !tenor || !paymentMethodId)
      return { monthly: 0, totalInterest: 0, totalPayment: 0 };

    const method = paymentMethods.find(
      (pm) => pm.id === parseInt(paymentMethodId),
    );
    if (!method) return { monthly: 0, totalInterest: 0, totalPayment: 0 };

    const principal = parseFloat(amount);
    const months = parseInt(tenor);
    const annualRate = method.interestRate;
    const frequencyMonths = frequency
      ? parseInt(frequency)
      : method.id === 2
        ? 3
        : 1;

    let periodicPayment = 0;
    let totalInterest = 0;
    let totalPayment = 0;

    switch (parseInt(paymentMethodId)) {
      case 1:
        totalInterest = principal * annualRate * (months / 12);
        totalPayment = principal + totalInterest;
        periodicPayment = 0;
        break;

      case 2:
        if (!frequency) {
          return { monthly: 0, totalInterest: 0, totalPayment: 0 };
        }
        const periodicRate = annualRate / (12 / frequencyMonths);
        const numberOfPayments = Math.floor(months / frequencyMonths);
        const periodicInterest = principal * periodicRate;
        totalInterest = periodicInterest * numberOfPayments;
        totalPayment = principal + totalInterest;
        periodicPayment = periodicInterest;
        break;

      case 3:
        if (!frequency) {
          return { monthly: 0, totalInterest: 0, totalPayment: 0 };
        }
        const effectiveRate = annualRate / (12 / frequencyMonths);
        const totalPeriods = Math.floor(months / frequencyMonths);

        if (effectiveRate === 0) {
          periodicPayment = principal / totalPeriods;
        } else {
          periodicPayment =
            (principal *
              effectiveRate *
              Math.pow(1 + effectiveRate, totalPeriods)) /
            (Math.pow(1 + effectiveRate, totalPeriods) - 1);
        }
        totalPayment = periodicPayment * totalPeriods;
        totalInterest = totalPayment - principal;
        break;
    }

    return {
      monthly: Math.round(periodicPayment),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  };

  const validateSection1 = () => {
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

    if (formData.loan_purpose === "6" && !formData.custom_purpose.trim()) {
      newErrors.custom_purpose = { message: "Vui lòng mô tả mục đích vay" };
    }

    if (!formData.family_income) {
      newErrors.family_income = { message: "Thu nhập gia đình là bắt buộc" };
    } else if (!validateFamilyIncome(parseFloat(formData.family_income))) {
      newErrors.family_income = { message: "Thu nhập gia đình không hợp lệ" };
    }

    if (!formData.payment_method) {
      newErrors.payment_method = { message: "Phương thức trả lãi là bắt buộc" };
    }

    const selectedMethod = paymentMethods.find(
      (pm) => pm.id === parseInt(formData.payment_method),
    );
    if (selectedMethod?.hasFrequency && !formData.payment_frequency) {
      newErrors.payment_frequency = {
        message: "Tần suất trả tiền là bắt buộc",
      };
    }

    if (formData.payment_method && formData.payment_frequency) {
      const tenor = parseInt(formData.loan_tenor);
      const frequency = parseInt(formData.payment_frequency);

      if (tenor < frequency) {
        newErrors.payment_frequency = {
          message: `Thời hạn vay phải lớn hơn hoặc bằng tần suất trả tiền (${frequency} tháng)`,
        };
      }

      if (frequency === 6 && tenor < 12) {
        newErrors.payment_frequency = {
          message:
            "Tần suất trả 6 tháng yêu cầu thời hạn vay tối thiểu 12 tháng",
        };
      }
    }

    return newErrors;
  };

  const validateSection2 = () => {
    const newErrors = {};

    if (!formData.guarantor_name.trim()) {
      newErrors.guarantor_name = {
        message: "Họ tên người bảo lãnh là bắt buộc",
      };
    }

    if (!formData.guarantor_relationship) {
      newErrors.guarantor_relationship = {
        message: "Quan hệ với sinh viên là bắt buộc",
      };
    }

    if (!formData.guarantor_phone.trim()) {
      newErrors.guarantor_phone = { message: "Số điện thoại là bắt buộc" };
    } else if (!validatePhone(formData.guarantor_phone)) {
      newErrors.guarantor_phone = { message: "Số điện thoại không hợp lệ" };
    }

    if (!formData.guarantor_address.trim()) {
      newErrors.guarantor_address = { message: "Địa chỉ liên hệ là bắt buộc" };
    }

    if (!formData.guarantor_occupation) {
      newErrors.guarantor_occupation = { message: "Nghề nghiệp là bắt buộc" };
    }

    if (
      formData.guarantor_occupation === "other" &&
      !formData.guarantor_custom_occupation.trim()
    ) {
      newErrors.guarantor_custom_occupation = {
        message: "Vui lòng mô tả nghề nghiệp",
      };
    }

    if (!formData.guarantor_income) {
      newErrors.guarantor_income = {
        message: "Thu nhập hàng tháng là bắt buộc",
      };
    } else if (!validateFamilyIncome(parseFloat(formData.guarantor_income))) {
      newErrors.guarantor_income = { message: "Thu nhập không hợp lệ" };
    }

    return newErrors;
  };

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };

    if (field === "loan_purpose" && value !== "6") {
      newFormData.custom_purpose = "";
    }

    if (field === "guarantor_occupation" && value !== "other") {
      newFormData.guarantor_custom_occupation = "";
    }

    if (field === "payment_method") {
      const selectedMethod = paymentMethods.find(
        (pm) => pm.id === parseInt(value),
      );
      if (!selectedMethod?.hasFrequency) {
        newFormData.payment_frequency = "";
      }
    }

    if (
      field === "requested_loan_amount" ||
      field === "loan_tenor" ||
      field === "payment_method" ||
      field === "payment_frequency"
    ) {
      const amount = parseFloat(newFormData.requested_loan_amount) || 0;
      const tenor = parseInt(newFormData.loan_tenor) || 0;
      const paymentMethod = newFormData.payment_method;
      const frequency = newFormData.payment_frequency;

      const calculations = calculatePaymentDetails(
        amount,
        tenor,
        paymentMethod,
        frequency,
      );
      newFormData.monthly_installment = calculations.monthly;
      newFormData.total_interest = calculations.totalInterest;
      newFormData.total_payment = calculations.totalPayment;
    }

    setFormData(newFormData);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleNextSection = () => {
    const sectionErrors = validateSection1();
    setErrors(sectionErrors);

    if (Object.keys(sectionErrors).length === 0) {
      setCurrentSection(2);
    }
  };

  const handlePrevSection = () => {
    setCurrentSection(1);
  };

  const handleSubmit = async () => {
    const section2Errors = validateSection2();
    setErrors(section2Errors);

    if (Object.keys(section2Errors).length === 0) {
      setIsSubmitting(true);

      try {
        const submitData = {
          ...formData,
          requested_loan_amount: parseFloat(formData.requested_loan_amount),
          loan_tenor: parseInt(formData.loan_tenor),
          loan_purpose: parseInt(formData.loan_purpose),
          family_income: parseFloat(formData.family_income),
          payment_method: parseInt(formData.payment_method),
          guarantor_income: parseFloat(formData.guarantor_income),
        };

        console.log("Loan request data:", submitData);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setCurrentSection(1);
          setFormData({
            student_id: "SV001",
            requested_loan_amount: "",
            loan_tenor: "",
            loan_purpose: "",
            custom_purpose: "",
            family_income: "",
            payment_method: "",
            payment_frequency: "",
            monthly_installment: 0,
            total_interest: 0,
            total_payment: 0,
            guarantor_name: "",
            guarantor_relationship: "",
            guarantor_phone: "",
            guarantor_address: "",
            guarantor_occupation: "",
            guarantor_custom_occupation: "",
            guarantor_income: "",
            guarantor_workplace: "",
          });
        }, 3000);
      } catch (error) {
        console.error("Error submitting loan request:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (submitSuccess) {
    return (
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-white" />
          <h2 className="text-2xl font-bold text-white">Đăng ký thành công!</h2>
          <p className="mt-2 text-green-100">
            Yêu cầu vay của bạn đã được gửi và đang được xử lý.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <h2 className="flex items-center text-lg font-semibold text-white">
          {currentSection === 1 ? (
            <>
              <DollarSign className="mr-2 h-5 w-5" />
              Phần 1: Thông tin khoản vay
            </>
          ) : (
            <>
              <Users className="mr-2 h-5 w-5" />
              Phần 2: Thông tin người bảo lãnh
            </>
          )}
        </h2>

        {/* Progress indicator */}
        <div className="mt-3 flex items-center space-x-2">
          <div
            className={`h-2 w-1/2 rounded-full ${currentSection >= 1 ? "bg-white" : "bg-green-300"}`}
          />
          <div
            className={`h-2 w-1/2 rounded-full ${currentSection >= 2 ? "bg-white" : "bg-green-300"}`}
          />
        </div>
      </div>

      {/* Section 1: Loan Information */}
      {currentSection === 1 && (
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
                              {(method.interestRate * 100).toFixed(1)}%/năm
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
          {formData.requested_loan_amount &&
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

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              onClick={handleNextSection}
              className="flex items-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
            >
              Tiếp theo
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Section 2: Guarantor Information */}
      {currentSection === 1 && (
        <div className="space-y-8 p-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/30">
            <div className="flex items-start">
              <AlertCircle className="mt-0.5 mr-2 h-5 w-5 text-blue-600" />
              <div>
                <span className="font-medium text-blue-800 dark:text-blue-200">
                  Thông tin người bảo lãnh
                </span>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  Thông tin này được sử dụng để đánh giá khả năng chi trả thay
                  thế khi sinh viên không trả được nợ.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FormField
              label="Họ tên người bảo lãnh"
              icon={User}
              error={errors.guarantor_name}
              required
              description="Họ và tên đầy đủ của người bảo lãnh"
            >
              <input
                type="text"
                value={formData.guarantor_name}
                onChange={(e) =>
                  handleInputChange("guarantor_name", e.target.value)
                }
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </FormField>

            <FormField
              label="Quan hệ với sinh viên"
              icon={Users}
              error={errors.guarantor_relationship}
              required
              description="Mối quan hệ giữa người bảo lãnh và sinh viên"
            >
              <select
                value={formData.guarantor_relationship}
                onChange={(e) =>
                  handleInputChange("guarantor_relationship", e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Chọn mối quan hệ</option>
                {guarantorRelationships.map((relationship) => (
                  <option key={relationship.value} value={relationship.value}>
                    {relationship.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Số điện thoại"
              icon={Phone}
              error={errors.guarantor_phone}
              required
              description="Số điện thoại liên hệ của người bảo lãnh"
            >
              <input
                type="tel"
                value={formData.guarantor_phone}
                onChange={(e) =>
                  handleInputChange("guarantor_phone", e.target.value)
                }
                placeholder="Ví dụ: 0912345678"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </FormField>

            <FormField
              label="Nghề nghiệp"
              icon={Briefcase}
              error={errors.guarantor_occupation}
              required
              description="Nghề nghiệp hiện tại của người bảo lãnh"
            >
              <select
                value={formData.guarantor_occupation}
                onChange={(e) =>
                  handleInputChange("guarantor_occupation", e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Chọn nghề nghiệp</option>
                {occupations.map((occupation) => (
                  <option key={occupation.value} value={occupation.value}>
                    {occupation.label}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Custom occupation input */}
            {formData.guarantor_occupation === "other" && (
              <div className="lg:col-span-2">
                <FormField
                  label="Mô tả nghề nghiệp cụ thể"
                  icon={FileText}
                  error={errors.guarantor_custom_occupation}
                  required
                  description="Vui lòng mô tả chi tiết nghề nghiệp"
                >
                  <input
                    type="text"
                    value={formData.guarantor_custom_occupation}
                    onChange={(e) =>
                      handleInputChange(
                        "guarantor_custom_occupation",
                        e.target.value,
                      )
                    }
                    placeholder="Mô tả nghề nghiệp cụ thể..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>
              </div>
            )}

            <FormField
              label="Thu nhập hàng tháng"
              icon={DollarSign}
              error={errors.guarantor_income}
              required
              description="Thu nhập ổn định hàng tháng của người bảo lãnh (VND)"
            >
              <input
                type="number"
                value={formData.guarantor_income}
                onChange={(e) =>
                  handleInputChange("guarantor_income", e.target.value)
                }
                placeholder="Ví dụ: 20000000"
                min="1"
                max="1000000000"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              {formData.guarantor_income && (
                <p className="mt-1 text-sm text-green-600">
                  {formatCurrency(formData.guarantor_income)}
                </p>
              )}
            </FormField>

            <FormField
              label="Nơi làm việc"
              icon={Home}
              error={errors.guarantor_workplace}
              description="Tên công ty/cơ quan nơi người bảo lãnh làm việc (không bắt buộc)"
            >
              <input
                type="text"
                value={formData.guarantor_workplace}
                onChange={(e) =>
                  handleInputChange("guarantor_workplace", e.target.value)
                }
                placeholder="Ví dụ: Công ty ABC, Trường XYZ..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </FormField>

            <div className="lg:col-span-2">
              <FormField
                label="Địa chỉ liên hệ"
                icon={MapPin}
                error={errors.guarantor_address}
                required
                description="Địa chỉ thường trú hoặc địa chỉ liên hệ của người bảo lãnh"
              >
                <textarea
                  value={formData.guarantor_address}
                  onChange={(e) =>
                    handleInputChange("guarantor_address", e.target.value)
                  }
                  placeholder="Ví dụ: 123 Đường ABC, Phường XYZ, Quận DEF, TP.HCM"
                  rows="3"
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </FormField>
            </div>
          </div>

          {/* Financial Assessment */}
          {formData.guarantor_income && formData.requested_loan_amount && (
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-800 dark:bg-orange-900/30">
              <h3 className="mb-4 flex items-center text-lg font-semibold text-orange-800 dark:text-orange-200">
                <Calculator className="mr-2 h-5 w-5" />
                Đánh giá khả năng bảo lãnh
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Thu nhập người bảo lãnh
                      </p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(formData.guarantor_income)}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Số tiền vay
                      </p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(formData.requested_loan_amount)}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-blue-500" />
                  </div>
                </div>

                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Tỷ lệ vay/thu nhập
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          parseFloat(formData.requested_loan_amount) /
                            parseFloat(formData.guarantor_income) <=
                          10
                            ? "text-green-600 dark:text-green-400"
                            : parseFloat(formData.requested_loan_amount) /
                                  parseFloat(formData.guarantor_income) <=
                                20
                              ? "text-orange-600 dark:text-orange-400"
                              : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {(
                          parseFloat(formData.requested_loan_amount) /
                          parseFloat(formData.guarantor_income)
                        ).toFixed(1)}{" "}
                        tháng
                      </p>
                    </div>
                    <TrendingUp
                      className={`h-8 w-8 ${
                        parseFloat(formData.requested_loan_amount) /
                          parseFloat(formData.guarantor_income) <=
                        10
                          ? "text-green-500"
                          : parseFloat(formData.requested_loan_amount) /
                                parseFloat(formData.guarantor_income) <=
                              20
                            ? "text-orange-500"
                            : "text-red-500"
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {parseFloat(formData.requested_loan_amount) /
                  parseFloat(formData.guarantor_income) <=
                  10 && (
                  <div className="flex items-center text-sm text-green-700 dark:text-green-300">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Khả năng bảo lãnh tốt - Thu nhập đủ để đảm bảo khoản vay
                  </div>
                )}
                {parseFloat(formData.requested_loan_amount) /
                  parseFloat(formData.guarantor_income) >
                  10 &&
                  parseFloat(formData.requested_loan_amount) /
                    parseFloat(formData.guarantor_income) <=
                    20 && (
                    <div className="flex items-center text-sm text-orange-700 dark:text-orange-300">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Khả năng bảo lãnh trung bình - Cần xem xét thêm các yếu tố
                      khác
                    </div>
                  )}
                {parseFloat(formData.requested_loan_amount) /
                  parseFloat(formData.guarantor_income) >
                  20 && (
                  <div className="flex items-center text-sm text-red-700 dark:text-red-300">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Khả năng bảo lãnh thấp - Thu nhập có thể không đủ để đảm bảo
                    khoản vay
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevSection}
              className="flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Quay lại
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Đang gửi...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Gửi yêu cầu vay
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovedLoanForm;
