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
