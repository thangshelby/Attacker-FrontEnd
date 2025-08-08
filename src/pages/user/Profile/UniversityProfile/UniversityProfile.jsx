import React, { useState } from "react";
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
  CreditCard,
  Loader2,
  Info,
} from "lucide-react";
import ImageUpload from "@/components/user/profile/ImageUpload";
import { useStudent } from "@/hooks/useStudent";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  universities,
  faculties,
  defaultUniversityProfile,
} from "@/constants/universityProfile";
import { useEffect } from "react";

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

const universitySchema = z.object({
  student_id: z.string().min(1, "Mã số sinh viên là bắt buộc"),
  university: z.string().min(1, "Vui lòng chọn trường đại học"),
  faculty_name: z.string().min(1, "Vui lòng chọn khoa"),
  major_name: z.string().min(1, "Chuyên ngành là bắt buộc"),
  year_of_study: z
    .number()
    .min(1, "Năm học phải từ 1 đến 6")
    .max(6, "Năm học phải từ 1 đến 6"),
  class_id: z.string().optional(),
  has_parttime_job: z.boolean().optional(),
  has_supporter: z.boolean().optional(),
  student_card_front: z.string().nullable().optional(),
  student_card_back: z.string().nullable().optional(),
});

const UniversityProfile = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessingSide, setCurrentProcessingSide] = useState(null);
  const { student, updateStudent } = useStudent();
  const studentt = {};
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(universitySchema),
    defaultValues: {
      student_id: studentt?.student_id || "",
      university: studentt?.university || "",
      faculty_name: studentt?.faculty_name || "",
      major_name: studentt?.major_name || "",
      year_of_study: studentt?.year_of_study || 1,
      class_id: studentt?.class_id || "",
      has_parttime_job: studentt?.has_parttime_job || false,
      has_supporter: studentt?.has_supporter || false,
      student_card_front: student?.student_card_front || null,
      student_card_back: student?.student_card_back || null,
    },
  });

  const watchedValues = watch();
  const selectedUniversity = universities.find(
    (uni) => uni.id === watchedValues.university,
  );

  useEffect(() => {
    if (
      watchedValues.student_card_front &&
      watchedValues.student_card_back
      //  && !student.student_id
    ) {
      reset({
        ...student,
        student_card_front: watchedValues.student_card_front,
        student_card_back: watchedValues.student_card_back,
      });
    }
  }, [
    watchedValues.student_card_back,
    watchedValues.student_card_front,
    student,
  ]);

  const handleImageSelect = (side) => async (imageUrl) => {
    setValue(side, imageUrl);
    setIsProcessing(false);
    setCurrentProcessingSide(null);
  };

  const onSubmit = async () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmModal(false);
    updateStudent.mutate(watchedValues);
  };
  const handleProcessStudentCard = (val, side) => {
    setIsProcessing(val);
    setCurrentProcessingSide(side);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Đang xử lý thẻ sinh viên{" "}
                {currentProcessingSide === "student_card_front"
                  ? "mặt trước"
                  : "mặt sau"}
                ...
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đang đọc thông tin từ ảnh thẻ sinh viên
              </p>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="mx-4 w-[400px] rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-6 text-lg leading-relaxed font-semibold text-gray-800 dark:text-gray-200">
                Bạn có chắc muốn cập nhật thông tin này?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmUpdate}
                  className="min-w-[80px] rounded-full bg-blue-500 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-600"
                >
                  Có
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="min-w-[80px] rounded-full bg-gray-500 px-8 py-3 font-medium text-white transition-colors hover:bg-gray-600"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

        {/* Student Card Upload Section */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-4">
            <h2 className="flex items-center text-lg font-semibold text-white">
              <CreditCard className="mr-2 h-5 w-5" />
              Tự động điền thông tin từ thẻ sinh viên
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex items-start space-x-3">
                <Info className="mt-0.5 h-5 w-5 text-blue-500" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="mb-1 font-medium">
                    Lưu ý khi chụp thẻ sinh viên:
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• Chụp rõ nét, đầy đủ 4 góc thẻ sinh viên</li>
                    <li>• Đảm bảo ánh sáng đủ, không bị mờ hoặc phản quang</li>
                    <li>
                      • Mặt trước có ảnh và thông tin cá nhân, mã sinh viên
                    </li>
                    <li>• Mặt sau có thông tin trường học và khoa</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ImageUpload
                label="Thẻ sinh viên - Mặt trước"
                onImageSelect={handleImageSelect("student_card_front")}
                selectedImage={watchedValues.student_card_front}
                setIsProcessing={handleProcessStudentCard}
                side="student_card_front"
              />
              <ImageUpload
                label="Thẻ sinh viên - Mặt sau"
                onImageSelect={handleImageSelect("student_card_back")}
                selectedImage={watchedValues.student_card_back}
                setIsProcessing={handleProcessStudentCard}
                side="student_card_back"
              />
            </div>

            {/* Status Summary */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div
                    className={`mr-2 h-3 w-3 rounded-full ${
                      watchedValues.student_card_front
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mặt trước {watchedValues.student_card_front ? "✓" : "○"}
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`mr-2 h-3 w-3 rounded-full ${
                      watchedValues.student_card_back
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mặt sau {watchedValues.student_card_back ? "✓" : "○"}
                  </span>
                </div>
              </div>
              {watchedValues.student_card_front &&
                watchedValues.student_card_back && (
                  <div className="mt-2 text-center">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Thẻ sinh viên đã được upload đầy đủ
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>

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
                    {...register("year_of_study", {
                      valueAsNumber: true,
                    })}
                    min={1}
                    max={6}
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
                  onClick={() => {
                    reset();
                  }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={updateStudent.isPending}
                  className="relative rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updateStudent.isPending ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Đang xử lý...
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
