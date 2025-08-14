import { Award, FileText, Users, Calendar, Settings } from "lucide-react";

// Mock data
// Các trường / đơn vị trong khối ĐHQG-TP.HCM (bao gồm 7 trường thành viên chính, phân hiệu và viện tiêu biểu)

export const defaultUserProfile = {
  name: "Nguyễn Văn A",
  citizen_id: "123456789",
  email: "nguyenvana@email.com",
  // phone: "0123456789",
  birth: "2000-01-01",
  address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  gender: "male",
};
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
