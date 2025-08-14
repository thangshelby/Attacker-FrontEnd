import React, { useState, useEffect, useMemo } from "react";
import { CheckCircle, Eye, X, Trash2 } from "lucide-react";
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
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
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
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
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
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
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
            <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
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
              className="absolute -top-2 -right-2 z-10 rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
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
              <p className="text-xs text-gray-500">{transcript.file?.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TranscriptItem;
