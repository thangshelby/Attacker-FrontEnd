import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  Users,
  Briefcase,
  Heart,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";

// Mock data - replace with your actual data
const universities = [
  {
    id: "hcmus",
    name: "Đại học Khoa học Tự nhiên TP.HCM",
    address: "227 Nguyễn Văn Cừ, Q.5, TP.HCM",
  },
  {
    id: "hcmut",
    name: "Đại học Bách khoa TP.HCM",
    address: "268 Lý Thường Kiệt, Q.10, TP.HCM",
  },
  {
    id: "huflit",
    name: "Đại học Ngoại ngữ - Tin học TP.HCM",
    address: "155 Sư Vạn Hạnh, Q.10, TP.HCM",
  },
];

const faculties = [
  { id: "cntt", name: "Công nghệ Thông tin" },
  { id: "kt", name: "Kỹ thuật" },
  { id: "kinhte", name: "Kinh tế" },
  { id: "ngoaingu", name: "Ngoại ngữ" },
];

// Validation schema
const studentSchema = z.object({
  student_id: z.string().min(1, "Mã số sinh viên là bắt buộc"),
  university: z.string().min(1, "Vui lòng chọn trường đại học"),
  faculty_name: z.string().min(1, "Vui lòng chọn khoa"),
  major_name: z.string().min(1, "Chuyên ngành là bắt buộc"),
  year_of_study: z
    .number()
    .min(1, "Năm học phải từ 1 trở lên")
    .max(6, "Năm học không được quá 6"),
  class_id: z.string().optional(),
  has_parttime_job: z.boolean(),
  has_supporter: z.boolean(),
});

const FormField = ({
  label,
  icon: Icon,
  error,
  children,
  required = false,
}) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
      {Icon && <Icon className="mr-2 h-4 w-4 text-indigo-500" />}
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
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

const UniversityProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      student_id: "",
      university: "",
      faculty_name: "",
      major_name: "",
      year_of_study: 1,
      class_id: "",
      has_parttime_job: false,
      has_supporter: false,
    },
  });

  const selectedUniversity = universities.find(
    (uni) => uni.id === watch("university"),
  );

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log("Student data:", data);

      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
            Hồ Sơ Học Vấn
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Cập nhật thông tin về trường học của bạn để hoàn tất hồ sơ
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="animate-fade-in mb-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <div className="flex items-center">
              <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
              <span className="font-medium text-green-800 dark:text-green-200">
                Cập nhật thông tin thành công!
              </span>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="flex items-center text-lg font-semibold text-white">
                <Sparkles className="mr-2 h-5 w-5" />
                Thông tin sinh viên
              </h2>
            </div>

            <div className="space-y-8 p-6">
              {/* University Selection */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <FormField
                    label="Trường đại học"
                    icon={Building2}
                    error={errors.university}
                    required
                  >
                    <div className="relative">
                      <select
                        {...register("university")}
                        className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Chọn trường đại học</option>
                        {universities.map((uni) => (
                          <option key={uni.id} value={uni.id}>
                            {uni.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                    {selectedUniversity && (
                      <div className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-800 dark:bg-indigo-900/30">
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                          <strong>Địa chỉ:</strong> {selectedUniversity.address}
                        </p>
                      </div>
                    )}
                  </FormField>
                </div>

                <FormField
                  label="Mã số sinh viên"
                  icon={Users}
                  error={errors.student_id}
                  required
                >
                  <input
                    type="text"
                    {...register("student_id")}
                    placeholder="Nhập mã số sinh viên"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField label="Mã lớp" icon={Users} error={errors.class_id}>
                  <input
                    type="text"
                    {...register("class_id")}
                    placeholder="Nhập mã lớp (tùy chọn)"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  label="Khoa"
                  icon={BookOpen}
                  error={errors.faculty_name}
                  required
                >
                  <div className="relative">
                    <select
                      {...register("faculty_name")}
                      className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Chọn khoa</option>
                      {faculties.map((faculty) => (
                        <option key={faculty.id} value={faculty.name}>
                          {faculty.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>
                </FormField>

                <FormField
                  label="Năm học"
                  icon={Calendar}
                  error={errors.year_of_study}
                  required
                >
                  <input
                    type="number"
                    {...register("year_of_study", { valueAsNumber: true })}
                    min="1"
                    max="6"
                    placeholder="Năm thứ mấy"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <div className="lg:col-span-2">
                  <FormField
                    label="Chuyên ngành"
                    icon={GraduationCap}
                    error={errors.major_name}
                    required
                  >
                    <input
                      type="text"
                      {...register("major_name")}
                      placeholder="Nhập tên chuyên ngành"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Thông tin bổ sung
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-indigo-300 dark:border-gray-600 dark:hover:border-indigo-500">
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        {...register("has_parttime_job")}
                        className="rounded border-gray-300 bg-white text-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <div className="ml-3">
                        <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                          <Briefcase className="mr-2 h-4 w-4 text-indigo-500" />
                          Có việc làm thêm
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Bạn hiện tại có công việc part-time không?
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-indigo-300 dark:border-gray-600 dark:hover:border-indigo-500">
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        {...register("has_supporter")}
                        className="rounded border-gray-300 bg-white text-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <div className="ml-3">
                        <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                          <Heart className="mr-2 h-4 w-4 text-indigo-500" />
                          Có người hỗ trợ
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Bạn có người hỗ trợ tài chính học tập không?
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-6 py-4 dark:bg-gray-700/50">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Đang lưu...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Lưu thông tin
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniversityProfile;
