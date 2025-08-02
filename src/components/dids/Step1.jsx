import React, { useState } from "react";
import {
  Shield,
  Wallet,
  AlertCircle,
  Upload,
  GraduationCap,
  FileCheck,
  Calendar,
} from "lucide-react";

const terms = [
  { value: "1", label: "Học kỳ 1" },
  { value: "2", label: "Học kỳ 2" },
  { value: "3", label: "Học kỳ 3" },
  { value: "4", label: "Học kỳ 4" },
];

const studyYears = [
  { value: "2019-2020", label: "Năm học 2019-2020" },
  { value: "2020-2021", label: "Năm học 2020-2021" },
  { value: "2021-2022", label: "Năm học 2021-2022" },
  { value: "2023-2024", label: "Năm học 2023-2024" },
  { value: "2024-2025", label: "Năm học 2024-2025" },
  { value: "2025-2026", label: "Năm học 2025-2026" },
];

const methods = [
  { value: "did:key", label: "DID Key Method" },
  { value: "did:web", label: "DID Web Method" },
  { value: "did:ethr", label: "DID Ethereum Method" },
  { value: "did:ion", label: "DID ION Method" },
];

const Step1 = ({ onNext, register, errors, handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onNext(2);
    }, 2000);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <h2 className="flex items-center text-lg font-semibold text-white">
          <Wallet className="mr-2 h-5 w-5" />
          Import your DID From Digital Wallet
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-6 space-y-6">
        {/* Public Name */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
            <FileCheck className="mr-2 h-4 w-4 text-indigo-500" />
            Public Name
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="University Degree"
            className={`w-full rounded-xl border px-4 py-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:bg-gray-700 dark:text-white ${
              errors?.name
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
            }`}
          />
          {errors?.name && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="mr-1 h-4 w-4" />
              {errors?.name?.message || "This field is required"}
            </div>
          )}
        </div>

        {/* Method */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Shield className="mr-2 h-4 w-4 text-indigo-500" />
            Method
            <span className="ml-1 text-red-500">*</span>
          </label>
          <select
            {...register("method")}
            className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:bg-gray-700 dark:text-white ${
              errors?.method
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
            }`}
          >
            <option value="">Select method</option>
            {methods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
          {errors?.method && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="mr-1 h-4 w-4" />
              {errors?.method?.message || "This field is required"}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
            <FileCheck className="mr-2 h-4 w-4 text-indigo-500" />
            Description (Optional)
          </label>
          <textarea
            {...register("description")}
            placeholder="This code will be inserted in the code of every credential you issued"
            rows="3"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* DID */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Wallet className="mr-2 h-4 w-4 text-indigo-500" />
            DID
            <span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("did")}
            placeholder="did:cheqd:123..."
            className={`w-full rounded-xl border px-4 py-3 font-mono text-sm shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:bg-gray-700 dark:text-white ${
              errors?.did
                ? "border-red-300 focus:border-red-500"
                : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
            }`}
          />
          {errors?.did && (
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="mr-1 h-4 w-4" />
              {errors?.did?.message || "This field is required"}
            </div>
          )}
        </div>
        {/* PERIOD */}
        <div className="flex w-full flex-row justify-between gap-8">
          {/* YEAR STUDY */}
          <div className="flex-1 space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <Calendar className="mr-2 h-4 w-4 text-indigo-500" />
              Năm học
              <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              {...register("study_year")}
              className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:bg-gray-700 dark:text-white ${
                errors?.study_year
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
              }`}
            >
              <option className="" value="">
                Chọn năm học
              </option>
              {studyYears.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
            {errors?.study_year && (
              <div className="flex items-center text-sm text-red-600">
                <AlertCircle className="mr-1 h-4 w-4" />
                {errors?.study_year?.message || "This field is required"}
              </div>
            )}
          </div>
          {/* TERM */}
          <div className="flex-1 space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <GraduationCap className="mr-2 h-4 w-4 text-indigo-500" />
              Học kỳ
              <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              {...register("term")}
              className={`w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:bg-gray-700 dark:text-white ${
                errors?.term
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-300 focus:border-indigo-500 dark:border-gray-600"
              }`}
            >
              <option value="">Chọn học kỳ</option>
              {terms.map((term) => (
                <option key={term.value} value={term.value}>
                  {term.label}
                </option>
              ))}
            </select>
            {errors?.term && (
              <div className="flex items-center text-sm text-red-600">
                <AlertCircle className="mr-1 h-4 w-4" />
                {errors?.term?.message || "This field is required"}
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 py-4">
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer relative rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Đang xử lý...
                </div>
              ) : (
                <div className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Submit
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step1;
