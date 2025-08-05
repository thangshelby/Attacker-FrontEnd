import { Award, FileText, Users, Calendar, Settings } from "lucide-react";

// Mock data
// Các trường / đơn vị trong khối ĐHQG-TP.HCM (bao gồm 7 trường thành viên chính, phân hiệu và viện tiêu biểu)
export const universities = [
  {
    id: "hcmut",
    name: "Trường Đại học Bách Khoa TP.HCM",
    address: "268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM",
  },
  {
    id: "hcmus",
    name: "Trường Đại học Khoa học Tự nhiên TP.HCM",
    address: "227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP.HCM",
  },
  {
    id: "ussh",
    name: "Trường Đại học Khoa học Xã hội và Nhân văn TP.HCM",
    address: "10–12 Đinh Tiên Hoàng, Phường Bến Nghé, Quận 1, TP.HCM",
  },
  {
    id: "iuvnu",
    name: "Trường Đại học Quốc tế (ĐHQG-HCM)",
    address: "Khu phố 6, Phường Linh Trung, TP. Thủ Đức, TP.HCM",
  },
  {
    id: "uit",
    name: "Trường Đại học Công nghệ Thông tin (ĐHQG-HCM)",
    address: "Khu phố 6, Phường Linh Trung, TP. Thủ Đức, TP.HCM",
  },
  {
    id: "uel",
    name: "Trường Đại học Kinh tế – Luật (ĐHQG-HCM)",
    address: "Số 669 Quốc lộ 1, Phường Linh Xuân, TP. Thủ Đức, TP.HCM",
  },
  {
    id: "agu",
    name: "Trường Đại học An Giang (thành viên ĐHQG-HCM)",
    address: "Số 18, Đường Ung Văn Khiêm, Thành phố Long Xuyên, Tỉnh An Giang",
  },
  {
    id: "hcmuhs",
    name: "Trường Đại học Khoa học Sức khỏe (ĐHQG-HCM)",
    address: "TP. Thủ Đức / các cơ sở liên kết (tuỳ chương trình)",
  },
  {
    id: "bentre",
    name: "Phân hiệu ĐHQG-HCM tại Bến Tre",
    address: "Tỉnh Bến Tre",
  },
  {
    id: "ier",
    name: "Viện Môi trường và Tài nguyên (VNUHCM)",
    address: "Trực thuộc ĐHQG-HCM",
  },
];

export const faculties = [
  // Khối Khoa học Tự nhiên - Kỹ thuật
  { id: "cntt", name: "Công nghệ Thông tin" },
  { id: "toan", name: "Toán - Tin học" },
  { id: "ly", name: "Vật lý - Điện tử" },
  { id: "hoa", name: "Hóa học" },
  { id: "sinh", name: "Sinh học - Công nghệ Sinh học" },
  { id: "kttt", name: "Kỹ thuật Truyền thông" },
  { id: "kthh", name: "Kỹ thuật Hóa học" },
  { id: "ktco", name: "Kỹ thuật Cơ khí" },
  { id: "ktxd", name: "Kỹ thuật Xây dựng" },
  { id: "mtdl", name: "Môi trường & Tài nguyên" },

  // Khối Kinh tế - Luật - Quản trị
  { id: "ktdn", name: "Quản trị Kinh doanh" },
  { id: "marketing", name: "Marketing" },
  { id: "tcnh", name: "Tài chính - Ngân hàng" },
  { id: "ketoan", name: "Kế toán" },
  { id: "luat", name: "Luật" },
  { id: "qtkdqt", name: "Quản trị Kinh doanh Quốc tế" },

  // Khối Xã hội - Ngôn ngữ - Nghệ thuật
  { id: "nnanh", name: "Ngôn ngữ Anh" },
  { id: "nnnhat", name: "Ngôn ngữ Nhật" },
  { id: "nnhan", name: "Ngôn ngữ Hàn" },
  { id: "nnduc", name: "Ngôn ngữ Đức" },
  { id: "xhht", name: "Xã hội học" },
  { id: "tthoc", name: "Triết học" },
  { id: "dl", name: "Du lịch" },
  { id: "tkdh", name: "Thiết kế Đồ họa" },
  { id: "nt", name: "Nghệ thuật" },

  // Khối Y - Sức khỏe - Giáo dục
  { id: "ykhoa", name: "Y khoa" },
  { id: "dd", name: "Điều dưỡng" },
  { id: "gd", name: "Giáo dục" },
  { id: "theduc", name: "Giáo dục Thể chất" },
];

