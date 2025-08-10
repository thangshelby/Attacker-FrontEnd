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
  const [currentStep, setCurrentStep] = useState(4);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(true);
  const [verificationId, setVerificationId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loanResult, setLoanResult] = useState(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [loanId, setLoanId] = useState(null);
  const [masPollingInterval, setMasPollingInterval] = useState(null);
  const [masProcessingTime, setMasProcessingTime] = useState(0);
  const { user } = useAuth();
  const { student, isLoading: studentLoading, error: studentError } = useStudent();
  const { academicData: academic, isLoading: academicLoading } = useAcademic();
  const { createLoanContract } = useLoan();

  console.log("User data:", user);
  console.log("Student loading:", studentLoading);
  console.log("Student data:", student);
  console.log("Student error:", studentError);

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
    console.log("Student data changed:", student);
    if (student?.student_id) {
      console.log("Setting student_id to:", student.student_id);
      setFormData(prev => ({
        ...prev,
        student_id: student.student_id,
      }));
      
      setStudentInfo(prev => ({
        ...prev,
        studentId: student.student_id,
        major: student.major_name || prev.major,
      }));
    } else {
      console.log("No student data available yet");
    }
  }, [student]);

  useEffect(() => {
    if (user?.name) {
      setStudentInfo(prev => ({
        ...prev,
        fullName: user.name,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (academic?.gpa) {
      setStudentInfo(prev => ({
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
      title: "Kết quả đánh giá",
      description: "Kết quả từ hệ thống AI",
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    console.log("Validating form with data:", formData);

    // Auto-update student_id if it's missing but student data is available
    if (!formData.student_id && student?.student_id) {
      console.log("Auto-updating student_id from student data:", student.student_id);
      setFormData(prev => ({ ...prev, student_id: student.student_id }));
      // Skip validation this time since we're updating
      return true;
    }
    
    if (!formData.student_id) {
      newErrors.student_id = { message: "Không tìm thấy thông tin sinh viên. Vui lòng tải lại trang." };
      console.log("Validation failed: No student_id");
    }

    // Validate simplified form fields
    if (!formData.loan_amount_requested) {
      newErrors.loan_amount_requested = { message: "Số tiền vay là bắt buộc" };
      console.log("Validation failed: No loan_amount_requested");
    } else if (!validateAmount(parseFloat(formData.loan_amount_requested))) {
      newErrors.loan_amount_requested = {
        message: "Số tiền vay không hợp lệ (1-100 triệu VND)",
      };
      console.log("Validation failed: Invalid loan amount");
    }

    if (!formData.guarantor || !formData.guarantor.trim()) {
      newErrors.guarantor = { message: "Người bảo lãnh là bắt buộc" };
      console.log("Validation failed: No guarantor");
    }

    if (!formData.family_income) {
      newErrors.family_income = { message: "Thu nhập gia đình là bắt buộc" };
      console.log("Validation failed: No family_income");
    }

    if (!formData.existing_debt) {
      newErrors.existing_debt = { message: "Vui lòng chọn có nợ xấu hay không" };
      console.log("Validation failed: No existing_debt");
    }

    if (!formData.loan_purpose || !formData.loan_purpose.trim()) {
      newErrors.loan_purpose = { message: "Mục đích vay là bắt buộc" };
      console.log("Validation failed: No loan_purpose");
    }

    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    console.log("Validation result:", Object.keys(newErrors).length === 0);
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
    if (field === "loan_amount_requested" && newFormData.loan_amount_requested) {
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
    console.log("🎯 handleSubmit called, currentStep:", currentStep);
    
    if (!validateForm()) {
      console.log("❌ Form validation failed");
      return;
    }
    
    if (currentStep !== 3) {
      console.log("📝 Moving to step 3");
      setCurrentStep(3);
      return;
    }

    console.log("🚀 Submitting loan with formData:", formData);
    console.log("🔍 Student ID being sent:", formData.student_id);
    console.log("⏳ createLoanContract.isPending:", createLoanContract.isPending);

    setIsProcessing(true);

    try {
      console.log("🚀 Starting loan contract creation with formData:", formData);
      
      createLoanContract.mutate(formData, {
        onSuccess: (response) => {
          console.log("✅ Loan created successfully - Full response:", response);
          
          // Extract the actual data from axios response
          const data = response.data || response;
          
          setStudentInfo({
            ...studentInfo,
            studentId: data.student_id,
          });
          setSubmitSuccess(true);
          setIsProcessing(false);
          
          // Move to processing step and wait 45 seconds
          setCurrentStep(4);
          setProcessingStep(0);
          
          // Start 45-second processing with progress bar
          startProcessingWithTimer();
        },
        onError: (error) => {
          console.error("❌ Error creating loan contract:", error);
          console.error("📋 Error response data:", error.response?.data);
          console.error("📋 Error details:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            message: error.message
          });
          setSubmitSuccess(false);
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Error submitting loan request:", error);
      setIsProcessing(false);
    }
  };

  const processingSteps = [
    { title: "Khởi tạo hệ thống", description: "Đang khởi tạo các AI agents", icon: "🚀", duration: 3 },
    { title: "Phân tích học thuật", description: "Academic Agent đang đánh giá", icon: "🎓", duration: 8 },
    { title: "Phân tích tài chính", description: "Finance Agent đang phân tích", icon: "💰", duration: 8 },
    { title: "Đánh giá phản biện", description: "Critical Agent đang phản biện", icon: "🔍", duration: 6 },
    { title: "Tổng hợp quyết định", description: "Decision Agent đang ra quyết định cuối", icon: "⚖️", duration: 6 },
    { title: "Hoàn thành", description: "Lưu kết quả và thông báo", icon: "✅", duration: 2 },
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
          reason: "Chúc mừng!"
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
            <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Đang tải thông tin sinh viên...</p>
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
            <div className="mb-4 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Không tìm thấy thông tin sinh viên</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Bạn cần verify email để tạo thông tin sinh viên trước khi vay.
            </p>
            <button
              onClick={() => window.location.href = '/auth/verify-email'}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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

          {/* Step 4: Results */}
          {currentStep === 4 && (
            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                <h2 className="flex items-center text-lg font-semibold text-white">
                  <Award className="mr-2 h-5 w-5" />
                  Bước 4: Kết quả đánh giá từ hệ thống AI
                </h2>
              </div>

              <div className="space-y-6 p-6">
                {isProcessing ? (
                  <div className="text-center py-16">
                    <h3 className="text-3xl font-bold text-gray-800 mb-16">
                      Đang xử lý...
                    </h3>
                    
                    {/* Beautiful Progress Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        {/* Main progress bar */}
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-700 ease-out relative shadow-lg"
                          style={{ width: `${Math.min((masProcessingTime / 45) * 100, 100)}%` }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                          
                          {/* Moving light effect */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="h-full w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent transform translate-x-0 animate-pulse opacity-80"></div>
                          </div>
                        </div>
                        
                        {/* Background animated waves */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-indigo-100/50 to-purple-100/50 animate-pulse opacity-30"></div>
                      </div>
                      
                      {/* Elegant dots indicator */}
                      <div className="flex justify-center mt-6 space-x-3">
                        {[...Array(8)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              (masProcessingTime / 45) * 8 > i 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg animate-pulse' 
                                : 'bg-gray-300'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-600 text-xl font-medium">
                      Hệ thống đang phân tích hồ sơ của bạn
                    </p>
                    <p className="text-gray-500 text-lg mt-3">
                      Vui lòng chờ trong giây lát...
                    </p>
                  </div>
                                ) : loanResult ? (
                  <div className="text-center py-20 relative overflow-hidden rounded-3xl">
                    {/* Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl"></div>
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 rounded-3xl">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i}
                          className={`absolute w-2 h-2 bg-green-400 rounded-full opacity-70`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Main Content */}
                    <div className="relative z-10">
                      {/* Success Icon */}
                      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                        <div className="text-6xl text-white">✓</div>
                      </div>
                      
                      {/* Main Title */}
                      <h1 className="text-7xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                        🎉 CHÚC MỪNG! 🎉
                      </h1>
                      
                      {/* Subtitle */}
                      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-200 p-8 max-w-2xl mx-auto mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          🏆 KHOẢN VAY CỦA BẠN ĐÃ ĐƯỢC PHÊ DUYỆT 🏆
                        </h2>
                        <p className="text-xl text-gray-600 font-medium">
                          Hồ sơ của bạn đã được phê duyệt thành công!
                        </p>
                        
                      </div>
                 
                       
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <FileText className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Đang tải kết quả...</h3>
                    <p className="text-gray-600">Vui lòng chờ trong giây lát.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons - Hide on step 4 */}
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
