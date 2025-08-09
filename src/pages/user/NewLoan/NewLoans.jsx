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
  const [currentStep, setCurrentStep] = useState(1);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(true);
  const [verificationId, setVerificationId] = useState(null);
  const { user } = useAuth();
  const { student, isLoading: studentLoading } = useStudent();
  const { academicData: academic, isLoading: academicLoading } = useAcademic();
  const { createLoanContract } = useLoan();

  const [formData, setFormData] = useState({
    ...defaultFormData,
    student_id: student?.student_id || "SV001",
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
      setFormData(prev => ({
        ...prev,
        student_id: student.student_id,
      }));
      
      setStudentInfo(prev => ({
        ...prev,
        studentId: student.student_id,
        major: student.major_name || prev.major,
      }));
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
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.loan_amount_requested) {
      newErrors.loan_amount_requested = { message: "Số tiền vay là bắt buộc" };
    } else if (!validateAmount(parseFloat(formData.loan_amount_requested))) {
      newErrors.loan_amount_requested = {
        message: "Số tiền vay không hợp lệ (1-100 triệu VND)",
      };
    }

    if (!formData.loan_tenor) {
      newErrors.loan_tenor = { message: "Thời hạn vay là bắt buộc" };
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
      field === "loan_amount_requested" ||
      field === "loan_tenor" ||
      field === "payment_method" ||
      field === "payment_frequency"
    ) {
      const amount = parseFloat(newFormData.loan_amount_requested) || 0;
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
    if (!validateForm()) return;
    if (currentStep !== 3) {
      setCurrentStep(3);
      return;
    }

    try {
      createLoanContract.mutate(formData, {
        onSuccess: (data) => {
          setStudentInfo({
            ...studentInfo,
            studentId: data.student_id,
          });
          setSubmitSuccess(true);
        },
        onError: (error) => {
          console.error("Error creating loan contract:", error);
          setSubmitSuccess(false);
        },
      });
    } catch (error) {
      console.error("Error submitting loan request:", error);
    }
  };

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
                    disabled={createLoanContract.isPending}
                    className="relative cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {createLoanContract.isPending ? (
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
        </div>
      </div>
    </div>
  );
};

export default NewLoans;
