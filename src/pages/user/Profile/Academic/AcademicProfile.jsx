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
import DocumentUploadDemo from "@/components/profile/DocumentUpload";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/hooks/useStudent";
import { useAcademic } from "@/hooks/useAcademic";
import { getGPAColor, getGPALevel } from "@/utils/index";
import { useEffect } from "react";

const AcademicProfile = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [isProcessSuccess, setIsProcessSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useAuth();
  const { student } = useStudent(user.citizen_id);
  const { academicData } = useAcademic();
  const academicContainerRef = useRef(null);

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
                Bạn có chắc muốn cập nhật thông tin học tập từ{" "}
                {transcripts.length} bảng điểm?
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
              transcripts={transcripts}
              onTranscriptsChange={setTranscripts}
              errors={errors.transcripts}
            />

            {/* Action Button */}
            <div className="mt-6 cursor-pointer text-center">
              <button
                onClick={handleSubmit}
                // disabled={transcripts.length === 0}
                className="inline-flex cursor-pointer items-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Upload className="mr-2 h-4 w-4" />
                Cập nhật thông tin học tập
              </button>
            </div>
          </div>
        </div>

        {/* Student Info Card */}
        <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
          <div className="mb-4 flex items-center space-x-4">
            <div className="rounded-full bg-purple-600 p-3">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-300">{student.student_id}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <span className="text-gray-400">Trường đại học:</span>
              <p className="text-white">{student.university}</p>
            </div>
            <div>
              <span className="text-gray-400">Ngành học:</span>
              <p className="text-white">{student.faculty_name}</p>
            </div>
            <div>
              <span className="text-gray-400">Năm học:</span>
              <p className="text-white">Năm {academicData.study_year}</p>
            </div>
            <div>
              <span className="text-gray-400">Chuyên ngành:</span>
              <p className="text-white">{student.major_name}</p>
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
                    {academicData?.current_gpa?.toFixed(2)}
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
                    {academicData?.total_credits_earned}
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
                    {academicData?.achievement_award_count}
                  </span>
                </div>
                <h3 className="font-medium text-white">Thành Tích</h3>
                <p className="text-sm text-gray-400">Giải thưởng đạt được</p>
              </div>

              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
                <div className="mb-2 flex items-center justify-between">
                  <Users className="h-6 w-6 text-green-400" />
                  <span className="text-2xl font-bold text-white">
                    {academicData?.extracurricular_activity_count}
                  </span>
                </div>
                <h3 className="font-medium text-white">Hoạt Động Ngoại Khóa</h3>
                <p className="text-sm text-gray-400">Số hoạt động tham gia</p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Academic Details */}
              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
                <h3 className="mb-6 flex items-center text-xl font-bold text-white">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-400" />
                  Chi Tiết Học Tập
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-700 py-3">
                    <span className="text-gray-300">Môn học trượt</span>
                    <span
                      className={`font-medium ${
                        academicData?.failed_course_count > 0
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {academicData?.failed_course_count} môn
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-700 py-3">
                    <span className="text-gray-300">Có học bổng</span>
                    <div className="flex items-center">
                      {academicData?.has_scholarship ? (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4 text-red-400" />
                      )}
                      <span
                        className={`font-medium ${
                          academicData?.has_scholarship
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {academicData?.has_scholarship ? "Có" : "Không"}
                      </span>
                    </div>
                  </div>

                  {academicData?.has_scholarship && (
                    <div className="flex items-center justify-between border-b border-gray-700 py-3">
                      <span className="text-gray-300">Số học bổng</span>
                      <span className="font-medium text-yellow-400">
                        {academicData?.scholarship_count} học bổng
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-300">Vai trò lãnh đạo</span>
                    <div className="flex items-center">
                      {academicData?.has_leadership_role ? (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4 text-red-400" />
                      )}
                      <span
                        className={`font-medium ${
                          academicData?.has_leadership_role
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {academicData?.has_leadership_role ? "Có" : "Không"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements & Activities */}
              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-lg">
                <h3 className="mb-6 flex items-center text-xl font-bold text-white">
                  <Star className="mr-2 h-5 w-5 text-yellow-400" />
                  Thành Tích & Hoạt Động
                </h3>

                <div className="space-y-6">
                  {/* Achievement Summary */}
                  <div className="rounded-lg bg-gray-700/30 p-4">
                    <h4 className="mb-3 font-medium text-white">
                      Tổng Quan Thành Tích
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {academicData?.achievement_award_count}
                        </div>
                        <div className="text-gray-400">Giải thưởng</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {academicData?.scholarship_count || 0}
                        </div>
                        <div className="text-gray-400">Học bổng</div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Summary */}
                  <div className="rounded-lg bg-gray-700/30 p-4">
                    <h4 className="mb-3 font-medium text-white">
                      Hoạt Động Ngoại Khóa
                    </h4>
                    <div className="text-center">
                      <div className="mb-2 text-3xl font-bold text-green-400">
                        {academicData?.extracurricular_activity_count || 2}
                      </div>
                      <div className="text-sm text-gray-400">
                        Hoạt động đã tham gia
                      </div>
                      {academicData?.has_leadership_role && (
                        <div className="mt-2 inline-flex items-center rounded-full border border-purple-600/30 bg-purple-600/20 px-3 py-1 text-xs text-purple-400">
                          <Users className="mr-1 h-3 w-3" />
                          Có vai trò lãnh đạo
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Cập nhật lần cuối:{" "}
                {new Date(academicData?.updated_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicProfile;
