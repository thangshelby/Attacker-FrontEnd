import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Shield, 
  Zap, 
  Users, 
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Lock,
  AlertTriangle,
  Bell,
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  Bot,
  Eye,
  UserCheck,
  Database,
  Scale,
  PhoneCall
} from 'lucide-react';

const StudentCreditLanding = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: Users,
      title: "Dành cho sinh viên",
      description: "Đánh giá tiềm năng không chỉ dựa trên lịch sử tín dụng mà còn dựa trên học tập và hoạt động",
      color: "bg-blue-500"
    },
    {
      icon: Zap,
      title: "Tự động & Nhanh chóng", 
      description: "Công nghệ AI giúp xử lý hồ sơ của một cách nhanh chóng, không phải chờ đợi lâu",
      color: "bg-green-500"
    },
    {
      icon: FileText,
      title: "Quản lý hồ sơ thông minh",
      description: "Dễ dàng cập nhật thông tin, theo dõi trạng thái hồ sơ và xem lại lịch sử tín dụng.",
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Bảo mật & An toàn",
      description: "Dữ liệu cá nhân được mã hóa và bảo mật theo chuẩn luật an ninh, đảm bảo an toàn thông tin.",
      color: "bg-red-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Đăng ký & Hoàn tất hồ sơ",
      description: "Tạo tài khoản và hoàn thiện thông tin cá nhân, học tập của bạn"
    },
    {
      number: "02", 
      title: "Gửi yêu cầu & Xét duyệt",
      description: "Gửi yêu cầu vay và để AI của chúng tôi đánh giá hồ sơ một cách nhanh chóng"
    },
    {
      number: "03",
      title: "Nhận kết quả & Giải ngân", 
      description: "Nhận thông báo kết quả và tiến hành giải ngân nếu được duyệt"
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Xác thực hai lớp",
      description: "Đảm bảo chỉ có bạn mới truy cập được vào tài khoản của mình nhờ cơ chế xác thực 2 bước."
    },
    {
      icon: AlertTriangle,
      title: "Phát hiện gian lận & Cảnh báo", 
      description: "Gửi cảnh báo ngay nếu có hoạt động đáng ngờ trên tài khoản của bạn."
    },
    {
      icon: Bell,
      title: "Thông báo giao dịch",
      description: "Nhận thông báo ngay khi có thay đổi quan trọng trong hồ sơ, giúp bạn dễ dàng kiểm soát."
    },
    {
      icon: Eye,
      title: "Quyền kiểm soát dữ liệu cá nhân",
      description: "Bạn có toàn quyền truy cập, chỉnh sửa thông tin cá nhân của mình dễ dàng."
    },
    {
      icon: Scale,
      title: "Tuân thủ pháp lý",
      description: "Ứng dụng tuân thủ nghiêm ngặt Nghị định 13/2023/NĐ-CP của Chính phủ về bảo vệ dữ liệu cá nhân."
    },
    {
      icon: Bot,
      title: "Hỗ trợ an toàn 24/7",
      description: "Chatbot hỗ trợ 24/7 giúp bạn xử lý mọi vấn đề liên quan đến bảo mật một cách kịp thời."
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Vay vốn không cần chứng minh thu nhập",
      description: "Đừng để việc thiếu giấy tờ thu nhập cản trở kế hoạch của bạn. Hệ thống của chúng tôi đánh giá bạn dựa trên tiềm năng và kết quả học tập, mở ra cơ hội vay vốn mà bạn xứng đáng có được."
    },
    {
      icon: TrendingUp,
      title: "Xây dựng Lịch sử Tín dụng từ Sớm",
      description: "Bắt đầu xây dựng lịch sử tín dụng ngay từ khi còn là sinh viên, tạo nền tảng vững chắc cho tương lai tài chính của bạn."
    },
    {
      icon: Award,
      title: "Lãi suất Ưu đãi & Minh bạch", 
      description: "Chúng tôi mang đến mức lãi suất cạnh tranh và ưu đãi nhất dành riêng cho sinh viên. Mọi chi phí được hiển thị rõ ràng và minh bạch, không có phụ phí ẩn hay chi phí ngoài lề phát sinh."
    }
  ];

  const faqs = [
    {
      question: "Thời gian duyệt vay là bao lâu?",
      answer: "Với công nghệ AI tiên tiến, chúng tôi có thể xử lý và đưa ra kết quả duyệt vay trong vòng 24-48 giờ sau khi bạn hoàn thiện hồ sơ."
    },
    {
      question: "Em là sinh viên năm nhất, có đăng ký được không?",
      answer: "Hoàn toàn được! Nền tảng của chúng tôi được thiết kế để hỗ trợ sinh viên từ tất cả các năm học, miễn là bạn là sinh viên chính quy tại các trường Đại học, Cao đẳng trên toàn quốc và có thể cung cấp đầy đủ giấy tờ theo yêu cầu."
    },
    {
      question: "Hồ sơ đăng ký cần những giấy tờ gì?",
      answer: "Bạn cần chuẩn bị: CMND/CCCD, thẻ sinh viên, bảng điểm gần nhất, giấy xác nhận sinh viên từ trường và một số giấy tờ bổ sung khác tùy theo từng trường hợp cụ thể."
    },
    {
      question: "Hạn mức vay tối đa em có thể nhận là bao nhiêu?",
      answer: "Hạn mức vay sẽ được đánh giá dựa trên kết quả học tập, hoạt động ngoại khóa và tiềm năng của bạn. Thông thường dao động từ 5-50 triệu VND tùy thuộc vào từng trường hợp."
    },
    {
      question: "Em không có việc làm, có cần chứng minh thu nhập không?",
      answer: "Không cần! Đây chính là điểm khác biệt của StudentCredit. Chúng tôi đánh giá dựa trên tiềm năng học tập và hoạt động của bạn, không yêu cầu chứng minh thu nhập."
    }
  ];

  const testimonials = [
    {
      name: "Ethan Williams",
      role: "Digital Marketing Specialist", 
      content: "Experience a payment app built on simplicity and transparency. No hidden fees, just a seamless user experience that makes every transaction easy and stress-free.",
      rating: 5
    },
    {
      name: "Daniel Thompson", 
      role: "Product Designer",
      content: "Discover a payment app focused on transparency. Enjoy a seamless experience with no hidden fees, providing clarity and ease in every transaction.",
      rating: 5
    },
    {
      name: "Sophia Rodriguez",
      role: "Freelance Developer", 
      content: "This app is a game-changer! The interface is incredibly intuitive, and the lack of hidden charges is a breath of fresh air.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300">
                <Zap className="mr-2 h-4 w-4" />
                Nền tảng chấm điểm tín dụng tiên phong
              </div>
              
              <h1 className="text-4xl font-bold leading-tight lg:text-6xl">
                Mở khóa tương lai 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}tài chính{" "}
                </span>
                của bạn ngay hôm nay
              </h1>
              
              <p className="text-xl text-gray-300 lg:text-2xl">
                StudentCredit là nền tảng chấm điểm tín dụng tiên phong, giúp sinh viên chứng minh năng lực và tiềm năng của mình để tiếp cận các khoản vay dễ dàng.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25">
                  Đăng ký ngay
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    Không cần chứng minh thu nhập
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    Đánh giá nhanh chóng
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">StudentCredit</h3>
                    <p className="text-sm text-gray-400">Nền tảng tín dụng thông minh</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-700/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Điểm tín dụng</span>
                      <span className="font-semibold text-green-400">Tốt</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-600">
                      <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-gray-700/50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Hạn mức khả dụng</span>
                      <span className="font-semibold">₫50,000,000</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 -top-4 h-24 w-24 animate-pulse rounded-full bg-blue-500/20"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 animate-pulse rounded-full bg-purple-500/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Khám phá tính năng mà ứng dụng mang đến
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Những tính năng được thiết kế đặc biệt dành cho sinh viên Việt Nam
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-gray-800/50 p-6 transition-all hover:bg-gray-800/70 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-800/30 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Quy trình vô cùng đơn giản
            </h2>
            <p className="text-gray-400">Chỉ 3 bước đơn giản để được duyệt vay</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="rounded-2xl bg-gray-800/50 p-8 text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <ChevronRight className="h-6 w-6 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              An ninh & Bảo mật
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Dữ liệu của bạn được bảo vệ ở mọi bước. StudentCredit cam kết bảo vệ thông tin cá nhân của bạn ở mọi bước, đảm bảo đáp ứng các tiêu chuẩn bảo mật chuẩn ngân hàng.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-800/50 p-6 transition-all hover:bg-gray-800/70"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                  <feature.icon className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-800/30 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Tại sao sinh viên nên sử dụng StudentCredit
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Chúng tôi không chỉ duyệt vay, chúng tôi trao cho bạn chìa khóa để xây dựng một nền tảng tài chính vững chắc.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-800/30 p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Các câu hỏi thường gặp
            </h2>
            <p className="text-gray-400">
              Không tìm thấy câu trả lời mong muốn? Trò chuyện cùng với AI. Chúng tôi rất vui lòng khi được hỗ trợ bạn
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-800/50 transition-all hover:bg-gray-800/70"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      openFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="border-t border-gray-700 px-6 pb-6 pt-4">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-800/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              We've built trust with reviews from real users
            </h2>
            <p className="text-gray-400">
              Boost your credibility by featuring genuine testimonials from real users
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTab * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="mx-auto max-w-4xl rounded-2xl bg-gray-800/50 p-8 text-center">
                      <div className="mb-6 flex justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="mb-6 text-xl italic text-gray-300">
                        "{testimonial.content}"
                      </blockquote>
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`h-2 w-8 rounded-full transition-all ${
                    activeTab === index ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            Sinh viên đang học tập
          </h2>
          <p className="mb-8 text-xl text-gray-400">
            Sẵn sàng để trải nghiệm ứng dụng của chúng tôi bây giờ chưa?
          </p>
          <p className="mb-8 text-gray-400">
            Đừng để những khó khăn tài chính tạm thời cản bước bạn trên con đường học vấn. Hãy để chúng tôi đồng hành cùng bạn.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25">
              Đăng ký ngay
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-xl border border-gray-600 px-8 py-4 text-lg font-semibold transition-all hover:border-gray-500 hover:bg-gray-800/50">
              Đăng nhập
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">StudentCredit</span>
              </div>
              <p className="mb-6 text-gray-400">
                StudentCredit là nền tảng tín dụng thông minh, được thiết kế để giúp sinh viên Việt Nam xây dựng nền tảng tài chính và mở lối tương lai.
              </p>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold">Short links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Lợi ích</a></li>
                <li><a href="#" className="hover:text-white">Tính năng</a></li>
                <li><a href="#" className="hover:text-white">Hướng dẫn</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold">Other pages</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-white">Q&A</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>Copyright © 2025 StudentCredit. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentCreditLanding;