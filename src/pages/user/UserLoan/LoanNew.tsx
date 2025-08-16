import {
  CheckCircle,
  Send,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { defaultFormData, paymentMethods } from "@/constants/newloan";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define types for form validation errors

const newLoanSchema = z
  .object({
    loan_amount_requested: z
      .number()
      .min(1, "Số tiền vay là bắt buộc")
      .max(100000000, "Số tiền vay không hợp lệ (1-100 triệu VND)"),
    loan_tenor: z.number().min(1, "Thời hạn vay là bắt buộc"),
    loan_purpose: z.number().min(1, "Mục đích vay là bắt buộc"),
    custom_purpose: z.string().optional(),
    guarantor: z.string().min(1, "Người bảo lãnh là bắt buộc"),
    family_income: z.string().min(1, "Thu nhập gia đình là bắt buộc"),
    payment_method: z.string().min(1, "Phương thức trả lãi là bắt buộc"),
    payment_frequency: z.string().optional(),
    total_interest: z.number().optional(),
    total_payment: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.loan_purpose === 6 && !data.custom_purpose?.trim()) {
      ctx.addIssue({
        path: ["custom_purpose"],
        code: z.ZodIssueCode.custom,
        message: "Vui lòng mô tả mục đích vay",
      });
    }
    const selectedPaymentMethod = paymentMethods.find(
      (pm) => pm.id === Number(data.payment_method),
    );
    if (selectedPaymentMethod?.hasFrequency && !data.payment_frequency) {
      ctx.addIssue({
        path: ["payment_frequency"],
        code: z.ZodIssueCode.custom,
        message: "Vui lòng nhập tần suất thanh toán",
      });
    }

    if (data.payment_method && data.payment_frequency) {
      const tenor = data.loan_tenor;
      const frequency = data.payment_frequency;

      if (tenor && frequency && tenor < Number(frequency)) {
        ctx.addIssue({
          path: ["payment_frequency"],
          code: z.ZodIssueCode.custom,
          message: `Thời hạn vay phải lớn hơn hoặc bằng tần suất trả tiền (${frequency} tháng)`,
        });
      }

      if (tenor && frequency && frequency === "6" && tenor < 12) {
        ctx.addIssue({
          path: ["payment_frequency"],
          code: z.ZodIssueCode.custom,
          message:
            "Tần suất trả 6 tháng yêu cầu thời hạn vay tối thiểu 12 tháng",
        });
      }
    }
  });
export type LoanFormValues = z.infer<typeof newLoanSchema>;

const NewLoans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [verificationSuccess] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const {
    register,
    trigger,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<LoanFormValues>({
    resolver: zodResolver(newLoanSchema),
    defaultValues: defaultFormData,
  });

  const { student, isLoading: studentLoading } = useStudent(user?.citizen_id);
  const { academicData: academic, isLoading: academicLoading } = useAcademic(
    student?.student_id!,
  );
  const { createLoan, createLoanPending } = useCreateLoan();

  const [studentInfo, setStudentInfo] = useState({});

  useEffect(() => {
    setStudentInfo({
      fullName: user?.name || "Nguyễn Văn An",
      studentId: student?.student_id || "SV001",
      major: student?.major || "Khoa học Máy tính",
      academicYear: "2021-2025",
      gpa: academic?.gpa || "3.75",
      completedCredits: academic?.total_credits_earned,
      totalCredits: academic?.total_credits_earned,
      academicRank: "Giỏi",
      academicStatus: "Đang học",
    });
  }, [academic, student]);

  // const [errors, setErrors] = useState<FormErrors>({});
  useEffect(() => {
    // clearErrors();
  }, [watch()]);

  const handleNextStep = () => {
    if (currentStep === 1) {
      trigger().then((isValid) => {
        if (isValid) {
          setCurrentStep(2);
        } else {
          console.error("Form validation failed", errors);
        }
      });
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
      createLoan(
        {
          ...watch(),
          student_id: student?.student_id,
          citizen_id: user.citizen_id,
          name: user.name,
        },
        {
          onSuccess: () => {
            // Extract the actual data from axios response

            setSubmitSuccess(true);
            setIsProcessing(false);
          },
          onError: () => {
            setSubmitSuccess(false);
            setIsProcessing(false);
          },
        },
      );
    } catch (error) {
      setSubmitSuccess(false);
      setIsProcessing(false);
    }
  };
  const onSubmit = async () => {
    if (currentStep !== 3) {
      setCurrentStep(3);
      return;
    }

    // From Step 3, move to Step 4 (OTP) without calling API yet
    setCurrentStep(4);
  };

  // Show loading state while initial data is loading
  if (studentLoading || academicLoading || !studentInfo) {
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
              formData={watch()}
              studentInfo={studentInfo}
              register={register}
              setValue={setValue}
              errors={errors}
              clearErrors={clearErrors}
            />
          )}

          {/* Step 2: Academic Verification */}
          {currentStep === 2 && <Step2 studentInfo={studentInfo} />}

          {/* Step 3: Final Review */}
          {currentStep === 3 && (
            <Step3 formData={watch()} studentInfo={studentInfo} />
          )}
          {/* Step 4: OTP Verification */}
          {currentStep === 4 && (
            <Step4
              formData={watch()}
              onNext={() => setCurrentStep(5)}
              onBack={() => {
                setCurrentStep(3);
              }}
              onOtpVerified={handleLoanCreation}
            />
          )}
          {/* Step 5: PDF Generation */}
          {currentStep === 5 && (
            <Step5 formData={watch()} studentInfo={studentInfo} />
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
                      onClick={onSubmit}
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