export const defaultUserProfile = {
  name: "Nguyễn Văn A",
  citizen_id: "123456789",
  email: "nguyenvana@email.com",
  // phone: "0123456789",
  birth: "2000-01-01",
  address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  gender: "male",
};

export const defaultUniversityProfile = {
  student_id: "20210001234",
  university: "hcmut",
  faculty_name: "Công nghệ Thông tin",
  major_name: "Công nghệ Thông tin",
  year_of_study: 3,
  class_id: "CT1",
  has_parttime_job: false,
  has_supporter: false,
  // student_card_front: null,
  // student_card_back: null,
}; // Sample notifications data
export const sampleNotifications = [
  {
    id: 1,
    title: "Bảng điểm học kỳ 1 đã được cập nhật",
    message:
      "Bảng điểm môn Lập trình Web đã được giảng viên cập nhật. Xem chi tiết ngay.",
    type: "success",
    time: "2 phút trước",
    isRead: true,
    icon: FileText,
  },
  {
    id: 2,
    title: "Thông báo học bổng mới",
    message:
      "Học bổng khuyến khích học tập năm 2024 đang mở đăng ký. Hạn chót: 15/08/2024",
    type: "info",
    time: "1 giờ trước",
    isRead: true,
    icon: Award,
  },
  {
    id: 3,
    title: "Lịch thi cuối kỳ",
    message: "Lịch thi cuối kỳ học kỳ 1 năm học 2024-2025 đã được công bố.",
    type: "warning",
    time: "3 giờ trước",
    isRead: true,
    icon: Calendar,
  },
  {
    id: 4,
    title: "Hoạt động tình nguyện",
    message:
      "Chương trình tình nguyện 'Mùa hè xanh 2024' đang tuyển sinh viên tham gia.",
    type: "info",
    time: "1 ngày trước",
    isRead: true,
    icon: Users,
  },
  {
    id: 5,
    title: "Cập nhật hệ thống",
    message:
      "Hệ thống sẽ bảo trì từ 22:00 - 02:00 ngày mai. Vui lòng hoàn thành công việc trước thời gian này.",
    type: "warning",
    time: "2 ngày trước",
    isRead: true,
    icon: Settings,
  },
];

// Mock data for loan purposes
export const loanPurposes = [
  { id: 1, name: "Học phí", description: "Chi trả học phí học kỳ" },
  { id: 2, name: "Sinh hoạt phí", description: "Chi phí sinh hoạt hàng tháng" },
  {
    id: 3,
    name: "Mua sách và tài liệu",
    description: "Sách giáo khoa, tài liệu học tập",
  },
  {
    id: 4,
    name: "Thiết bị học tập",
    description: "Laptop, máy tính, thiết bị",
  },
  { id: 5, name: "Chi phí khác", description: "Các chi phí học tập khác" },
  { id: 6, name: "Khác", description: "Mục đích khác (vui lòng ghi rõ)" },
];

// Payment methods
export const paymentMethods = [
  {
    id: 1,
    name: "Trả cả gốc và lãi vào ngày đáo hạn",
    description: "Trả toàn bộ số tiền vay và lãi khi hết hạn",
    interestRate: 0.08,
    shortName: "Trả cuối kỳ",
    hasFrequency: false,
  },
  {
    id: 2,
    name: "Trả lãi định kỳ, gốc cuối kỳ",
    description: "Trả lãi định kỳ theo tần suất đã chọn, trả gốc khi hết hạn",
    interestRate: 0.06,
    shortName: "Trả lãi định kỳ",
    hasFrequency: true,
  },
  {
    id: 3,
    name: "Trả đều gốc và lãi định kỳ",
    description: "Trả một phần gốc và lãi theo tần suất đã chọn",
    interestRate: 0.05,
    shortName: "Trả đều định kỳ",
    hasFrequency: true,
  },
];

// Payment frequencies
export const paymentFrequencies = [
  { id: 1, name: "1 tháng", months: 1, description: "Trả hàng tháng" },
  { id: 3, name: "3 tháng", months: 3, description: "Trả mỗi quý" },
  { id: 6, name: "6 tháng", months: 6, description: "Trả mỗi 6 tháng" },
];
