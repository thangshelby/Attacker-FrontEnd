import React, { useState, useRef } from "react";
import {
  User,
  Award,
  BookOpen,
  Trophy,
  Users,
  CheckCircle,
  XCircle,
  Star,
  GraduationCap,
  Upload,
  FileText,
  Loader2,
  Info,
  AlertCircle,
} from "lucide-react";
import DocumentUploadDemo from "@/components/user/profile/DocumentUpload";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import { getGPAColor, getGPALevel } from "@/utils/index";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AcademicProfile = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessSuccess, setIsProcessSuccess] = useState(false);
  const { user } = useAuth();
  const { student } = useStudent(user?.citizen_id);
  const { academicData, refetch: refetchAcademicData } = useAcademic(student?.student_id);
  const academicContainerRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (academicContainerRef?.current) {
      academicContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isProcessSuccess]);

  // Mock OCR processing for transcripts
  const processTranscripts = async () => {
    // setIsProcessing(true);
    // // Simulate OCR processing time
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // setIsProcessing(false);
    // setIsProcessSuccess(true);
    // setAcademicData(updatedData);
  };

  const handleSubmit = async () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmModal(false);

    try {
      // Process transcripts
      await processTranscripts();
      setIsProcessing(true);

      // Simulate OCR processing time
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsProcessing(false);
      setIsProcessSuccess(true);
      setTranscripts([]);
      setErrors({});
    } catch (error) {
      console.error("Error updating academic data:", error);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
  //       <div className="text-center">
  //         <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-purple-400"></div>
  //         <p className="text-white">Đang tải dữ liệu học tập...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Đang xử lý bảng điểm...
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đang đọc và phân tích thông tin từ bảng điểm của bạn
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="mx-4 w-[400px] rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-6 text-lg leading-relaxed font-semibold text-gray-800 dark:text-gray-200">
                Bạn có chắc muốn cập nhật thông tin học tập?
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

      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-lg bg-purple-600 p-2">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Kết Quả Học Tập
                </h1>
                <p className="text-sm text-gray-300">
                  Cập nhật bảng điểm và xem thành tích học tập
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">DID đã xác minh</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Transcript Upload Section */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-700 bg-gray-800/50 backdrop-blur-lg">
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-4">
            <h2 className="flex items-center text-lg font-semibold text-white">
              <FileText className="mr-2 h-5 w-5" />
              Cập nhật bảng điểm, thành tích học tập, hoạt động ngoại khóa, vai
              trò...
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex items-start space-x-3">
                <Info className="mt-0.5 h-5 w-5 text-blue-500" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="mb-1 font-medium">
                    Hướng dẫn upload bảng điểm:
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• Upload tất cả bảng điểm các học kỳ đã hoàn thành</li>
                    <li>
                      • Đảm bảo ảnh rõ nét, có thể đọc được các thông tin điểm
                      số
                    </li>
                    <li>
                      • Điền đầy đủ thông tin học kỳ và năm học cho mỗi bảng
                      điểm
                    </li>
                    <li>• Hệ thống sẽ tự động phân tích và cập nhật GPA</li>
                  </ul>
                </div>
              </div>
            </div>

            <DocumentUploadDemo
              studentId={student?.student_id}
              onFinalSubmit={async (academicData: any) => {
                console.log('🎯 === onFinalSubmit TRIGGERED ===');
                console.log('Academic data from DocumentUploadDemo:', academicData);
                console.log('🔄 Starting cache invalidation and refetch...');
                
                // Invalidate và refetch academic data sau khi upload thành công
                if (student?.student_id) {
                  try {
                    // Method 1: Invalidate cache
                    console.log('🗑️ Invalidating cache...');
                    await queryClient.invalidateQueries({
                      queryKey: ["academicRecord", student.student_id]
                    });
                    console.log('✅ Invalidated academic record cache for student:', student.student_id);
                    
                    // Method 2: Remove cache completely
                    console.log('🗑️ Removing cache completely...');
                    await queryClient.removeQueries({
                      queryKey: ["academicRecord", student.student_id]
                    });
                    
                    // Method 3: Force refetch 
                    console.log('🔄 Force refetching academic data...');
                    if (refetchAcademicData) {
                      const result = await refetchAcademicData();
                      console.log('✅ Refetch result:', result);
                    }
                    
                    // Method 4: Reset queries để force fresh fetch
                    console.log('🔄 Resetting queries...');
                    await queryClient.resetQueries({
                      queryKey: ["academicRecord", student.student_id]
                    });
                    
                    console.log('� All refresh methods completed!');
                  } catch (error) {
                    console.error('❌ Error during cache refresh:', error);
                  }
                }
              }}
            />


          </div>
        </div>

        {/* Student Info Card */}
        <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
          <div className="mb-4 flex items-center space-x-4">
            <div className="rounded-full bg-purple-600 p-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {user?.name || "Chưa có tên"}
              </h2>
              <p className="text-gray-300">
                {student?.student_id || "Chưa có mã sinh viên"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <span className="text-gray-400">Trường đại học:</span>
              <p className="text-white">
                {student?.university || "Chưa có thông tin"}
              </p>
            </div>
            <div>
              <span className="text-gray-400">Ngành học:</span>
              <p className="text-white">
                {student?.faculty_name || "Chưa có thông tin"}
              </p>
            </div>
            <div>
              <span className="text-gray-400">Năm học:</span>
              <p className="text-white">
                Năm {academicData?.study_year || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-gray-400">Chuyên ngành:</span>
              <p className="text-white">
                {student?.major_name || "Chưa có thông tin"}
              </p>
            </div>
          </div>
        </div>

        {/* Academic Performance Overview */}
        {isProcessSuccess && (
          <div ref={academicContainerRef}>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
                <div className="mb-2 flex items-center justify-between">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                  <span
                    className={`text-2xl font-bold ${getGPAColor(
                      academicData?.current_gpa,
                    )}`}
                  >
                    {academicData?.current_gpa?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <h3 className="font-medium text-white">GPA Hiện Tại</h3>
                <p
                  className={`text-sm ${getGPAColor(academicData?.current_gpa)}`}
                >
                  {getGPALevel(academicData?.current_gpa)}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
                <div className="mb-2 flex items-center justify-between">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">
                    {academicData?.total_credits_earned || 0}
                  </span>
                </div>
                <h3 className="font-medium text-white">Tín Chỉ Tích Lũy</h3>
                <p className="text-sm text-gray-400">
                  Tổng tín chỉ đã hoàn thành
                </p>
              </div>

              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
                <div className="mb-2 flex items-center justify-between">
                  <Award className="h-6 w-6 text-purple-400" />
                  <span className="text-2xl font-bold text-white">
                    {academicData?.achievement_award_count || 0}
                  </span>
                </div>
                <h3 className="font-medium text-white">Thành Tích</h3>
                <p className="text-sm text-gray-400">Giải thưởng đạt được</p>
              </div>

              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
                <div className="mb-2 flex items-center justify-between">
                  <Users className="h-6 w-6 text-green-400" />
                  <span className="text-2xl font-bold text-white">
                    {academicData?.extracurricular_activity_count || 0}
                  </span>
                </div>
                <h3 className="font-medium text-white">Hoạt Động Ngoại Khóa</h3>
                <p className="text-sm text-gray-400">Số hoạt động tham gia</p>
              </div>
            </div>



            {/* Last Updated */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Cập nhật lần cuối:{" "}
                {academicData?.updated_at
                  ? new Date(academicData.updated_at).toLocaleDateString(
                      "vi-VN",
                    )
                  : "Chưa có dữ liệu"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicProfile;
