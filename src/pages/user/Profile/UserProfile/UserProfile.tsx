import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Save,
  X,
  Info,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "@/components/shared/ImageUpload";
import { useAuth } from "@/hooks/useAuth";
import FormField from "@/components/shared/FormField";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useUpdateUser } from "@/hooks/useUser";

const formSchema = z.object({
  name: z.string(),
  citizen_id: z.string(),
  phone: z.string(),
  email: z.string(),
  number: z.string(),
  birth: z.string(),
  gender: z.string(),
  address: z.string(),
  citizen_card_front: z.string().nullable().optional(),
  citizen_card_back: z.string().nullable().optional(),
});
const UserProfile = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProcessingSide, setCurrentProcessingSide] = useState<
    string | null
  >(null);
  const { user, isLoading } = useAuth();
  const { updateUser, updateUserLoading } = useUpdateUser();

  // Show loading state if user data is not available

  // Use user from useAuth instead of empty object
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      citizen_id: "",
      email: "",
      phone: "",
      birth: "",
      gender: "male",
      address: "",
      citizen_card_front: null,
      citizen_card_back: null,
    },
  });
  const watchedValues = watch();

  // Reset form để tránh hardcode data - chạy ngay khi component mount
  useEffect(() => {
    console.log("Reset form về trống");
    
    // ✅ Format birth date for input[type="date"]
    const formatDate = (dateString: string | Date) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    };
    
    reset({
      name: user?.name || "",
      citizen_id: user?.citizen_id ||  "",
      email: user?.email || "",
      phone: user?.phone || "",
      birth: formatDate(user?.birth || ""),
      gender: user?.gender || "male",
      address: user?.address || "",
      citizen_card_front: user?.citizen_card_front || null,
      citizen_card_back: user?.citizen_card_back || null,
    });
  }, [user]); // ✅ Add user dependency to re-run when user data loads

  // Function extract OCR data từ file trực tiếp
  const extractOCRData = async (file: File) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log("GEMINI_API_KEY:", apiKey ? "Có" : "KHÔNG CÓ");

      if (!apiKey) {
        console.error(
          "Thiếu GEMINI_API_KEY! Tạo file .env với VITE_GEMINI_API_KEY=your_key",
        );
        return null;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Convert file to base64 - giới hạn kích thước để tránh stack overflow
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        console.error("File quá lớn, vui lòng chọn file nhỏ hơn 5MB");
        return null;
      }

      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Convert từng chunk để tránh stack overflow
      let base64Image = "";
      for (let i = 0; i < uint8Array.length; i++) {
        base64Image += String.fromCharCode(uint8Array[i]);
      }
      base64Image = btoa(base64Image);

      const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: file.type,
        },
      };

      const result = await model.generateContent([
        'Extract Vietnamese citizen ID information from this image. Return only JSON format with these fields: name, citizen_id, birth_date, gender, address. Example: {"name": "Nguyen Van A", "citizen_id": "123456789012", "birth_date": "1990-01-01", "gender": "Nam", "address": "123 Duong ABC, Quan XYZ, TP Ho Chi Minh"}',
        imagePart,
      ]);

      const response = await result.response;
      const text = response.text();

      // Remove markdown code blocks nếu có
      let jsonText = text;
      if (text.includes("```json")) {
        jsonText = text
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
      }

      const ocrData = JSON.parse(jsonText);
      console.log("OCR Result:", ocrData);
      return ocrData;
    } catch (error) {
      console.error("OCR Error:", error);
      return null;
    }
  };

  const handleImageSelect =
    (side: "citizen_card_front" | "citizen_card_back") =>
    async (imageUrl: string | null, file?: File) => {
      setValue(side, imageUrl);
      setIsProcessing(false);
      setCurrentProcessingSide(null);

      // Extract OCR data nếu là mặt trước CCCD và có file
      if (file && side === "citizen_card_front") {
        try {
          console.log("Đang extract OCR data từ file:", file.name);
          console.log(
            "GEMINI_API_KEY có sẵn:",
            !!import.meta.env.VITE_GEMINI_API_KEY,
          );

          const ocrData = await extractOCRData(file);

          if (ocrData) {
            console.log("OCR thành công:", ocrData);
            // Tự động điền form với OCR data
            setValue("name", ocrData.name || "");
            setValue("citizen_id", ocrData.citizen_id || "");
            setValue("birth", ocrData.birth_date || "");
            setValue("gender", ocrData.gender === "Nam" ? "male" : "female");
            setValue("address", ocrData.address || "");

            console.log("OCR Data auto-filled:", ocrData);

            // Upload lên Cloudinary sau khi OCR thành công (optional)
            try {
              const { uploadImage } = await import("@/utils");
              const imageUploaded = await uploadImage(file);
              console.log(
                "Upload lên Cloudinary thành công:",
                imageUploaded.url,
              );
              // Có thể lưu URL này vào database nếu cần
            } catch (uploadError) {
              console.log("Không upload lên Cloudinary:", uploadError);
            }
          } else {
            console.log("OCR trả về null - có thể do lỗi API key hoặc network");
          }
        } catch (error) {
          console.error("Lỗi khi extract OCR:", error);
          alert(
            "Lỗi khi xử lý OCR. Vui lòng thử lại với ảnh khác hoặc kiểm tra kết nối mạng.",
          );
        }
      }
    };

  const onSubmit = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmModal(false);

    try {
      console.log('🚀 UserProfile - Updating user with data:', watchedValues);
      console.log('👤 Current user:', user);
      console.log('🆔 User ID to send:', user?._id);
      
      const payload = {
        _id: user?._id,
        ...watchedValues,
      };
      console.log('📦 Final payload:', payload);
      
      await updateUser(payload);
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };
  const handleProcessCitizenCard = (val: boolean, side: string) => {
    setIsProcessing(val);
    setCurrentProcessingSide(side);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-t-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Đang tải thông tin người dùng...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Đang xử lý thẻ căn cước công dân{" "}
                {currentProcessingSide === "citizen_card_front"
                  ? "mặt trước"
                  : "mặt sau"}
                ...
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đang đọc thông tin từ ảnh can cước công dân của bạn. Vui lòng
                đợi
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
            Cập Nhật Thông Tin Cá Nhân
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Cập nhật thông tin để hoàn tất hồ sơ của bạn
          </p>
        </div>

        {/* Citizen Card Upload Section */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
          <div className="bg-gradient-to-r from-orange-500 to-pink-600 px-6 py-4">
            <h2 className="flex items-center text-lg font-semibold text-white">
              <CreditCard className="mr-2 h-5 w-5" />
              Tự động điền thông tin từ thẻ căn cước công dân
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex items-start space-x-3">
                <Info className="mt-0.5 h-5 w-5 text-blue-500" />
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p className="mb-1 font-medium">
                    Lưu ý khi chụp thẻ căn cước công dân:
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• Chụp rõ nét, đầy đủ 4 góc thẻ căn cước công dân</li>
                    <li>• Đảm bảo ánh sáng đủ, không bị mờ hoặc phản quang</li>
                    <li>
                      • Mặt trước có ảnh và thông tin cá nhân, bao gồm họ tên,
                      ngày sinh, số căn cước
                    </li>
                    <li>• Mặt sau có thông tin về địa chỉ và nơi cấp</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ImageUpload
                label="Thẻ căn cước công dân - Mặt trước"
                onImageSelect={handleImageSelect("citizen_card_front")}
                selectedImage={watchedValues.citizen_card_front}
                setIsProcessing={handleProcessCitizenCard}
                side="citizen_card_front"
              />
              <ImageUpload
                label="Thẻ căn cước công dân - Mặt sau"
                onImageSelect={handleImageSelect("citizen_card_back")}
                selectedImage={watchedValues.citizen_card_back}
                setIsProcessing={handleProcessCitizenCard}
                side="citizen_card_back"
              />
            </div>

            {/* Status Summary */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div
                    className={`mr-2 h-3 w-3 rounded-full ${
                      watchedValues.citizen_card_front
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mặt trước {watchedValues.citizen_card_front ? "✓" : "○"}
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`mr-2 h-3 w-3 rounded-full ${
                      watchedValues.citizen_card_back
                        ? "bg-orange-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mặt sau {watchedValues.citizen_card_back ? "✓" : "○"}
                  </span>
                </div>
              </div>
              {watchedValues.citizen_card_front &&
                watchedValues.citizen_card_back && (
                  <div className="mt-2 text-center">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Thẻ căn cước công dân đã được upload đầy đủ
                    </span>
                  </div>
                )}
            </div>
          </div>
        </div>
        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <h2 className="flex items-center text-lg font-semibold text-white">
                <User className="mr-2 h-5 w-5" />
                Thông tin cá nhân
              </h2>
            </div>

            <div className="space-y-6 p-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <FormField
                  label="Họ và tên"
                  icon={User}
                  error={
                    errors.name?.message
                      ? { message: errors.name.message }
                      : undefined
                  }
                  required
                >
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Nhập họ và tên"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Căn cước công dân"
                  icon={CreditCard}
                  error={
                    errors.citizen_id?.message
                      ? { message: errors.citizen_id.message }
                      : undefined
                  }
                >
                  <input
                    type="text"
                    {...register("citizen_id")}
                    placeholder="Nhập số căn cước công dân"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Email"
                  icon={Mail}
                  error={
                    errors.email?.message
                      ? { message: errors.email.message }
                      : undefined
                  }
                  required
                >
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Nhập địa chỉ email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Số điện thoại"
                  icon={Phone}
                  error={
                    errors.phone?.message
                      ? { message: errors.phone.message }
                      : undefined
                  }
                >
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="Nhập số điện thoại"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Ngày sinh"
                  icon={Calendar}
                  error={
                    errors.birth?.message
                      ? { message: errors.birth.message }
                      : undefined
                  }
                >
                  <input
                    type="date"
                    {...register("birth")}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Giới tính"
                  icon={User}
                  error={
                    errors.gender?.message
                      ? { message: errors.gender.message }
                      : undefined
                  }
                >
                  <select
                    {...register("gender")}
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="others">Khác</option>
                  </select>
                </FormField>

                <div className="lg:col-span-2">
                  <FormField
                    label="Địa chỉ"
                    icon={MapPin}
                    error={
                      errors.address?.message
                        ? { message: errors.address.message }
                        : undefined
                    }
                  >
                    <textarea
                      {...register("address")}
                      placeholder="Nhập địa chỉ đầy đủ"
                      rows={3}
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-6 py-4 dark:bg-gray-700/50">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="cursor-pointer rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                >
                  <X className="mr-2 inline h-4 w-4" />
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={updateUserLoading}
                  onClick={() => {
                    onSubmit();
                  }}
                  className="relative cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updateUserLoading ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Đang cập nhật...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="mr-2 h-4 w-4" />
                      Cập nhật thông tin
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

export default UserProfile;
