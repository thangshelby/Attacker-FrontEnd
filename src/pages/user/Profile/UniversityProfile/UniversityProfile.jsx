  import React, { useState, useCallback } from "react";
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
    Camera,
    Upload,
    Eye,
    X,
    CreditCard,
    Loader2,
    Info,
  } from "lucide-react";
  import { useForm } from "react-hook-form";

  // Mock data
  const universities = [
    {
      id: "hcmus",
      name: "Trường Đại học Khoa học Tự nhiên TP.HCM",
      address: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM",
    },
    {
      id: "hcmut",
      name: "Trường Đại học Bách khoa TP.HCM",
      address: "268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM",
    },
    {
      id: "hcmiu",
      name: "Trường Đại học Quốc tế TP.HCM",
      address: "Quarter 6, Linh Trung Ward, Thu Duc City, TP.HCM",
    },
  ];

  const faculties = [
    { id: "cntt", name: "Công nghệ Thông tin" },
    { id: "toan", name: "Toán - Tin học" },
    { id: "ly", name: "Vật lý - Điện tử" },
    { id: "hoa", name: "Hóa học" },
    { id: "sinh", name: "Sinh học - Công nghệ Sinh học" },
  ];

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

  // Image Upload Component
  const ImageUpload = ({ label, onImageSelect, selectedImage, error, side }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const handleDragOver = useCallback((e) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
      e.preventDefault();
      setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
      (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find((file) => file.type.startsWith("image/"));

        if (imageFile) {
          if (imageFile.size > 10 * 1024 * 1024) {
            alert("Kích thước file không được vượt quá 10MB");
            return;
          }
          onImageSelect(imageFile);
        }
      },
      [onImageSelect],
    );

    const handleFileSelect = useCallback(
      (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
          if (file.size > 10 * 1024 * 1024) {
            alert("Kích thước file không được vượt quá 10MB");
            return;
          }
          onImageSelect(file);
        }
      },
      [onImageSelect],
    );

    const removeImage = useCallback(() => {
      onImageSelect(null);
    }, [onImageSelect]);

    return (
      <div className="space-y-3">
        <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
          <Camera className="mr-2 h-4 w-4 text-indigo-500" />
          {label}
          <span className="ml-1 text-red-500">*</span>
        </label>

        {!selectedImage ? (
          <div
            className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ${
              isDragging
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                : "border-gray-300 hover:border-indigo-400 dark:border-gray-600"
            } p-6 text-center`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />

            <div className="space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Kéo thả ảnh vào đây hoặc nhấn để chọn
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, JPEG (tối đa 10MB)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    <div className="rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-indigo-300 dark:border-gray-600 dark:hover:border-indigo-500">
                      <label className="flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={formData.has_supporter}
                          onChange={(e) =>
                            handleInputChange("has_supporter", e.target.checked)
                          }
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
                  </p>
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
                  <X className="mr-2 inline h-4 w-4" />
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="relative rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50"
                >
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Lưu thông tin
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const UniversityProfile = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentProcessingSide, setCurrentProcessingSide] = useState(null);
    const [studentCardImages, setStudentCardImages] = useState({
      front: null,
      back: null,
    });
    const [formData, setFormData] = useState({
      student_id: "2021XXXX",
      university: "hcmus",
      faculty_name: "Công nghệ Thông tin",
      major_name: "Kỹ thuật Phần mềm",
      year_of_study: 3,
      class_id: "SE21A1",
      has_parttime_job: false,
      has_supporter: true,
    });
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({});
    const { register } = useForm({});

    const selectedUniversity = universities.find(
      (uni) => uni.id === formData.university,
    );

    // Mock OCR processing for student card
    const processStudentCard = async (file, side) => {
      setIsProcessing(true);
      setCurrentProcessingSide(side);

      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Mock extracted data only from front side
      if (side === "front") {
        const mockData = {
          student_id: "20210001234",
          university: "hcmus",
          faculty_name: "Công nghệ Thông tin",
          major_name: "Khoa học Máy tính",
          year_of_study: 4,
          class_id: "CS21A2",
        };

        setFormData((prev) => ({
          ...prev,
          ...mockData,
        }));
      }

      setIsProcessing(false);
      setCurrentProcessingSide(null);
    };

    const handleImageSelect = (side) => (file) => {
      setStudentCardImages((prev) => ({
        ...prev,
        [side]: file,
      }));

      if (file) {
        processStudentCard(file, side);
      }
    };

    const validateForm = () => {
      const newErrors = {};

      if (!formData.student_id.trim()) {
        newErrors.student_id = { message: "Mã số sinh viên là bắt buộc" };
      }

      if (!formData.university) {
        newErrors.university = { message: "Vui lòng chọn trường đại học" };
      }

      if (!formData.faculty_name) {
        newErrors.faculty_name = { message: "Vui lòng chọn khoa" };
      }

      if (!formData.major_name.trim()) {
        newErrors.major_name = { message: "Chuyên ngành là bắt buộc" };
      }

      if (formData.year_of_study < 1 || formData.year_of_study > 6) {
        newErrors.year_of_study = { message: "Năm học phải từ 1 đến 6" };
      }

      if (!studentCardImages.front) {
        newErrors.student_card_front = {
          message: "Vui lòng upload ảnh mặt trước thẻ sinh viên",
        };
      }

      if (!studentCardImages.back) {
        newErrors.student_card_back = {
          message: "Vui lòng upload ảnh mặt sau thẻ sinh viên",
        };
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const onSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        setShowConfirmModal(true);
      }
    };

    const handleConfirmUpdate = async () => {
      setShowConfirmModal(false);
      console.log("Updating student profile:", formData, studentCardImages);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
        {/* Processing Modal */}
        {isProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-4 rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                  <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Đang xử lý thẻ sinh viên{" "}
                  {currentProcessingSide === "front" ? "mặt trước" : "mặt sau"}...
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Đang đọc thông tin từ ảnh thẻ sinh viên
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
                  onImageSelect={handleImageSelect("front")}
                  selectedImage={studentCardImages.front}
                  error={errors.student_card_front}
                  side="front"
                />
                <ImageUpload
                  label="Thẻ sinh viên - Mặt sau"
                  onImageSelect={handleImageSelect("back")}
                  selectedImage={studentCardImages.back}
                  error={errors.student_card_back}
                  side="back"
                />
              </div>

              {/* Status Summary */}
              <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex items-center">
                    <div
                      className={`mr-2 h-3 w-3 rounded-full ${studentCardImages.front ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Mặt trước {studentCardImages.front ? "✓" : "○"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`mr-2 h-3 w-3 rounded-full ${studentCardImages.back ? "bg-orange-500" : "bg-gray-300"}`}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Mặt sau {studentCardImages.back ? "✓" : "○"}
                    </span>
                  </div>
                </div>
                {studentCardImages.front && studentCardImages.back && (
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
          <form>
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
                          value={formData.university}
                          onChange={(e) =>
                            handleInputChange("university", e.target.value)
                          }
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
                      value={formData.student_id}
                      onChange={(e) =>
                        handleInputChange("student_id", e.target.value)
                      }
                      placeholder="Nhập mã số sinh viên"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <FormField label="Mã lớp" icon={Users} error={errors.class_id}>
                    <input
                      type="text"
                      value={formData.class_id}
                      onChange={(e) =>
                        handleInputChange("class_id", e.target.value)
                      }
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
                        value={formData.faculty_name}
                        onChange={(e) =>
                          handleInputChange("faculty_name", e.target.value)
                        }
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
                      value={formData.year_of_study}
                      onChange={(e) =>
                        handleInputChange(
                          "year_of_study",
                          parseInt(e.target.value) || 1,
                        )
                      }
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
                        value={formData.major_name}
                        onChange={(e) =>
                          handleInputChange("major_name", e.target.value)
                        }
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
                    disabled={isUploading}
                    className="relative rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUploading ? (
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

