import React, { useState } from 'react';
import Button from '../../../components/elements/Button';

const Profiles = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    phone: '',
    school: '',
    studentId: '',
    district: '',
    address: '',
    field: '',
    familyIncome: '',
    guardian: '',
    securityQuestion: ''
  });

  const [notification, setNotification] = useState(null); // Thêm trạng thái thông báo
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Thêm trạng thái modal xác nhận

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true); // Hiển thị modal xác nhận
  };

  const handleConfirmUpdate = () => {
    const isSuccess = 1 // trạng thái cập nhật thông tin
    if (isSuccess) {
      setNotification('Cập nhật thông tin thành công');
    } else {
      setNotification('Cập nhật thông tin thất bại. Vui lòng thử lại!');
    }
    setShowConfirmModal(false); 
    
  };

  return (
    <>
      {/* Modal xác nhận - Di chuyển ra ngoài container chính */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">
                Bạn có chắc muốn cập nhật thông tin này?
              </h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleConfirmUpdate}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors min-w-[80px]"
                >
                  Có
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors min-w-[80px]"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50" style={{ overflow: 'visible' }}>
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
          {notification && (
            <div className={`p-4 mb-4 text-center rounded-lg ${notification.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {notification}
            </div>
          )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Họ và tên */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Họ và tên"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Căn cước công dân */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Căn cước công dân
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                placeholder="0xxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <select
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">0xxxxxxxxx</option>
                <option value="84">+84</option>
                <option value="1">+1</option>
                <option value="86">+86</option>
              </select>
            </div>

            {/* Mã trường */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mã trường
              </label>
              <select
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Mã trường</option>
                <option value="hust">HUST</option>
                <option value="hanu">HANU</option>
                <option value="neu">NEU</option>
              </select>
            </div>

            {/* Mã số sinh viên */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mã số sinh viên
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="xxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Quê quán */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quê quán
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="Xã/Phường - Tỉnh"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Xã/Phường - Tỉnh"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Lĩnh vực */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Lĩnh vực
              </label>
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleInputChange}
                placeholder="Lĩnh vực"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Thu nhập gia đình */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Thu nhập gia đình
              </label>
              <select
                name="familyIncome"
                value={formData.familyIncome}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">xxx.xxx VNĐ - xxx.xxx VNĐ</option>
                <option value="under5">Dưới 5 triệu VNĐ</option>
                <option value="5to10">5-10 triệu VNĐ</option>
                <option value="10to20">10-20 triệu VNĐ</option>
                <option value="above20">Trên 20 triệu VNĐ</option>
              </select>
            </div>

            {/* Người bảo lãnh */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Người bảo lãnh
              </label>
              <select
                name="guardian"
                value={formData.guardian}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Chọn người bảo lãnh</option>
                <option value="parent">Cha/Mẹ</option>
                <option value="relative">Người thân</option>
                <option value="other">Khác</option>
              </select>
            </div>

            {/* Câu lạc bộ tham gia */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Câu lạc bộ tham gia
              </label>
              <select
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Chọn câu lạc bộ</option>
                <option value="sports">Thể thao</option>
                <option value="music">Âm nhạc</option>
                <option value="tech">Công nghệ</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              variant="default"
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              Cập nhật thông tin
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Profiles;
