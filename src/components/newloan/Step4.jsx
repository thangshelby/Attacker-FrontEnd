import React, { useState } from "react";
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  Bell,
  History,
  Award,
  DollarSign,
  User,
  GraduationCap,
  Printer,
} from "lucide-react";

const Step4 = ({ formData, studentInfo }) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handlePrintPDF = () => {
    setIsPrinting(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      setIsPrinting(false);
      setPdfGenerated(true);
      
      // Create a simple PDF content for printing
      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Hồ Sơ Vay Vốn Sinh Viên</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
              color: #333;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #007bff; 
              padding-bottom: 20px; 
              margin-bottom: 30px;
            }
            .section { 
              margin-bottom: 25px; 
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .section-title { 
              color: #007bff; 
              font-weight: bold; 
              margin-bottom: 15px;
              font-size: 18px;
            }
            .info-row { 
              display: flex; 
              justify-content: space-between; 
              margin-bottom: 10px;
              padding: 5px 0;
              border-bottom: 1px dotted #ccc;
            }
            .highlight { 
              color: #28a745; 
              font-weight: bold; 
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>HỒ SƠ VÀY VỐN SINH VIÊN</h1>
            <p>StudentCredit - Nền tảng vay vốn cho sinh viên</p>
            <p>Ngày tạo: ${new Date().toLocaleDateString('vi-VN')}</p>
          </div>

          <div class="section">
            <div class="section-title">THÔNG TIN SINH VIÊN</div>
            <div class="info-row">
              <span>Họ và tên:</span>
              <span class="highlight">${studentInfo.fullName}</span>
            </div>
            <div class="info-row">
              <span>Mã sinh viên:</span>
              <span class="highlight">${"k224141694"}</span>
            </div>
            <div class="info-row">
              <span>Ngành học:</span>
              <span>${studentInfo.major}</span>
            </div>
            <div class="info-row">
              <span>Khóa học:</span>
              <span>${studentInfo.academicYear}</span>
            </div>
            <div class="info-row">
              <span>GPA:</span>
              <span class="highlight">${studentInfo.gpa}</span>
            </div>
            <div class="info-row">
              <span>Xếp loại học tập:</span>
              <span class="highlight">${studentInfo.academicRank}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">THÔNG TIN KHOẢN VAY</div>
            <div class="info-row">
              <span>Số tiền vay:</span>
              <span class="highlight">${formatCurrency(formData.loan_amount_requested)}</span>
            </div>
            <div class="info-row">
              <span>Thời hạn vay:</span>
              <span>${formData.loan_tenor} tháng</span>
            </div>
            <div class="info-row">
              <span>Mục đích vay:</span>
              <span>${formData.custom_purpose || 'Học phí'}</span>
            </div>
            <div class="info-row">
              <span>Người bảo lãnh:</span>
              <span>${formData.guarantor}</span>
            </div>
            <div class="info-row">
              <span>Thu nhập gia đình:</span>
              <span>${formatCurrency(formData.family_income)}</span>
            </div>
            <div class="info-row">
              <span>Tổng lãi:</span>
              <span class="highlight">${formatCurrency(formData.total_interest)}</span>
            </div>
            <div class="info-row">
              <span>Tổng tiền phải trả:</span>
              <span class="highlight">${formatCurrency(formData.total_payment)}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">TRẠNG THÁI HỒ SƠ</div>
            <div class="info-row">
              <span>Trạng thái:</span>
              <span class="highlight">Đã nộp hồ sơ thành công</span>
            </div>
            <div class="info-row">
              <span>Mã hồ sơ:</span>
              <span class="highlight">HS${Date.now().toString().slice(-6)}</span>
            </div>
            <div class="info-row">
              <span>Ngày nộp:</span>
              <span>${new Date().toLocaleDateString('vi-VN')}</span>
            </div>
          </div>

          <div class="footer">
            <p>© 2024 StudentCredit. Tài liệu này được tạo tự động từ hệ thống.</p>
            <p>Để biết thêm thông tin, vui lòng liên hệ bộ phận hỗ trợ.</p>
          </div>
        </body>
        </html>
      `;

      // Open print dialog
      const printWindow = window.open('', '_blank');
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }, 2000);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
        <h2 className="flex items-center text-lg font-semibold text-white">
          <FileText className="mr-2 h-5 w-5" />
          Bước 4: Hoàn tất hồ sơ vay
        </h2>
      </div>

      <div className="space-y-8 p-6">
        {/* Success Message */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Tạo khoản vay thành công! Yêu cầu của bạn đang được xử lý.
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Hồ sơ vay của bạn đã được gửi thành công. Bạn có thể in tài liệu hồ sơ để lưu trữ.
          </p>
        </div>

        {/* PDF Download Section */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
          <h4 className="mb-4 flex items-center text-lg font-semibold text-blue-800 dark:text-blue-200">
            <Printer className="mr-2 h-5 w-5" />
            In hồ sơ vay PDF
          </h4>
          <p className="mb-6 text-sm text-blue-700 dark:text-blue-300">
            Tải xuống và in hồ sơ vay của bạn để lưu trữ thông tin chi tiết về khoản vay.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePrintPDF}
              disabled={isPrinting}
              className="flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-sm transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPrinting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Đang tạo PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  In hồ sơ PDF
                </>
              )}
            </button>
            
            {pdfGenerated && (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">PDF đã được tạo thành công!</span>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Các bước tiếp theo
          </h4>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-800 dark:text-yellow-200">
                    Chờ xét duyệt
                  </h5>
                  <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    Hồ sơ của bạn sẽ được xem xét trong vòng 3-5 ngày làm việc. 
                    Chúng tôi sẽ thông báo kết quả qua email và tin nhắn.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 dark:border-purple-800 dark:bg-purple-900/20">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h5 className="font-semibold text-purple-800 dark:text-purple-200">
                    Nhận thông báo
                  </h5>
                  <p className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                    Theo dõi trạng thái hồ sơ qua trang "Lịch sử vay" hoặc 
                    qua email/SMS thông báo từ hệ thống.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Thao tác nhanh
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => window.location.href = '/history'}
              className="flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              <History className="mr-2 h-4 w-4" />
              Xem lịch sử vay
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/20 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              <Award className="mr-2 h-4 w-4" />
              Về trang chủ
            </button>
          </div>
        </div>

        {/* Application Summary */}
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
          <h4 className="mb-4 flex items-center text-lg font-semibold text-green-800 dark:text-green-200">
            <Award className="mr-2 h-5 w-5" />
            Tóm tắt hồ sơ vay
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Mã hồ sơ:
              </span>
              <p className="font-mono font-semibold text-green-800 dark:text-green-200">
                HS{Date.now().toString().slice(-6)}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Số tiền vay:
              </span>
              <p className="font-semibold text-green-800 dark:text-green-200">
                {formatCurrency(formData.loan_amount_requested)}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Thời hạn:
              </span>
              <p className="font-semibold text-green-800 dark:text-green-200">
                {formData.loan_tenor} tháng
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Ngày nộp:
              </span>
              <p className="font-semibold text-green-800 dark:text-green-200">
                {new Date().toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
