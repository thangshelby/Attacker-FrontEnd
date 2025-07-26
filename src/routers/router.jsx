import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmail";
import SettingsPage from "../pages/user/SettingsPage";
import LandingPage from "../pages/user/LandingPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import AuthLayout from "../pages/auth/AuthLayout";
import AdminPage from "../pages/admin/AdminPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/user/Home";
import Dashboard from "../pages/user/Dashboard";
import Profiles from "../pages/user/Profile";
import MyLoans from "../pages/user/MyLoan";
import HistoryTransaction from "../pages/user/HistoryTransaction";
import NewLoans from "../pages/user/NewLoans";
const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <Routes>
        {/* ========================================================= */}
        {/* 1. PUBLIC ROUTES (Ai cũng có thể truy cập)              */}
        {/* ========================================================= */}
        {/* Trang chủ/Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Public: auth routes */}
        {/* Các trang xác thực (đăng nhập, đăng ký) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          {/* <Route path="verify-email" element={<VerifyEmailPage />} /> */}
        </Route>

        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="loans" element={<MyLoans />} />
          <Route path="history" element={<HistoryTransaction />} />
          <Route path="newloan" element={<NewLoans />} />
        </Route>

        {/* ========================================================= */}
        {/* 2. PROTECTED ROUTES (Yêu cầu đăng nhập)                 */}
        {/* ========================================================= */}
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="verify-email" element={<VerifyEmailPage />} />
          </Route>
          <Route path="admin" element={<AdminPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
