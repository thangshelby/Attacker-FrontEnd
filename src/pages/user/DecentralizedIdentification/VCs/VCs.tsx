import React, { useState } from "react";
import { Shield, ArrowRight } from "lucide-react";
import Step1 from "@/components/user/dids/Step1";
import Step2 from "@/components/user/dids/Step2";
import Step3 from "@/components/user/dids/Step3";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const registerSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(1, { message: "Public Name is required" }),
  description: z.string().optional(),
  did: z.string().min(20, { message: "Not valid DID" }),
  method: z.string(),
  study_year: z.string().min(1, { message: "Study Year is required" }),
  term: z.string().min(1, { message: "Term is required" }),
});
const DIDImportPage = () => {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      image: "",
      name: "",
      description: "",
      did: "",
      method: "",
      study_year: "",
      term: "",
    },
  });

  const [step, setStep] = useState(1); // Bắt đầu từ bước 3 (kiểm tra email)
  const handleSetStep = (newStep) => {
    setStep(newStep);
  };
  const StepIndicator = () => (
    <div className="mb-8 flex items-center justify-center">
      <div className="flex items-center space-x-4">
        {/* Step 1 */}
        <div className="flex items-center">
          <div
            onClick={() => handleSetStep(1)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
              step >= 1
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <span className="text-sm font-semibold">1</span>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Import DID
          </span>
        </div>

        <ArrowRight className="h-5 w-5 text-gray-400" />

        {/* Step 2 */}
        <div className="flex items-center">
          <div
            onClick={() => handleSetStep(2)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
              step >= 2
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <span className="text-sm font-semibold">2</span>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Request VC
          </span>
        </div>

        <ArrowRight className="h-5 w-5 text-gray-400" />

        {/* Step 3 */}
        <div className="flex items-center">
          <div
            onClick={() => handleSetStep(3)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
              step >= 3
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <span className="text-sm font-semibold">3</span>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Check Email
          </span>
        </div>
      </div>
    </div>
  );

  if (step === 3) {
    return <Step3 StepIndicator={<StepIndicator />} watch={watch}></Step3>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
            Import Your DID
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Nhập DID của bạn để yêu cầu Verifiable Credential từ nhà trường
          </p>
        </div>
        <StepIndicator />
        {step == 1 && (
          <Step1
            onNext={handleSetStep}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
          />
        )}
        {step == 2 && <Step2 onNext={handleSetStep} watch={watch} />}
      </div>
    </div>
  );
};

export default DIDImportPage;
