import  { useState } from "react";
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
import { GoogleGenerativeAI } from "@google/generative-ai";

import ImageUpload from "@/components/shared/ImageUpload";
import { useStudent } from "@/hooks/useStudent";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  universities,
  faculties,
} from "@/constants/universityProfile";
import { useEffect } from "react";
import FormField from "@/components/shared/FormField";
import { useAuth } from "@/hooks/useAuth";
import { academic } from "@/apis/academic";

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
  const [currentProcessingSide, setCurrentProcessingSide] = useState<string | null>(null);
  const [isOCRScanning, setIsOCRScanning] = useState(false);
  const { user } = useAuth();
  
  // ✅ CSS animation cho hiệu ứng scan
  const scanAnimation = `
    @keyframes scan {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;
  const { student, updateStudent } = useStudent(user?.citizen_id);

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
      student_id: student?.student_id || "",
      university: student?.university || "",
      faculty_name: student?.faculty_name || "",
      major_name: student?.major_name || "",
      year_of_study: student?.year_of_study || 1,
      class_id: student?.class_id || "",
      has_parttime_job: student?.has_parttime_job || false,
      has_supporter: student?.has_supporter || false,
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
        has_parttime_job:
          student?.has_parttime_job === null ? false : student?.has_parttime_job,
        has_supporter:
          student?.has_supporter === null ? false : student?.has_supporter,
      });
    }
  }, [
    watchedValues.student_card_back,
    watchedValues.student_card_front,
    student,
  ]);

  // ✅ OCR extraction cho thẻ sinh viên sử dụng thư viện Gemini
  const extractStudentCardOCR = async (file: File) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.error('GEMINI_API_KEY not found');
        return null;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const universityList = universities.map(uni => uni.name).join('\n');
      
      const prompt = `Hãy phân tích thẻ sinh viên này và trích xuất MÃ SỐ SINH VIÊN và TÊN TRƯỜNG từ mặt trước thẻ.

      Mã số sinh viên thường:
      - Nằm ở mặt trước thẻ sinh viên
      - Có format: K21110xxx, 21110xxx, 20110xxx, 22110xxx, v.v.
      - Thường có label "MSSV:", "Mã số:", "Student ID:", hoặc nằm gần tên sinh viên
      - Là dãy số hoặc chữ-số dài 8-10 ký tự

      Tên trường thường:
      - Nằm ở đầu thẻ hoặc logo trường
      - Có thể viết tắt hoặc đầy đủ
      - So sánh và chọn trường phù hợp nhất từ danh sách sau:

      DANH SÁCH TRƯỜNG:
      ${universityList}

      Trả về JSON:
      {
        "student_id": "mã số sinh viên tìm được",
        "university_name": "tên trường chính xác từ danh sách trên (copy y nguyên)"
      }
      
      Chỉ trả về JSON, không giải thích gì thêm.`;

      // Convert file to generative part
      const imageParts = await fileToGenerativePart(file);
      
      const result = await model.generateContent([prompt, imageParts as any]);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        console.error('No OCR text returned');
        return null;
      }

      // Remove markdown code blocks nếu có
      let jsonText = text;
      if (text.includes('```json')) {
        jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      }

      const ocrData = JSON.parse(jsonText);
      console.log('Student Card OCR Result:', ocrData);
      return ocrData;
    } catch (error) {
      console.error('Student Card OCR Error:', error);
      return null;
    }
  };

  // Helper function to convert file to generative part
  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result?.toString().split(',')[1]);
      reader.readAsDataURL(file);
    });
    
    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type
      },
    };
  };

  const handleImageSelect = (
    side: "student_card_front" | "student_card_back"
  ) => async (imageUrl: string | null, file?: File) => {
    setValue(side, imageUrl);
    setIsProcessing(false);
    setCurrentProcessingSide(null);
    
    // ✅ Extract OCR data nếu là mặt trước thẻ sinh viên và có file
            if (file && side === "student_card_front") {
          try {
            console.log("Đang extract OCR data từ thẻ sinh viên:", file.name);
            console.log("GEMINI_API_KEY có sẵn:", !!import.meta.env.VITE_GEMINI_API_KEY);
            
            // ✅ Bật hiệu ứng scanning
            setIsOCRScanning(true);
            
            const ocrData = await extractStudentCardOCR(file);
        
        if (ocrData) {
          console.log("OCR thành công:", ocrData);
          
          // ✅ Tự động điền mã số sinh viên
          if (ocrData.student_id) {
            setValue("student_id", ocrData.student_id);
            console.log("Student ID auto-filled:", ocrData.student_id);
          }
          
          // ✅ Tự động điền trường đại học
          if (ocrData.university_name) {
            // Tìm university ID từ tên trường
            const foundUniversity = universities.find(uni => 
              uni.name === ocrData.university_name
            );
            
            if (foundUniversity) {
              setValue("university", foundUniversity.id);
              console.log("University auto-filled:", foundUniversity.name, "->", foundUniversity.id);
            } else {
              console.log("Không tìm thấy trường phù hợp trong danh sách:", ocrData.university_name);
            }
          }
        } else {
          console.log("OCR trả về null");
        }
      } catch (error) {
        console.error("Lỗi khi extract OCR thẻ sinh viên:", error);
        alert("Lỗi khi xử lý OCR thẻ sinh viên. Vui lòng thử lại với ảnh khác.");
      } finally {
        // ✅ Tắt hiệu ứng scanning
        setIsOCRScanning(false);
      }
    }
  };

  const onSubmit = async () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmModal(false);
    try {
      // Update Student first
      await updateStudent.mutateAsync(watchedValues as any);

      // Then upsert Academic with normalized study_year (1..6) and a default term if missing
      const studentId = watchedValues.student_id as string;
      const normalizedStudyYear = Math.min(
        6,
        Math.max(1, Number(watchedValues.year_of_study) || 3)
      );
      const term = 1;

      const payload: any = {
        student_id: studentId,
        study_year: normalizedStudyYear,
        term,
      };

      try {
        const { data } = await academic.getAcademicRecord(studentId);
        if (data?.data?.academic) {
          await academic.update(studentId, payload);
        } else {
          await academic.create(payload);
        }
      } catch (err: any) {
        // If not found or error, try create
        await academic.create(payload);
      }
    } catch (e) {
      console.error("Update UniversityProfile error:", e);
    }
  };
  const handleProcessStudentCard = (val:boolean, side:string) => {
    setIsProcessing(val);
    setCurrentProcessingSide(side);
  };

  return (
    <>
      {/* ✅ CSS Animation */}
      <style>{scanAnimation}</style>
      
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
              <div className="relative">
                <ImageUpload
                  label="Thẻ sinh viên - Mặt trước"
                  onImageSelect={handleImageSelect("student_card_front")}
                  selectedImage={watchedValues.student_card_front}
                  setIsProcessing={handleProcessStudentCard}
                  side="student_card_front"
                />
                {/* ✅ Hiệu ứng scan cho mặt trước */}
                {isOCRScanning && watchedValues.student_card_front && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="h-full w-full rounded-xl" 
                         style={{
                           background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)',
                           animation: 'scan 2s ease-in-out infinite'
                         }}
                    />
                  </div>
                )}
              </div>
              
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
                    error={errors.university ? { message: errors.university.message ?? "" } : undefined}
                    required
                    theme="university"
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
                  error={errors.student_id ? { message: errors.student_id.message ?? "" } : undefined}
                  required
                  theme="university"
                >
                  <input
                    type="text"
                    {...register("student_id")}
                    placeholder="Nhập mã số sinh viên"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Mã lớp"
                  icon={Users}
                  error={errors.class_id ? { message: errors.class_id.message ?? "" } : undefined}
                  theme="university"
                >
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
                  error={errors.faculty_name ? { message: errors.faculty_name.message ?? "" } : undefined}
                  required
                  theme="university"
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
                  error={errors.year_of_study ? { message: errors.year_of_study.message ?? "" } : undefined}
                  required
                  theme="university"
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
                    error={errors.major_name ? { message: errors.major_name.message ?? "" } : undefined}
                    required
                    theme="university"
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
    </>
  );
};

export default UniversityProfile;
