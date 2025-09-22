# 🏦 Attacker Frontend - Hệ thống Tín dụng Sinh viên

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC.svg)](https://tailwindcss.com/)
[![Deploy Status](https://img.shields.io/badge/Deploy-Render-brightgreen.svg)](https://attacker-frontend-1.onrender.com)

## 📖 Tổng quan

**Attacker Frontend** là giao diện người dùng cho hệ thống tín dụng dành riêng cho sinh viên - một nền tảng hiện đại giúp sinh viên dễ dàng tiếp cận các dịch vụ tài chính với quy trình đánh giá tín dụng thông minh dựa trên AI.

### 🎯 Mục tiêu chính

- **Dễ tiếp cận**: Giao diện thân thiện, dễ sử dụng cho sinh viên
- **Đánh giá thông minh**: Sử dụng AI để đánh giá tiềm năng tín dụng dựa trên học tập và hoạt động
- **Quy trình tự động**: Xử lý hồ sơ nhanh chóng, giảm thời gian chờ đợi
- **Bảo mật cao**: Tuân thủ các chuẩn bảo mật và pháp lý

## ✨ Tính năng chính

### 👥 Dành cho Sinh viên
- **Đăng ký/Đăng nhập**: Hệ thống xác thực với email verification
- **Hồ sơ cá nhân**: Quản lý thông tin cá nhân và học tập
- **Đơn vay mới**: Giao diện step-by-step để tạo đơn vay
- **Theo dõi hồ sơ**: Xem trạng thái và lịch sử đơn vay
- **Chatbot AI**: Hỗ trợ tư vấn 24/7
- **Thông báo real-time**: Cập nhật trạng thái đơn vay ngay lập tức

### 🛡️ Dành cho Quản trị viên
- **Dashboard tổng quan**: Thống kê và phân tích dữ liệu
- **Quản lý đơn vay**: Duyệt, từ chối hoặc yêu cầu bổ sung
- **Phân tích rủi ro**: Hệ thống AI đánh giá và phân tích
- **Lịch thanh toán**: Quản lý kế hoạch thanh toán
- **Hệ thống tranh luận AI**: Multi-agent debate cho quyết định phức tạp

### 🔧 Tính năng kỹ thuật
- **Responsive Design**: Tối ưu cho mọi thiết bị
- **Dark/Light Mode**: Giao diện có thể tùy chỉnh
- **Real-time Communication**: Socket.io cho thông báo tức thì
- **Type-safe**: Hoàn toàn được viết bằng TypeScript
- **SEO Optimized**: Tối ưu cho công cụ tìm kiếm

## 🛠️ Công nghệ sử dụng

### Core Framework
- **React 19.1.0** - UI Framework hiện đại
- **TypeScript 5.9.2** - Type safety và development experience
- **Vite 7.0.4** - Build tool siêu nhanh
- **React Router Dom 7.6.3** - Client-side routing

### Styling & UI
- **TailwindCSS 4.1.11** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Icons** - Icon library

### State Management & Data Fetching
- **Zustand 5.0.6** - Lightweight state management
- **TanStack React Query 5.83.0** - Server state management
- **React Hook Form 7.60.0** - Form handling
- **Zod 4.0.5** - Schema validation

### Communication & Real-time
- **Socket.io Client 4.8.1** - Real-time communication
- **Axios 1.10.0** - HTTP client
- **React Toastify 11.0.5** - Notification system

### AI & External Services
- **Google Generative AI 0.24.1** - AI integration
- **Firebase 12.1.0** - Authentication & storage
- **Ethers.js 6.15.0** - Web3 integration

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

## 🚀 Cài đặt và Phát triển

### Yêu cầu hệ thống
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Cài đặt dự án

```bash
# Clone repository
git clone https://github.com/your-username/attacker-frontend.git
cd attacker-frontend

# Cài đặt dependencies
npm install

# Cài đặt các biến môi trường
cp .env.example .env.local
# Chỉnh sửa file .env.local với các giá trị phù hợp
```

### Biến môi trường

Tạo file `.env.local` với các biến sau:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Google AI
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### Lệnh phát triển

```bash
# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Chạy production server
npm start
```

## 📁 Cấu trúc dự án

```
src/
├── apis/                   # API calls và React Query setup
├── assets/                 # Hình ảnh, icons, SVGs
├── components/            
│   ├── admin/             # Components cho admin
│   ├── shared/            # Components dùng chung
│   ├── ui/                # UI components cơ bản
│   └── user/              # Components cho user
├── config/                # Cấu hình Firebase, etc.
├── constants/             # Constants và config
├── contexts/              # React Contexts
├── hooks/                 # Custom hooks
├── layouts/               # Layout components
├── pages/                 # Page components
│   ├── admin/             # Admin pages
│   ├── auth/              # Authentication pages
│   └── user/              # User pages
├── routers/               # React Router setup
├── services/              # Services (socket, etc.)
├── store/                 # Zustand stores
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🔐 Xác thực và Phân quyền

### Hệ thống Role-based
- **Student**: Quản lý hồ sơ cá nhân, tạo và theo dõi đơn vay
- **Admin**: Quản lý tất cả đơn vay, phân tích dữ liệu

### Bảo mật
- Firebase Authentication với email verification
- Protected routes với role-based access
- Token-based authentication
- HTTPS trong production

## 🌐 Deployment

### Production Deployment (Render)

Dự án được deploy tự động trên Render với cấu hình trong `render.yaml`:

```yaml
services:
  - type: web
    name: attacker-frontend
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run preview
    envVars:
      - key: NODE_ENV
        value: production
      - key: VITE_API_BASE_URL
        value: https://attacker-bankend.onrender.com/api/v1
```

**Live Demo**: [https://attacker-frontend-1.onrender.com](https://attacker-frontend-1.onrender.com)

### Manual Deployment

```bash
# Build cho production
npm run build

# Deploy folder dist/ lên hosting service
# Hoặc chạy preview server
npm run preview
```

## 🧪 Testing và Quality Assurance

### Code Quality
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured với React best practices
- **Prettier**: Code formatting consistency

### Performance
- Code splitting với React.lazy()
- Image optimization
- Bundle analysis với Vite

## 📱 Responsive Design

- **Mobile First**: Thiết kế ưu tiên mobile
- **Breakpoints**: Responsive cho tất cả screen sizes
- **Touch Friendly**: Tối ưu cho thiết bị cảm ứng

## 🤝 Đóng góp

### Quy trình đóng góp
1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

### Coding Standards
- Sử dụng TypeScript cho tất cả code mới
- Follow React best practices
- Tuân thủ ESLint rules
- Viết tests cho components quan trọng

## 📊 Performance

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.0s

### Optimizations
- Code splitting và lazy loading
- Image optimization với modern formats
- Bundle size optimization
- Caching strategies

## 🐛 Bug Reports & Feature Requests

Sử dụng [GitHub Issues](https://github.com/your-username/attacker-frontend/issues) để:
- Báo cáo bugs
- Đề xuất tính năng mới
- Thảo luận về improvements
