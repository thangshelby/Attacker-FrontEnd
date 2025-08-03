import React, { useState } from "react";
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
  Upload,
  Camera,
  FileImage,
  Loader2,
  Info,
} from "lucide-react";

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

const UserProfile = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({
    front: null,
    back: null
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentUploadSide, setCurrentUploadSide] = useState('front'); // 'front' or 'back'
  const [formData, setFormData] = useState({
    name: "Nguyễn Văn A",
    citizen_id: "123456789",
    email: "nguyenvana@email.com",
    phone: "0123456789",
    birth: "1990-01-01",
    gender: "male",
    address: "123 Nguyễn Văn Cừ, Q.5, TP.HCM",
  });
  const [errors, setErrors] = useState({});

  // Mock OCR processing function
  const processIdCard = async (file, side) => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock image URL for display
    const mockImageUrl = side === 'front' 
      ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%234f46e5'/%3E%3Ctext x='50%25' y='30%25' fill='white' text-anchor='middle' font-size='16' font-family='Arial'%3ECĂN CƯỚC CÔNG DÂN%3C/text%3E%3Ctext x='50%25' y='50%25' fill='white' text-anchor='middle' font-size='12'%3EMặt trước%3C/text%3E%3Ctext x='50%25' y='70%25' fill='white' text-anchor='middle' font-size='10'%3EDemo Image%3C/text%3E%3C/svg%3E"
      : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%236366f1'/%3E%3Ctext x='50%25' y='30%25' fill='white' text-anchor='middle' font-size='16' font-family='Arial'%3ECĂN CƯỚC CÔNG DÂN%3C/text%3E%3Ctext x='50%25' y='50%25' fill='white' text-anchor='middle' font-size='12'%3EMặt sau%3C/text%3E%3Ctext x='50%25' y='70%25' fill='white' text-anchor='middle' font-size='10'%3EDemo Image%3C/text%3E%3C/svg%3E";
    
    setUploadedImages(prev => ({
      ...prev,
      [side]: mockImageUrl
    }));
    
    // Mock extracted data only from front side
    if (side === 'front') {
      const mockData = {
        name: "Nguyễn Thị Lan",
        citizen_id: "079199001234",
        birth: "1999-05-15",
        gender: "female",
        address: "Số 45 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      };
      
      setFormData(prev => ({
        ...prev,
        ...mockData
      }));
    }
    
    setIsProcessing(false);
    setShowUploadModal(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert("Chỉ chấp nhận file ảnh định dạng JPG, JPEG, PNG");
        return;
      }
      
      processIdCard(file, currentUploadSide);
    }
  };

  const openUploadModal = (side) => {
    setCurrentUploadSide(side);
    setShowUploadModal(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = { message: "Họ tên không được để trống" };
    }
    
    if (!formData.email.trim()) {
      newErrors.email = { message: "Email không được để trống" };
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = { message: "Email không hợp lệ" };
    }
    
    if (formData.citizen_id && (formData.citizen_id.length < 9 || formData.citizen_id.length > 12)) {
      newErrors.citizen_id = { message: "CMND/CCCD phải có từ 9-12 chữ số" };
    }
    
    if (formData.phone && formData.phone.length < 10) {
      newErrors.phone = { message: "Số điện thoại phải có ít nhất 10 chữ số" };
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
    // Simulate API call
    console.log("Updating profile:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Upload Instructions Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 max-w-[1000px] rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                Upload {currentUploadSide === 'front' ? 'Mặt Trước' : 'Mặt Sau'} CCCD
              </h3>
              
              <div className="mb-6 space-y-3 text-left text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start">
                  <Info className="mr-2 h-4 w-4 mt-0.5 text-blue-500" />
                  <span>
                    {currentUploadSide === 'front' 
                      ? 'Mặt trước: Có ảnh và thông tin cá nhân' 
                      : 'Mặt sau: Có địa chỉ thường trú và đặc điểm nhận dạng'
                    }
                  </span>
                </div>
                <div className="flex items-start">
                  <Info className="mr-2 h-4 w-4 mt-0.5 text-blue-500" />
                  <span>Chụp rõ nét, đầy đủ 4 góc của thẻ</span>
                </div>
                <div className="flex items-start">
                  <Info className="mr-2 h-4 w-4 mt-0.5 text-blue-500" />
                  <span>Đảm bảo ánh sáng đủ, không bị mờ hoặc chói</span>
                </div>
                <div className="flex items-start">
                  <Info className="mr-2 h-4 w-4 mt-0.5 text-blue-500" />
                  <span>Định dạng: JPG, JPEG, PNG (tối đa 5MB)</span>
                </div>
                <div className="flex items-start">
                  <Info className="mr-2 h-4 w-4 mt-0.5 text-blue-500" />
                  <span>
                    {currentUploadSide === 'front' 
                      ? 'Thông tin sẽ được tự động điền vào form' 
                      : 'Upload để xác thực thông tin CCCD'
                    }
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block cursor-pointer rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-6 text-center transition-colors hover:border-indigo-400 hover:bg-indigo-100 dark:border-indigo-600 dark:bg-indigo-900/20">
                  <FileImage className="mx-auto mb-2 h-8 w-8 text-indigo-500" />
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    Chọn ảnh từ thiết bị
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="w-full rounded-xl bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Đang xử lý {currentUploadSide === 'front' ? 'mặt trước' : 'mặt sau'}...
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vui lòng đợi trong giây lát
              </p>
              {uploadedImages[currentUploadSide] && (
                <div className="mt-4">
                  <img 
                    src={uploadedImages[currentUploadSide]} 
                    alt={`ID ${currentUploadSide}`} 
                    className="mx-auto h-24 w-auto rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="mx-4 w-[400px] rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-6 text-lg font-semibold leading-relaxed text-gray-800 dark:text-gray-200">
                Bạn có chắc muốn cập nhật thông tin này?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmUpdate}
                  className="min-w-[80px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 font-medium text-white transition-colors hover:from-indigo-600 hover:to-purple-700"
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
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
            Cập Nhật Thông Tin Cá Nhân
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Cập nhật thông tin để hoàn tất hồ sơ của bạn
          </p>
        </div>

        {/* OCR Upload Section */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-4">
            <h2 className="flex items-center text-lg font-semibold text-white">
              <Camera className="mr-2 h-5 w-5" />
              Tự động điền thông tin từ CCCD
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Front Side Upload */}
              <div className="space-y-3">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Mặt Trước
                  </h3>
                  {uploadedImages.front ? (
                    <div className="mb-3">
                      <img 
                        src={uploadedImages.front} 
                        alt="CCCD mặt trước" 
                        className="mx-auto h-32 w-auto rounded-lg border-2 border-green-200 object-cover shadow-md"
                      />
                      <div className="mt-2 flex items-center justify-center text-sm text-green-600">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Đã upload
                      </div>
                    </div>
                  ) : null}
                  <button
                    onClick={() => openUploadModal('front')}
                    className={`inline-flex items-center rounded-xl px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl ${
                      uploadedImages.front 
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700' 
                        : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700'
                    }`}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {uploadedImages.front ? 'Thay đổi ảnh' : 'Upload mặt trước'}
                  </button>
                </div>
              </div>

              {/* Back Side Upload */}
              <div className="space-y-3">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-500">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Mặt Sau
                  </h3>
                  {uploadedImages.back ? (
                    <div className="mb-3">
                      <img 
                        src={uploadedImages.back} 
                        alt="CCCD mặt sau" 
                        className="mx-auto h-32 w-auto rounded-lg border-2 border-purple-200 object-cover shadow-md"
                      />
                      <div className="mt-2 flex items-center justify-center text-sm text-purple-600">
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Đã upload
                      </div>
                    </div>
                  ) : null}
                  <button
                    onClick={() => openUploadModal('back')}
                    className={`inline-flex items-center rounded-xl px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl ${
                      uploadedImages.back 
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
                    }`}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {uploadedImages.back ? 'Thay đổi ảnh' : 'Upload mặt sau'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Status Summary */}
            <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <div className={`mr-2 h-3 w-3 rounded-full ${uploadedImages.front ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mặt trước {uploadedImages.front ? '✓' : '○'}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`mr-2 h-3 w-3 rounded-full ${uploadedImages.back ? 'bg-purple-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mặt sau {uploadedImages.back ? '✓' : '○'}
                  </span>
                </div>
              </div>
              {uploadedImages.front && uploadedImages.back && (
                <div className="mt-2 text-center">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    CCCD đã được upload đầy đủ
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div>
          <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/80">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
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
                  error={errors.name}
                  required
                >
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Nhập họ và tên"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Căn cước công dân"
                  icon={CreditCard}
                  error={errors.citizen_id}
                >
                  <input
                    type="text"
                    value={formData.citizen_id}
                    onChange={(e) => handleInputChange('citizen_id', e.target.value)}
                    placeholder="Nhập số căn cước công dân"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Email"
                  icon={Mail}
                  error={errors.email}
                  required
                >
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Nhập địa chỉ email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Số điện thoại"
                  icon={Phone}
                  error={errors.phone}
                >
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField
                  label="Ngày sinh"
                  icon={Calendar}
                  error={errors.birth}
                >
                  <input
                    type="date"
                    value={formData.birth}
                    onChange={(e) => handleInputChange('birth', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField label="Giới tính" icon={User} error={errors.gender}>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                    error={errors.address}
                  >
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Nhập địa chỉ đầy đủ"
                      rows={3}
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                  className="relative cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50"
                >
                  <div className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Cập nhật thông tin
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;