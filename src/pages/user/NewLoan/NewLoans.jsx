import {
  CheckCircle,
  Send,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNotificationStore } from "@/store/notificationStore";
import {
  loanPurposes,
  paymentMethods,
  paymentFrequencies,
} from "@/constants/constants";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import Step1 from "@/components/newloan/Step1";
import Step2 from "@/components/newloan/Step2";
import Step3 from "@/components/newloan/Step3";
// Validation functions
const validateAmount = (amount) => {
  return amount > 0 && amount <= 100000000;
};

const validateTenor = (tenor) => {
  return tenor >= 3 && tenor <= 60;
};

const validateFamilyIncome = (income) => {
  return income > 0 && income <= 1000000000;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const { user } = useAuth();
  const { student } = useStudent();
  const { academicData: academic } = useAcademic();
  const { addNotification } = useNotificationStore();

  const [formData, setFormData] = useState({
    student_id: student.student_id,
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

  const [studentInfo, setStudentInfo] = useState({
    fullName: user.name || "Nguyễn Văn An",
    studentId: student.student_id || "SV001",
    major: student.major_name || "Khoa học Máy tính",
    academicYear: "2021-2025",
    gpa: academic.gpa || "3.75",
    completedCredits: "95",
    totalCredits: "144",
    academicRank: "Giỏi",
    academicStatus: "Đang học",
  });
  const [errors, setErrors] = useState({});

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
  ];

  const handleNextStep = () => {
    if (currentStep === 1) {
      // if (validateForm()) {
      setCurrentStep(2);
      // }
    } else if (currentStep === 2) {
      // if (verificationSuccess) {
      setCurrentStep(3);
      // }
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

      await new Promise((resolve) => setTimeout(resolve, 5000));
      // handleAddNotification();

      setSubmitSuccess(true);
      handleAddNotification();
      setTimeout(() => {
        // setSubmitSuccess(false);
        // Reset form
        // setCurrentStep(1);
        // setQrData(null);
        // setVerificationSuccess(false);
        setVerificationId(null);
      }, 3000);
    } catch (error) {
      console.error("Error submitting loan request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNotification = () => {
    console.log("Adding new notification");
    const newNotification = {
      id: Date.now(), // tạo ID duy nhất
      title: "Yêu cầu khoản vay mới",
      message:
        "Yêu cầu khoản vay của bạn đã được gửi thành công. Vui lòng chờ 1-2 ngày để xử lý.",
      type: "success", // success | error | warning | info
      time: "1 phut truoc ", // hoặc dùng dayjs().fromNow()
      isRead: false,
      icon: Award, // đảm bảo import đúng
    };
    addNotification(newNotification);
  };

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
              studentInfo={studentInfo}
              setFormData={setFormData}
              setStudentInfo={setStudentInfo}
            />
          )}

          {/* Step 2: Academic Verification */}
          {currentStep === 2 && <Step2 studentInfo={studentInfo} />}

          {/* Step 3: Final Review */}
          {currentStep === 3 && (
            <Step3 formData={formData} studentInfo={studentInfo} />
          )}

          {/* Navigation Buttons */}
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
                    disabled={isSubmitting}
                    className="relative cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang gửi...
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          handleAddNotification();
                        }}
                        className="flex items-center"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Gửi yêu cầu vay
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoans;
