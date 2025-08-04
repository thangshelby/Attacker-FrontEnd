import React, { useState, useCallback } from "react";
import { CheckCircle, Camera, Upload, X } from "lucide-react";
import { uploadImage } from "@/utils";

// Image Upload Component
const ImageUpload = ({
  label,
  onImageSelect,
  selectedImage,
  setIsProcessing,
  side,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));
      if (imageFile) {
        if (imageFile.size > 10 * 1024 * 1024) {
          alert("Kích thước file không được vượt quá 10MB");
          return;
        }
        setIsProcessing(true, side);
        const imageUploaded = await uploadImage(imageFile);
        onImageSelect(imageUploaded.url);
      }
    },
    [onImageSelect],
  );

  const handleFileSelect = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        if (file.size > 10 * 1024 * 1024) {
          alert("Kích thước file không được vượt quá 10MB");
          return;
        }
        setIsProcessing(true, side);
        const imageUploaded = await uploadImage(file);
        onImageSelect(imageUploaded.url);
      }
    },
    [onImageSelect],
  );

  const removeImage = useCallback(() => {
    onImageSelect(null);
  }, [onImageSelect]);

  const onSubmit = () => {};
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
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700">
          <div className="relative flex items-center justify-between">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            <div className="flex items-center space-x-3">
              <img
                className="h-full w-full rounded-lg object-cover"
                src={selectedImage}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="z-50 bg-gray-50 px-6 py-4 dark:bg-gray-700/50">
            <div className="flex justify-start space-x-3">
              <button
                type="button"
                onClick={removeImage}
                className="cursor-pointer rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                <X className="mr-2 inline h-4 w-4" />
                Hủy bỏ
              </button>
              {/* <button
                type="submit"
                onClick={onSubmit}
                className="relative rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50"
              >
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Lưu thông tin
                </div>
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
