import {
  CheckCircle,
  Send,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Loader2,
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
import Step1 from "@/components/user/newloan/Step1";
import Step2 from "@/components/user/newloan/Step2";
import Step3 from "@/components/user/newloan/Step3";
import Step4 from "@/components/user/newloan/Step4";
import Step5 from "@/components/user/newloan/Step5";
import StepIndicator from "@/components/user/newloan/StepIndicator";
import { useCreateLoan } from "@/hooks/useLoan";
import { Loan } from "@/types";
// Define types for form validation errors
interface FormErrors {
  [key: string]: { message: string } | null;
}

const validateAmount = (amount: number) => {
  return amount > 0 && amount <= 100000000;
};

const NewLoans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [verificationSuccess] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const { student, isLoading: studentLoading } = useStudent(user?.citizen_id);
  const { academicData: academic, isLoading: academicLoading } = useAcademic(
    student?.student_id || "SV001",
  );
  const { createLoan, createLoanPending } = useCreateLoan();

  const [formData, setFormData] = useState<Partial<Loan>>({
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
  const [errors, setErrors] = useState<FormErrors>({});

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

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.loan_amount_requested) {
      newErrors.loan_amount_requested = { message: "Số tiền vay là bắt buộc" };
    } else if (!validateAmount(formData.loan_amount_requested)) {
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

    if (formData.loan_purpose === "6" && !formData.custom_purpose?.trim()) {
      newErrors.custom_purpose = { message: "Vui lòng mô tả mục đích vay" };
    }

    if (!formData.guarantor?.trim()) {
      newErrors.guarantor = { message: "Người bảo lãnh là bắt buộc" };
    }

    if (!formData.family_income) {
      newErrors.family_income = { message: "Thu nhập gia đình là bắt buộc" };
    }

    if (!formData.payment_method) {
      newErrors.payment_method = { message: "Phương thức trả lãi là bắt buộc" };
    }

    const selectedMethod = paymentMethods.find(
      (pm) => pm.id === Number(formData.payment_method),
    );
    if (selectedMethod?.hasFrequency && !formData.payment_frequency) {
      newErrors.payment_frequency = {
        message: "Tần suất trả tiền là bắt buộc",
      };
    }

    if (formData.payment_method && formData.payment_frequency) {
      const tenor = formData.loan_tenor;
      const frequency = formData.payment_frequency;

      if (tenor && frequency && tenor < frequency) {
        newErrors.payment_frequency = {
          message: `Thời hạn vay phải lớn hơn hoặc bằng tần suất trả tiền (${frequency} tháng)`,
        };
      }

      if (tenor && frequency && frequency === 6 && tenor < 12) {
        newErrors.payment_frequency = {
          message:
            "Tần suất trả 6 tháng yêu cầu thời hạn vay tối thiểu 12 tháng",
        };
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    const newFormData: Partial<Loan> = {
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
        newFormData.payment_frequency = undefined;
      }
    }

    if (
      field === "loan_amount_requested" ||
      field === "loan_tenor" ||
      field === "payment_method" ||
      field === "payment_frequency"
    ) {
      const amount = newFormData.loan_amount_requested || 0;
      const tenor = newFormData.loan_tenor || 0;
      const paymentMethod = newFormData.payment_method;
      const frequency = newFormData.payment_frequency;

      const calculations = calculatePaymentDetails(
        amount,
        tenor,
        paymentMethods.findIndex((pm) => pm.name === paymentMethod)+1,
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
  const handleLoanCreation = async () => {
    setIsProcessing(true);

    try {
      createLoan(formData, {
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
        onError: () => {
          setSubmitSuccess(false);
          setIsProcessing(false);
        },
      });
    } catch (error) {
      setSubmitSuccess(false);
      setIsProcessing(false);
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
        <StepIndicator currentStep={currentStep} />

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
            <Step4
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
            <Step5 formData={formData} studentInfo={studentInfo} />
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
                      disabled={createLoanPending || isProcessing}
                      className="relative cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {createLoanPending || isProcessing ? (
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
