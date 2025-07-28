import { useState } from "react";
import Button from "../../../components/elements/Button";

const NewLoans = () => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    purpose: "",
    partTimeWork: "",
    email: "",
    sponsor: "",
    averageGrade: "",
    documentation: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="bg-gray-50" style={{ overflow: 'visible' }}>
      <div className="mx-auto max-w-6xl">
        {/* Form Container */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Số tiền vay */}
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Số tiền vay
                </label>
                <input
                  type="text"
                  id="loanAmount"
                  name="loanAmount"
                  placeholder="Nhập số tiền cần vay"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Mục đích sử dụng */}
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                  Mục đích sử dụng
                </label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  placeholder="Nhập mục đích sử dụng"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Công việc part time */}
              <div>
                <label htmlFor="partTimeWork" className="block text-sm font-medium text-gray-700 mb-2">
                  Công việc part time
                </label>
                <input
                  type="email"
                  id="partTimeWork"
                  name="partTimeWork"
                  placeholder="Email"
                  value={formData.partTimeWork}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Người bảo lãnh */}
              <div>
                <label htmlFor="sponsor" className="block text-sm font-medium text-gray-700 mb-2">
                  Người bảo lãnh
                </label>
                <input
                  type="text"
                  id="sponsor"
                  name="sponsor"
                  placeholder="Nhập thông tin người bảo lãnh"
                  value={formData.sponsor}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 3 - Điểm trung bình */}
            <div>
              <label htmlFor="averageGrade" className="block text-sm font-medium text-gray-700 mb-2">
                Điểm trung bình của học kỳ gần nhất
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <select
                  id="averageGrade"
                  name="averageGrade"
                  value={formData.averageGrade}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Nộp kèm minh chứng</option>
                  <option value="excellent">Xuất sắc (3.6-4.0)</option>
                  <option value="good">Giỏi (3.2-3.59)</option>
                  <option value="fair">Khá (2.5-3.19)</option>
                  <option value="average">Trung bình (2.0-2.49)</option>
                </select>
                <div className="flex items-center">
                  <input
                    type="file"
                    id="documentation"
                    name="documentation"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="documentation"
                    className="cursor-pointer w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center justify-center"
                  >
                    Tải minh chứng
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button 
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2 rounded-md"
              >
                Đăng ký dịch vụ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLoans;
