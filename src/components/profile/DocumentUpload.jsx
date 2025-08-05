import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Plus,
  FileText,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  Eye,
  Trash2,
  Award,
  Users,
  GraduationCap,
} from "lucide-react";

// Document types configuration
const DOCUMENT_TYPES = {
  transcript: {
    label: "Bảng điểm",
    icon: FileText,
    color: "indigo",
    fields: {
      semester: {
        label: "Học kỳ",
        type: "select",
        options: [
          { value: "", label: "Chọn học kỳ" },
          { value: "HK1", label: "Học kỳ 1" },
          { value: "HK2", label: "Học kỳ 2" },
          { value: "HK3", label: "Học kỳ 3 (Hè)" },
        ],
      },
      year: {
        label: "Năm học",
        type: "year-select",
      },
    },
  },
  personal_achievement: {
    label: "Thành tích cá nhân",
    icon: Award,
    color: "emerald",
    fields: {
      title: {
        label: "Tên thành tích",
        type: "text",
        placeholder: "VD: Sinh viên xuất sắc năm 2024",
      },
      level: {
        label: "Cấp độ",
        type: "select",
        options: [
          { value: "", label: "Chọn cấp độ" },
          { value: "school", label: "Cấp trường" },
          { value: "district", label: "Cấp quận/huyện" },
          { value: "city", label: "Cấp thành phố" },
          { value: "national", label: "Cấp quốc gia" },
          { value: "international", label: "Cấp quốc tế" },
        ],
      },
      date: {
        label: "Ngày nhận",
        type: "date",
      },
      organization: {
        label: "Tổ chức trao tặng",
        type: "text",
        placeholder: "VD: Trường Đại học ABC",
      },
    },
  },

  social_activity: {
    label: "Hoạt động xã hội",
    icon: Users,
    color: "blue",
    fields: {
      activityName: {
        label: "Tên hoạt động",
        type: "text",
        placeholder: "VD: Tình nguyện mùa hè xanh",
      },
      role: {
        label: "Vai trò",
        type: "select",
        options: [
          { value: "", label: "Chọn vai trò" },
          { value: "leader", label: "Trưởng nhóm" },
          { value: "member", label: "Thành viên" },
          { value: "volunteer", label: "Tình nguyện viên" },
          { value: "organizer", label: "Ban tổ chức" },
        ],
      },
      duration: {
        label: "Thời gian tham gia",
        type: "text",
        placeholder: "VD: 3 tháng, 2 tuần",
      },
      location: {
        label: "Địa điểm",
        type: "text",
        placeholder: "VD: Tỉnh Lào Cai",
      },
      organization: {
        label: "Tổ chức",
        type: "text",
        placeholder: "VD: Đoàn trường",
      },
    },
  },

  scholarship: {
    label: "Học bổng",
    icon: GraduationCap,
    color: "rose",
    fields: {
      scholarshipName: {
        label: "Tên học bổng",
        type: "text",
        placeholder: "VD: Học bổng khuyến khích học tập",
      },
      amount: {
        label: "Số tiền",
        type: "number",
        placeholder: "VD: 5000000",
      },
      provider: {
        label: "Đơn vị cấp",
        type: "text",
        placeholder: "VD: Quỹ học bổng Viettel",
      },
      academicYear: {
        label: "Năm học",
        type: "year-select",
      },
      criteria: {
        label: "Tiêu chí",
        type: "text",
        placeholder: "VD: Thành tích học tập xuất sắc",
      },
    },
  },
};

