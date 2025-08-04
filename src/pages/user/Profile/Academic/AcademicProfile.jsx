import React, { useState, useCallback, useEffect, useMemo } from "react";
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
  Eye,
  X,
  Plus,
  Trash2,
  FileText,
  Loader2,
  Info,
  AlertCircle,
} from "lucide-react";
import { uploadImage } from "@/utils";

// Mock data
const mockStudent = {
  student_id: "20190001",
  university: "Trường Đại học Khoa học Tự nhiên TP.HCM",
  faculty_name: "Công nghệ Thông tin",
  major_name: "Khoa học Máy tính",
  year_of_study: 4,
  class_id: "CS19A1",
  has_parttime_job: false,
  has_supporter: true,
};

const mockUser = {
  name: "Nguyễn Văn An",
  citizen_id: "123456789012",
};

const mockAcademicData = {
  current_gpa: 3.85,
  total_credits_earned: 120,
  achievement_award_count: 3,
  extracurricular_activities_count: 5,
  failed_course_count: 0,
  has_scholarship: true,
  scholarship_count: 2,
  has_leadership_role: true,
  study_year: 4,
  updated_at: "2024-12-01T10:30:00Z",
};

// Transcript Upload Component
const TranscriptUpload = ({ transcripts, onTranscriptsChange, errors }) => {

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const addFiles = useCallback(
    async (files) => {
      const imageFiles = files.filter((file) =>
        file.type.startsWith("image/"),
      );

      if (imageFiles.length === 0) return;

      const validFiles = imageFiles.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} vượt quá 10MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        console.log("Uploading files:", validFiles[0]);
        await uploadImage(validFiles[0])

        const newTranscripts = validFiles.map((file, index) => ({
          id: Date.now() + index,
          file,
          semester: "",
          year: new Date().getFullYear(),
        }));
        onTranscriptsChange([...transcripts, ...newTranscripts]);
      }
    },
    [transcripts, onTranscriptsChange],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(Array.from(e.dataTransfer.files));
    },
    [addFiles],
  );

  const handleFileSelect = useCallback(
    (e) => {
      addFiles(Array.from(e.target.files));
    },
    [addFiles],
  );

  const removeTranscript = useCallback(
    (id) => {
      onTranscriptsChange(transcripts.filter((t) => t.id !== id));
    },
    [transcripts, onTranscriptsChange],
  );

  const updateTranscript = useCallback(
    (id, field, value) => {
      onTranscriptsChange(
        transcripts.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
      );
    },
    [transcripts, onTranscriptsChange],
  );

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ${
          isDragging
            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
            : "border-gray-300 hover:border-indigo-400 dark:border-gray-600"
        } p-8 text-center`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />

        <div className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <Upload className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Kéo thả bảng điểm vào đây hoặc nhấn để chọn
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PNG, JPG, JPEG (tối đa 10MB mỗi file) - Có thể chọn nhiều file
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm bảng điểm
          </button>
        </div>
      </div>

      {/* Uploaded Transcripts List */}
      {transcripts.length > 0 && (
        <div className="space-y-4">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            <FileText className="mr-2 h-5 w-5 text-indigo-500" />
            Bảng điểm đã upload ({transcripts.length})
          </h4>

          <div className="grid gap-4">
            {transcripts.map((transcript, index) => (
              <TranscriptItem
                key={transcript.id}
                transcript={transcript}
                index={index}
                onRemove={removeTranscript}
                onUpdate={updateTranscript}
              />
            ))}
          </div>
        </div>
      )}

      {errors && (
        <div className="flex items-center text-sm text-red-600">
          <AlertCircle className="mr-1 h-4 w-4" />
          {errors.message}
        </div>
      )}
    </div>
  );
};

// Individual Transcript Item Component
const TranscriptItem = ({ transcript, index, onRemove, onUpdate }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (transcript.file) {
      const url = URL.createObjectURL(transcript.file);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [transcript.file]);

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 10 }, (_, i) => currentYear - i),
    [currentYear],
  );

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* File Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Bảng điểm #{index + 1}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {transcript.file?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Kích thước:{" "}
                  {transcript.file
                    ? (transcript.file.size / 1024 / 1024).toFixed(2)
                    : "0.00"}{" "}
                  MB
                </p>
              </div>
            </div>
          </div>

          {/* Semester Input */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Học kỳ
            </label>
            <select
              value={transcript.semester}
              onChange={(e) =>
                onUpdate(transcript.id, "semester", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Chọn học kỳ</option>
              <option value="HK1">Học kỳ 1</option>
              <option value="HK2">Học kỳ 2</option>
              <option value="HK3">Học kỳ 3 (Hè)</option>
            </select>
          </div>

          {/* Year Input */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Năm học
            </label>
            <select
              value={transcript.year}
              onChange={(e) =>
                onUpdate(transcript.id, "year", parseInt(e.target.value, 10))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Thao tác
            </label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                title="Xem trước"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onRemove(transcript.id)}
                className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                title="Xóa"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-h-[90vh] max-w-[90vw] rounded-xl bg-white p-4 dark:bg-gray-800">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 z-10"
              aria-label="Đóng xem trước"
            >
              <X className="h-4 w-4" />
            </button>
            {objectUrl && (
              <img
                src={objectUrl}
                alt={`Bảng điểm ${index + 1}`}
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
              />
            )}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bảng điểm #{index + 1} - {transcript.semester || "-"} - Năm{" "}
                {transcript.year}
              </p>
              <p className="text-xs text-gray-500">
                {transcript.file?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AcademicProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [errors, setErrors] = useState({});

  // Mock data
  const student = mockStudent;
  const user = mockUser;
  const [academicData, setAcademicData] = useState(mockAcademicData);

  const getGPAColor = (gpa) => {
    if (gpa >= 3.6) return "text-green-400";
    if (gpa >= 3.0) return "text-blue-400";
    if (gpa >= 2.5) return "text-yellow-400";
    return "text-red-400";
  };

  const getGPALevel = (gpa) => {
    if (gpa >= 3.6) return "Xuất sắc";
    if (gpa >= 3.2) return "Giỏi";
    if (gpa >= 2.5) return "Khá";
    if (gpa >= 2.0) return "Trung bình";
    return "Yếu";
  };

  // Mock OCR processing for transcripts
  const processTranscripts = async () => {
    setIsProcessing(true);

    // Simulate OCR processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock updated academic data after processing
    const updatedData = {
      ...academicData,
      current_gpa: 3.92,
      total_credits_earned: 135,
      failed_course_count: 1,
      updated_at: new Date().toISOString(),
    };

    setIsProcessing(false);
    setAcademicData(updatedData);
    return updatedData;
  };

  const validateForm = () => {
    const newErrors = {};

    if (transcripts.length === 0) {
      newErrors.transcripts = {
        message: "Vui lòng upload ít nhất một bảng điểm",
      };
    }

    // Validate each transcript
    const invalidTranscripts = transcripts.filter(
      (t) => !t.semester || !t.year,
    );

    if (invalidTranscripts.length > 0) {
      newErrors.transcripts = {
        message:
          "Vui lòng điền đầy đủ thông tin học kỳ và năm học cho tất cả bảng điểm",
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmModal(false);

    try {
      // Process transcripts
      await processTranscripts();

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("citizen_id", user.citizen_id);
      formData.append("student_id", student.student_id);

      transcripts.forEach((transcript, index) => {
        formData.append(`transcript_${index}`, transcript.file);
        formData.append(
          `transcript_${index}_semester`,
          transcript.semester,
        );
        formData.append(
          `transcript_${index}_year`,
          transcript.year.toString(),
        );
      });

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Academic data updated successfully");

      // Reset form
      setTranscripts([]);
      setErrors({});
    } catch (error) {
      console.error("Error updating academic data:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-purple-400"></div>
          <p className="text-white">Đang tải dữ liệu học tập...</p>
        </div>
      </div>
    );
  }

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
              <h3 className="mb-6 text-lg font-semibold leading-relaxed text-gray-800 dark:text-gray-200">
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
              Cập nhật bảng điểm
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
                    <li>• Đảm bảo ảnh rõ nét, có thể đọc được các thông tin điểm số</li>
                    <li>• Điền đầy đủ thông tin học kỳ và năm học cho mỗi bảng điểm</li>
                    <li>• Hệ thống sẽ tự động phân tích và cập nhật GPA</li>
                  </ul>
                </div>
              </div>
            </div>

            <TranscriptUpload
              transcripts={transcripts}
              onTranscriptsChange={setTranscripts}
              errors={errors.transcripts}
            />

            {/* Upload Summary */}
            {transcripts.length > 0 && (
              <div className="mt-6 rounded-xl bg-gray-700/30 p-4">
                <div className="text-center">
                  <div className="mb-2 text-2xl font-bold text-green-400">
                    {transcripts.length}
                  </div>
                  <div className="text-sm text-gray-300">
                    bảng điểm đã upload
                  </div>
                  <div className="mt-2 flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Sẵn sàng xử lý
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleSubmit}
                disabled={transcripts.length === 0}
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50"
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
            <p className={`text-sm ${getGPAColor(academicData?.current_gpa)}`}>
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
                {academicData?.extracurricular_activities_count}
              </span>
            </div>
            <h3 className="font-medium text-white">
              Hoạt Động Ngoại Khóa
            </h3>
            <p className="text-sm text-gray-400">
              Số hoạt động tham gia
            </p>
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
                    {academicData?.extracurricular_activities_count}
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
    </div>
  );
};

export default AcademicProfile;
