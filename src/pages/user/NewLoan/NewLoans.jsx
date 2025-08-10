import {
  CheckCircle,
  Send,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Award,
  AlertCircle,
  FileText,
} from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/apis/api";
import {
  defaultFormData,
  paymentMethods,
  calculatePaymentDetails,
} from "@/constants/newloan";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import Step1 from "@/components/newloan/Step1";
import Step2 from "@/components/newloan/Step2";
import Step3 from "@/components/newloan/Step3";
import Step3_5 from "@/components/newloan/Step3_5";
import Step4 from "@/components/newloan/Step4";
import { useLoan } from "@/hooks/useLoan";
const validateAmount = (amount) => {
  return amount > 0 && amount <= 100000000;
};

// Step indicator component
const StepIndicator = ({ currentStep, steps }) => (
  <div className="mb-8">
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 ${
              index + 1 < currentStep
                ? "border-green-500 bg-green-500 text-white"
                : index + 1 === currentStep
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-300 bg-gray-200 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            {index + 1 < currentStep ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <span className="font-semibold">{index + 1}</span>
            )}
          </div>
          <div className="ml-3 text-sm">
            <div
              className={`font-medium ${
                index + 1 <= currentStep
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {step.description}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-4 h-0.5 w-12 ${
                index + 1 < currentStep
                  ? "bg-green-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

const NewLoans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(true);
  const [verificationId, setVerificationId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loanResult, setLoanResult] = useState(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [loanId, setLoanId] = useState(null);
  const [masPollingInterval, setMasPollingInterval] = useState(null);
  const [masProcessingTime, setMasProcessingTime] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    student,
    isLoading: studentLoading,
    error: studentError,
  } = useStudent();
  const { academicData: academic, isLoading: academicLoading } = useAcademic();
  const { createLoanContract } = useLoan();

  const [formData, setFormData] = useState({
    ...defaultFormData,
    student_id: student?.student_id || "",
  });

  const [studentInfo, setStudentInfo] = useState({
    fullName: user?.name || "Nguyễn Văn An",
    studentId: student?.student_id || "SV001",
    major: student?.major_name || "Khoa học Máy tính",
    academicYear: "2021-2025",
    gpa: academic?.gpa || "3.75",
    completedCredits: "95",
    totalCredits: "144",
    academicRank: "Giỏi",
    academicStatus: "Đang học",
  });
  const [errors, setErrors] = useState({});

  // Update formData and studentInfo when data from hooks changes
  useEffect(() => {
    if (student?.student_id) {
      setFormData((prev) => ({
        ...prev,
        student_id: student.student_id,
      }));

      setStudentInfo((prev) => ({
        ...prev,
        studentId: student.student_id,
        major: student.major_name || prev.major,
      }));
    } else {
    }
  }, [student]);

  useEffect(() => {
    if (user?.name) {
      setStudentInfo((prev) => ({
        ...prev,
        fullName: user.name,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (academic?.gpa) {
      setStudentInfo((prev) => ({
        ...prev,
        gpa: academic.gpa,
      }));
    }
  }, [academic]);

  const steps = [
    {
      title: "Thu thập thông tin",
      description: "Điền thông tin khoản vay",
    },
    {
      title: "Xác minh học tập",
      description: "Xác minh kết quả học tập",
    },
    {
      title: "Xem thông tin",
      description: "Xem lại và gửi yêu cầu",
    },
    {
      title: "Xác thực OTP",
      description: "Xác nhận qua email",
    },
    {
      title: "Kết quả đánh giá",
      description: "Kết quả từ hệ thống AI",
    },
  ];
  const handleSendMail = async () => {
    // const response = await api.post(
    //   `/users/send_otp/thangnnd22414@st.uel.edu.vn`,
    // );
    // console.log(response);
  };

  const validateForm = () => {
    const newErrors = {};

    // Auto-update student_id if it's missing but student data is available
    if (!formData.student_id && student?.student_id) {
      setFormData((prev) => ({ ...prev, student_id: student.student_id }));
      // Skip validation this time since we're updating
      return true;
    }

    if (!formData.student_id) {
      newErrors.student_id = {
        message: "Không tìm thấy thông tin sinh viên. Vui lòng tải lại trang.",
      };
    }

    // Validate simplified form fields
    if (!formData.loan_amount_requested) {
      newErrors.loan_amount_requested = { message: "Số tiền vay là bắt buộc" };
    } else if (!validateAmount(parseFloat(formData.loan_amount_requested))) {
      newErrors.loan_amount_requested = {
        message: "Số tiền vay không hợp lệ (1-100 triệu VND)",
      };
    }

    if (!formData.guarantor || !formData.guarantor.trim()) {
      newErrors.guarantor = { message: "Người bảo lãnh là bắt buộc" };
    }

    if (!formData.family_income) {
      newErrors.family_income = { message: "Thu nhập gia đình là bắt buộc" };
    }

    if (!formData.existing_debt) {
      newErrors.existing_debt = {
        message: "Vui lòng chọn có nợ xấu hay không",
      };
    }

    if (!formData.loan_purpose || !formData.loan_purpose.trim()) {
      newErrors.loan_purpose = { message: "Mục đích vay là bắt buộc" };
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

    // Auto-calculate loan details when loan amount changes
    if (
      field === "loan_amount_requested" &&
      newFormData.loan_amount_requested
    ) {
      const amount = parseFloat(newFormData.loan_amount_requested) || 0;
      // Use default values for simplified form
      const tenor = 12; // 12 tháng mặc định
      const paymentMethod = 1; // Trả cả gốc và lãi vào ngày đáo hạn
      const frequency = null; // Không cần frequency cho method 1

      const calculations = calculatePaymentDetails(
        amount,
        tenor,
        paymentMethod,
        frequency,
      );
      newFormData.monthly_installment = calculations.monthly;
      newFormData.total_interest = calculations.totalInterest;
      newFormData.total_payment = calculations.totalPayment;

      // Also set the default values to formData
      newFormData.loan_tenor = tenor;
      newFormData.payment_method = paymentMethod;
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
        handleSendMail();
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
    if (!validateForm()) {
      return;
    }

    if (currentStep !== 3) {

      setCurrentStep(3);
      return;
    }

    // From Step 3, move to Step 4 (OTP) without calling API yet
    setCurrentStep(4);
  };

  // New function to handle loan creation after OTP verification
  const handleLoanCreation = async () => {
    setIsProcessing(true);

    try {
      createLoanContract.mutate(formData, {
        onSuccess: (response) => {
          // Extract the actual data from axios response
          const data = response.data || response;

          setStudentInfo({
            ...studentInfo,
            studentId: data.student_id,
          });
          setSubmitSuccess(true);
          setIsProcessing(false);
        },
        onError: (error) => {
          setSubmitSuccess(false);
          setIsProcessing(false);
        },
      });
    } catch (error) {
      setSubmitSuccess(false);
      setIsProcessing(false);
    }
  };

  const processingSteps = [
    {
      title: "Khởi tạo hệ thống",
      description: "Đang khởi tạo các AI agents",
      icon: "🚀",
      duration: 3,
    },
    {
      title: "Phân tích học thuật",
      description: "Academic Agent đang đánh giá",
      icon: "🎓",
      duration: 8,
    },
    {
      title: "Phân tích tài chính",
      description: "Finance Agent đang phân tích",
      icon: "💰",
      duration: 8,
    },
    {
      title: "Đánh giá phản biện",
      description: "Critical Agent đang phản biện",
      icon: "🔍",
      duration: 6,
    },
    {
      title: "Tổng hợp quyết định",
      description: "Decision Agent đang ra quyết định cuối",
      icon: "⚖️",
      duration: 6,
    },
    {
      title: "Hoàn thành",
      description: "Lưu kết quả và thông báo",
      icon: "✅",
      duration: 2,
    },
  ];

  const startProcessingWithTimer = () => {
    setIsProcessing(true);
    setMasProcessingTime(0);

    // Start progress timer - 45 seconds total
    const startTime = Date.now();
    const totalDuration = 45000; // 45 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const seconds = Math.floor(elapsed / 1000);
      const progress = Math.min((elapsed / totalDuration) * 100, 100);

      setMasProcessingTime(seconds);

      // Update progress bar (if you have one)
      if (progress >= 100) {
        clearInterval(timer);

        // Show success result after 45 seconds
        setLoanResult({
          decision: "approve",
          confidence: 87,
          reason: "Chúc mừng!",
        });
        setIsProcessing(false);
      }
    }, 1000);

    // Store timer reference for cleanup
    setMasPollingInterval(timer);
  };

  // No longer needed - using hardcoded result

  // Cleanup on component unmount
  React.useEffect(() => {
    return () => {
      if (masPollingInterval) {
        clearInterval(masPollingInterval);
      }
    };
  }, [masPollingInterval]);

  // Show loading state while initial data is loading
  if (studentLoading || academicLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-t-2 border-green-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Đang tải thông tin sinh viên...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If no student data is found, show error message
  if (!studentLoading && !student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-2xl text-red-500">⚠️</span>
            </div>
            <h2 className="mb-2 text-xl font-bold text-red-600">
              Không tìm thấy thông tin sinh viên
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Bạn cần verify email để tạo thông tin sinh viên trước khi vay.
            </p>
            <button
              onClick={() => (window.location.href = "/auth/verify-email")}
              className="rounded-lg bg-red-500 px-6 py-2 text-white hover:bg-red-600"
            >
              Verify Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
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
            Quy trình 3 bước với xác minh kết quả học tập
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} steps={steps} />

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

        {/* Main Content */}
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
          {/* Step 1: Information Collection */}
          {currentStep === 1 && (
            <Step1
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
            />
          )}

          {/* Step 2: Academic Verification */}
          {currentStep === 2 && <Step2 studentInfo={studentInfo} />}

          {/* Step 3: Final Review */}
          {currentStep === 3 && (
            <Step3 formData={formData} studentInfo={studentInfo} />
          )}

          {/* Step 4: OTP Verification */}
          {currentStep === 4 && (
            <Step3_5
              formData={formData}
              onNext={() => setCurrentStep(5)}
              onBack={() => {
                setCurrentStep(3);
                
              }}
              onOtpVerified={handleLoanCreation}
            />
          )}

          {/* Step 5: PDF Generation */}
          {currentStep === 5 && (
            <Step4 formData={formData} studentInfo={studentInfo} />
          )}

          {/* Navigation Buttons - Hide on step 4 (OTP) and step 5 (Success) */}
          {currentStep < 4 && (
            <div className="bg-gray-50 px-6 py-4 dark:bg-gray-700/50">
              <div className="flex justify-between">
                <div>
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevStep}
                      className="flex cursor-pointer items-center rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quay lại
                    </button>
                  )}
                </div>

                <div className="flex space-x-3">
                  {currentStep < 3 ? (
                    <button
                      onClick={handleNextStep}
                      // disabled={currentStep === 2}
                      className="flex cursor-pointer items-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {currentStep === 2 ? "Chờ xác minh" : "Tiếp tục"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={createLoanContract.isPending || isProcessing}
                      className="relative cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {createLoanContract.isPending || isProcessing ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang gửi...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Gửi yêu cầu vay
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewLoans;