const DocumentUpload = ({
  documents = [],
  onDocumentsChange,
  errors,
  documentType = "transcript",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const config = DOCUMENT_TYPES[documentType];
  const IconComponent = config.icon;

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
      const imageFiles = files.filter((file) => file.type.startsWith("image/"));

      if (imageFiles.length === 0) return;

      const validFiles = imageFiles.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} vượt quá 10MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        const newDocuments = validFiles.map((file) => {
          const url = URL.createObjectURL(file);
          return {
            id: Date.now() + Math.random(),
            url: url,
            file: file,
            name: file.name,
            type: documentType,
            // Initialize fields based on document type
            ...Object.keys(config.fields).reduce((acc, fieldKey) => {
              const field = config.fields[fieldKey];
              if (field.type === "year-select") {
                acc[fieldKey] = new Date().getFullYear();
              } else {
                acc[fieldKey] = "";
              }
              return acc;
            }, {}),
          };
        });

        onDocumentsChange([...documents, ...newDocuments]);
      }
    },
    [documents, onDocumentsChange, documentType, config.fields],
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
      e.target.value = "";
    },
    [addFiles],
  );

  const removeDocument = useCallback(
    (id) => {
      const documentToRemove = documents.find((doc) => doc.id === id);
      if (documentToRemove && documentToRemove.url) {
        URL.revokeObjectURL(documentToRemove.url);
      }

      const newDocuments = documents.filter((d) => d.id !== id);
      onDocumentsChange(newDocuments);

      if (currentImageIndex >= newDocuments.length && newDocuments.length > 0) {
        setCurrentImageIndex(newDocuments.length - 1);
      } else if (newDocuments.length === 0) {
        setCurrentImageIndex(0);
      }
    },
    [documents, onDocumentsChange, currentImageIndex],
  );

  const updateDocument = useCallback(
    (id, field, value) => {
      onDocumentsChange(
        documents.map((d) => (d.id === id ? { ...d, [field]: value } : d)),
      );
    },
    [documents, onDocumentsChange],
  );

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : documents.length - 1,
    );
  }, [documents.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev < documents.length - 1 ? prev + 1 : 0,
    );
  }, [documents.length]);

  const goToImage = useCallback((index) => {
    setCurrentImageIndex(index);
  }, []);

  // Render upload area when no documents
  if (documents.length === 0) {
    return (
      <div className="space-y-6">
        <div
          className={`relative rounded-xl border-2 border-dashed transition-all duration-200 ${
            isDragging
              ? `border-${config.color}-500 bg-${config.color}-50 dark:bg-${config.color}-900/20`
              : "border-gray-300 hover:border-gray-400 dark:border-gray-600"
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
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-${config.color}-100 dark:bg-${config.color}-900/30`}
            >
              <IconComponent className={`h-8 w-8 text-${config.color}-500`} />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Kéo thả {config.label.toLowerCase()} vào đây hoặc nhấn để chọn
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PNG, JPG, JPEG (tối đa 10MB mỗi file) - Có thể chọn nhiều file
              </p>
            </div>
            <button
              type="button"
              className={`inline-flex items-center rounded-lg bg-${config.color}-50 px-4 py-2 text-sm font-medium text-${config.color}-700 hover:bg-${config.color}-100 dark:bg-${config.color}-900/30 dark:text-${config.color}-300 dark:hover:bg-${config.color}-900/50`}
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm {config.label.toLowerCase()}
            </button>
          </div>
        </div>

        {errors && (
          <div className="flex items-center text-sm text-red-600">
            <AlertCircle className="mr-1 h-4 w-4" />
            {errors.message}
          </div>
        )}
      </div>
    );
  }

  // Render document gallery when documents exist
  return (
    <div className="space-y-6">
      {/* Header with count and add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            <IconComponent
              className={`mr-2 h-5 w-5 text-${config.color}-500`}
            />
            {config.label} đã upload
            <span className="ml-2 text-sm font-bold text-green-400">
              {documents.length}
            </span>
          </h4>
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Sẵn sàng xử lý
          </span>
        </div>

        <div className="relative">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            id="add-more-files"
          />
          <label
            htmlFor="add-more-files"
            className={`inline-flex cursor-pointer items-center rounded-lg bg-${config.color}-50 px-4 py-2 text-sm font-medium text-${config.color}-700 hover:bg-${config.color}-100 dark:bg-${config.color}-900/30 dark:text-${config.color}-300 dark:hover:bg-${config.color}-900/50`}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm ảnh
          </label>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img
            src={documents[currentImageIndex]?.url}
            alt={`${config.label} ${currentImageIndex + 1}`}
            className="h-96 w-full object-contain"
          />

          {/* Remove button */}
          <button
            onClick={() => removeDocument(documents[currentImageIndex]?.id)}
            className="absolute top-4 right-4 rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Navigation buttons */}
          {documents.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {currentImageIndex + 1} / {documents.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {documents.length > 1 && (
          <div className="mt-4 flex justify-center space-x-2 overflow-x-auto pb-2">
            {documents.map((document, index) => (
              <button
                key={document.id}
                onClick={() => goToImage(index)}
                className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  index === currentImageIndex
                    ? `border-${config.color}-500`
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={document.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current document details */}
      {documents[currentImageIndex] && (
        <DocumentItem
          document={documents[currentImageIndex]}
          index={currentImageIndex}
          onRemove={removeDocument}
          onUpdate={updateDocument}
          config={config}
        />
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

const DocumentItem = ({ document, index, onRemove, onUpdate, config }) => {
  const [showPreview, setShowPreview] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 10 }, (_, i) => currentYear - i),
    [currentYear],
  );

  const renderField = (fieldKey, fieldConfig) => {
    const value = document[fieldKey] || "";

    switch (fieldConfig.type) {
      case "text":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onUpdate(document.id, fieldKey, e.target.value)}
            placeholder={fieldConfig.placeholder}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onUpdate(document.id, fieldKey, e.target.value)}
            placeholder={fieldConfig.placeholder}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onUpdate(document.id, fieldKey, e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
        );

      case "select":
        return (
          <select
            value={value}
            onChange={(e) => onUpdate(document.id, fieldKey, e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {fieldConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "year-select":
        return (
          <select
            value={value}
            onChange={(e) =>
              onUpdate(document.id, fieldKey, parseInt(e.target.value, 10))
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-600 dark:bg-gray-700">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${config.color}-100 dark:bg-${config.color}-900`}
            >
              <config.icon
                className={`h-5 w-5 text-${config.color}-600 dark:text-${config.color}-400`}
              />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {config.label} #{index + 1}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {document.name}
              </p>
            </div>
          </div>

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
              onClick={() => onRemove(document.id)}
              className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
              title="Xóa"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dynamic form fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(config.fields).map(([fieldKey, fieldConfig]) => (
            <div key={fieldKey}>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                {fieldConfig.label}
              </label>
              {renderField(fieldKey, fieldConfig)}
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-h-[90vh] max-w-[90vw] rounded-xl bg-white p-4 dark:bg-gray-800">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-2 -right-2 z-10 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
              aria-label="Đóng xem trước"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={document.url}
              alt={`${config.label} ${index + 1}`}
              className="max-h-[80vh] max-w-full rounded-lg object-contain"
            />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {config.label} #{index + 1}
              </p>
              <p className="text-xs text-gray-500">{document.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Demo component
const DocumentUploadDemo = () => {
  const [currentType, setCurrentType] = useState("transcript");
  const [documents, setDocuments] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quản lý Tài liệu Sinh viên
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Upload và quản lý các loại tài liệu khác nhau
          </p>
        </div>

        {/* Document type selector */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Chọn loại tài liệu
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {Object.entries(DOCUMENT_TYPES).map(([key, config]) => {
              const IconComponent = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentType(key);
                    setDocuments([]);
                  }}
                  className={`flex flex-col items-center rounded-lg border p-4 text-center transition-colors ${
                    currentType === key
                      ? `border-${config.color}-500 bg-${config.color}-50 text-${config.color}-700 dark:bg-${config.color}-900/30 dark:text-${config.color}-300`
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  <IconComponent className="mb-2 h-6 w-6" />
                  <span className="text-xs font-medium">{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Document upload component */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <DocumentUpload
            documents={documents}
            onDocumentsChange={setDocuments}
            documentType={currentType}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadDemo;
