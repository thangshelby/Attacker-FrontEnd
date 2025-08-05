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
import { useState, useEffect } from "react";
import {
  loanPurposes,
  paymentMethods,
  paymentFrequencies,
} from "@/constants/constants";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";

// Validation functions
const validateAmount = (amount) => {
  return amount >= 1000000 && amount <= 100000000; // 1-100 triệu VND
};

const validateTenor = (tenor) => {
  return tenor >= 3 && tenor <= 60; // 3-60 tháng
};

const validateFamilyIncome = (income) => {
  return income >= 1000000 && income <= 1000000000; // 1 triệu - 1 tỷ VND
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
const Step1 = ({ formData, studentInfo, setFormData, setStudentInfo }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationId, setVerificationId] = useState(null);


 
  const getSelectedPaymentMethod = () => {
    return paymentMethods.find(
      (pm) => pm.id === parseInt(formData.payment_method),
    );
  };

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const newFormData = {
      ...formData,
      [field]: value,
    };

    if (field === "loan_purpose" && value !== "6") {
      newFormData.custom_purpose = "";
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
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateForm()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (verificationSuccess) {
        setCurrentStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        requested_loan_amount: parseFloat(formData.requested_loan_amount),
        loan_tenor: parseInt(formData.loan_tenor),
        loan_purpose: parseInt(formData.loan_purpose),
        family_income: parseFloat(formData.family_income),
        payment_method: parseInt(formData.payment_method),
        verification_id: verificationId,
        student_info: studentInfo,
      };

      console.log("Loan request data:", submitData);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        // Reset form
        setCurrentStep(1);
        // setQrData(null);
        setVerificationSuccess(false);
        setVerificationId(null);
        setFormData({
          student_id: "SV001",
          requested_loan_amount: "",
          loan_tenor: "",
          loan_purpose: "",
          custom_purpose: "",
          guarantor: "",
          family_income: "",
          payment_method: "",
          payment_frequency: "",
          monthly_installment: 0,
          total_interest: 0,
          total_payment: 0,
        });
      }, 3000);
    } catch (error) {
      console.error("Error submitting loan request:", error);
    } finally {
      setIsSubmitting(false);
    }
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
              onChange={(e) => handleInputChange("loan_tenor", e.target.value)}
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
              onChange={(e) => handleInputChange("guarantor", e.target.value)}
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
      </div>
    </>
  );
};

export default Step1;
