import {
    featureIcon1,
    featureIcon2,
    featureIcon3,
    featureIcon4,
    stepIcon1,
    stepIcon2,
    stepIcon3,
    benefitIcon1,
    benefitIcon2,
    benefitIcon3,
    testimonial1,
    testimonial2,
} from "../../assets";


export const navigation = [
  {
    id: "0",
    title: "Tính năng",
    url: "#features",
  },
  {
    id: "1",
    title: "Cách dùng",
    url: "#how-to-use",
  },
  {
    id: "2",
    title: "Bảo mật",
    url: "#security",
  },
  {
    id: "3",
    title: "Tiện ích",
    url: "#benefits",
  },
  {
    id: "4",
    title: "FAQ",
    url: "#faq",
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const featureContents = [
  {
    id: "0",
    title: "Dành cho sinh viên",
    text: "Đánh giá tiềm năng không chỉ dựa trên lịch sử tín dụng mà còn dựa trên học tập và hoạt động",
    iconUrl: featureIcon1,
  },
  {
    id: "1",
    title: "Tự động & Nhanh chóng",
    text: "Công nghệ AI giúp xử lý hồ sơ của một cách nhanh chóng, không phải chờ đợi lâu ",
    iconUrl: featureIcon2,
  },
  {
    id: "2",
    title: "Quản lý hồ sơ thông minh",
    text: "Dễ dàng cập nhật thông tin, theo dõi trạng thái hồ sơ và xem lại lịch sử tín dụng.",
    iconUrl: featureIcon3,
  },
  {
    id: "3",
    title: "Bảo mật & An toàn",
    text: "Dữ liệu cá nhân được mã hóa và bảo mật theo chuẩn luật an ninh, đảm bảo an toàn thông tin.",
    iconUrl: featureIcon4,
  },
];


export const steps = [
  {
    id: 1,
    title: "Đăng ký & Hoàn tất hồ sơ",
    desc: "Get the Monks Pay app today from the App Store or Google Play hassle free.",
    iconUrl: stepIcon1, // ảnh SVG hoặc PNG
  },
  {
    id: 2,
    title: "Gửi yêu cầu & Xét duyệt",
    desc: "Easily connect your account in seconds with advanced security for peace of mind.",
    iconUrl: stepIcon2,
  },
  {
    id: 3,
    title: "Nhận kết quả & Giải ngân",
    desc: "Easily split bills, send money to friends, and make smooth online payments instantly.",
    iconUrl: stepIcon3,
  },
];

export const security = [
  {
    id: "0",
    title: "Xác thực hai lớp",
    text: "Đảm bảo chỉ có bạn mới truy cập được vào tài khoản của mình nhờ cơ chế xác thực 2 bước.",
    iconColor: "blue", 
  },
  {
    id: "1",
    title: "Phát hiện gian lận & Cảnh báo",
    text: "Gửi cảnh báo ngay nếu có hoạt động đáng ngờ trên tài khoản của bạn.",
    iconColor: "red",
  },
  {
    id: "2",
    title: "Thông báo giao dịch",
    text: "Nhận thông báo ngay khi có thay đổi quan trọng trong hồ sơ, giúp bạn dễ dàng kiểm soát.",
    iconColor: "green",
  },
  {
    id: "3",
    title: "Quyền kiểm soát dữ liệu cá nhân",
    text: "Bạn có toàn quyền truy cập, chỉnh sửa thông tin cá nhân của mình dễ dàng.",
    iconColor: "pink",
  },
  {
    id: "4",
    title: "Tuân thủ pháp lý",
    text: "Ứng dụng tuân thủ nghiêm ngặt Nghị định 13/2023/NĐ-CP của Chính phủ về bảo vệ dữ liệu cá nhân.",
    iconColor: "yellow",
  },
  {
    id: "5",
    title: "Hỗ trợ an toàn 24/7",
    text: "Chatbot hỗ trợ 24/7 giúp bạn xử lý mọi vấn đề liên quan đến bảo mật một cách kịp thời.",
    iconColor: "purple",
  },
];


export const benefitContent = [
  {
    id: 1,
    title: "Vay vốn không cần chứng minh thu nhập",
    text: "Đừng để việc thiếu giấy tờ thu nhập cản trở kế hoạch của bạn. Hệ thống của chúng tôi đánh giá bạn dựa trên tiềm năng và kết quả học tập, mở ra cơ hội vay vốn mà bạn xứng đáng có được.",
    iconUrl: benefitIcon1,
  },
  {
    id: 2,
    title: "Xây dựng Lịch sử Tín dụng từ Sớm",
    text: "Đừng để việc thiếu giấy tờ thu nhập cản trở kế hoạch của bạn. Hệ thống của chúng tôi đánh giá bạn dựa trên tiềm năng và kết quả học tập, mở ra cơ hội vay vốn mà bạn xứng đáng có được.",
    iconUrl: benefitIcon2,
  },
  {
    id: 3,
    title: "Lãi suất Ưu đãi & Minh bạch",
    text: "Chúng tôi mang đến mức lãi suất cạnh tranh và ưu đãi nhất dành riêng cho sinh viên. Mọi chi phí được hiển thị rõ ràng và minh bạch, không có phụ phí ẩn hay chi phí ngoài lề phát sinh.",
    iconUrl: benefitIcon3,
  },
];


export const faqData = [
  {
    id: 1,
    question: "Thời gian duyệt vay là bao lâu?",
    answer: "Thời gian duyệt vay thông thường từ 1-3 ngày làm việc sau khi bạn đã nộp đầy đủ hồ sơ. Chúng tôi sẽ thông báo kết quả cho bạn qua email và SMS.",
  },
  {
    id: 2,
    question: "Em là sinh viên năm nhất, có đăng ký được không?",
    answer: "Hoàn toàn được! Nền tảng của chúng tôi được thiết kế để hỗ trợ sinh viên từ tất cả các năm học, miễn là bạn là sinh viên chính quy tại các trường Đại học, Cao đẳng trên toàn quốc và có thể cung cấp đầy đủ giấy tờ theo yêu cầu.",
  },
  {
    id: 3,
    question: "Hồ sơ đăng ký cần những giấy tờ gì?",
    answer: "Hồ sơ cơ bản bao gồm: CMND/CCCD, Thẻ sinh viên, và Bảng điểm học kỳ gần nhất. Tùy thuộc vào gói vay, có thể có thêm một vài yêu cầu khác và chúng tôi sẽ hướng dẫn bạn chi tiết.",
  },
  {
    id: 4,
    question: "Hạn mức vay tối đa em có thể nhận là bao nhiêu?",
    answer: "Hạn mức vay phụ thuộc vào kết quả học tập, lịch sử tín dụng (nếu có) và trường bạn đang theo học. Hạn mức có thể lên tới 20 triệu đồng mỗi học kỳ.",
  },
  {
    id: 5,
    question: "Sau bao lâu thì em biết kết quả duyệt vay?",
    answer: "Bạn sẽ nhận được kết quả ngay sau khi quá trình thẩm định hoàn tất, thường là trong vòng 24-72 giờ làm việc. Chúng tôi luôn cố gắng xử lý hồ sơ nhanh nhất có thể.",
  },
  {
    id: 6,
    question: "Em không có việc làm, có cần chứng minh thu nhập không?",
    answer: "Không cần! Đây chính là ưu điểm lớn nhất của StudentCredit. Chúng tôi xét duyệt dựa trên tiềm năng và kết quả học tập của bạn, không yêu cầu chứng minh thu nhập.",
  },
];

export const testimonials = [
  {
    id: 1,
    stars: 5,
    text: "Experience a payment app built on simplicity and transparency. No hidden fees, just a seamless user experience that makes every transaction easy and stress-free. Say goodbye to confusion and hello to straightforward payments.",
    author: "Ethan Williams",
    title: "Digital Marketing Specialist",
    image: testimonial1,
  },
  {
    id: 2,
    stars: 5,
    text: "Discover a payment app focused on transparency. Enjoy a seamless experience with no hidden fees, providing clarity and ease in every transaction. It's designed to put you in control of your payments.",
    author: "Daniel Thompson",
    title: "Product Designer",
    image: testimonial2,
  },
  {
    id: 3,
    stars: 5,
    text: "This app is a game-changer! The interface is incredibly intuitive, and the lack of hidden charges is a breath of fresh air. I finally feel confident about my financial transactions.",
    author: "Sophia Rodriguez",
    title: "Freelance Developer",
    image: testimonial1, 
  },

  {
    id: 4,
    stars: 5,
    text: "I've been using this app for years and it has never let me down. The transparency and ease of use make it the perfect tool for my business. It's a game-changer!",
    author: "Olivia Martinez",
    title: "Marketing Manager",
    image: testimonial2,
  }
];

export const footerLinks = {
  shortLinks: [
    { name: "Lợi ích", href: "#benefits" },
    { name: "Tính năng", href: "#features" },
    { name: "Hướng dẫn", href: "#how-to-use" },
  ],
  otherPages: [
    { name: "Chính sách bảo mật", href: "#scecurity" },
    { name: "Q&A", href: "#faq" },
  ],
};