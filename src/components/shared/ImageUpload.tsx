import React, { useState, useCallback } from "react";
import { CheckCircle, Camera, Upload, X } from "lucide-react";

// Mock upload function for demo
const uploadImage = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      resolve({ url });
    }, Math.random() * 2000 + 500); // Random delay between 0.5s and 2.5s
  });
};

// Image Upload Component
const ImageUpload = ({
  label = "Upload Image",
  onImageSelect = () => {},
  selectedImage,
  setIsProcessing = () => {},
  side = "left",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isScanSuccess, setIsScanSuccess] = useState(false);


  const handleScan = () => {
    if (selectedImage) {
      setIsScanning(true);
      // Stop scanning after animation completes
      const timer = setTimeout(
        () => {
          setIsScanning(false);
          setIsScanSuccess(true);
          setIsProcessing(false, side);
        },
        Math.random() * 4000 + 1500,
      ); // Random duration between 1s and 3s

      return () => clearTimeout(timer);
    }
  };

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
    [onImageSelect, setIsProcessing, side],
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
    [onImageSelect, setIsProcessing, side],
  );

  const removeImage = useCallback(() => {
    setIsProcessing(false, side);
    setIsScanSuccess(false);
    setIsScanning(false);
    setIsDragging(false);
    onImageSelect(null);
    setIsScanning(false);
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
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-700">
          <div className="relative overflow-hidden rounded-lg">
            {/* Image Container */}
            <div className="relative">
              <img
                className="h-64 w-full rounded-lg object-cover"
                src={selectedImage}
                alt="Uploaded"
              />

              {/* Scan Effect Overlay */}
              {isScanning && (
                <>
                  {/* Scan line */}
                  <div
                    className="animate-scan-line absolute right-0 left-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
                    style={{
                      boxShadow:
                        "0 0 20px #00bcd4, 0 0 40px #00bcd4, 0 0 60px #00bcd4",
                      animation: "scanLine 2s ease-in-out infinite",
                    }}
                  />

                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Corner brackets */}
                  <div className="absolute top-2 left-2 h-6 w-6 animate-pulse border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-2 right-2 h-6 w-6 animate-pulse border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-2 left-2 h-6 w-6 animate-pulse border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute right-2 bottom-2 h-6 w-6 animate-pulse border-r-2 border-b-2 border-cyan-400" />

                  {/* Scanning text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="bg-opacity-70 animate-pulse rounded bg-black px-3 py-1 font-mono text-sm text-cyan-400">
                      SCANNING...
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 rounded-lg bg-gray-50 px-6 py-4 dark:bg-gray-700/50">
            <div className="flex justify-start space-x-3">
              <button
                type="button"
                onClick={removeImage}
                disabled={isScanning}
                className={`cursor-pointer rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 ${
                  isScanning ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <X className="mr-2 inline h-4 w-4" />
                Hủy bỏ
              </button>

              {(
                <button
                  onClick={handleScan}
                  disabled={!selectedImage || isScanSuccess}
                  type="button"
                  className={`relative rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white ${isScanSuccess ? "cursor-not-allowed opacity-50" : "cursor-pointer shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 hover:opacity-90 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-white dark:hover:bg-indigo-600 dark:focus:ring-indigo-500/20 dark:focus:ring-offset-gray-800"} `}
                >
                  <p className="flex items-center">
                    {isScanSuccess && <CheckCircle className="mr-2 h-4 w-4" />}
                    Scan thông tin
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for scan animation */}
      <style jsx>{`
        @keyframes scanLine {
          0% {
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;