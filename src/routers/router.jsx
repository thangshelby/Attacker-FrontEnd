import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmail";
import SettingsPage from "../pages/user/SettingPage/SettingPage.jsx";
import LandingPage from "../pages/user/LandingPage/LandingPage.jsx";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import AuthLayout from "../layouts/AuthLayout.jsx";
import AdminPage from "../pages/admin/AdminPage";
import ProtectedRoute from "../utils/ProtectedRoute";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/user/Home/Home.jsx";
import Dashboard from "../pages/user/Dashboard/Dashboard.jsx";
import Profiles from "../pages/user/Profile/Profile.jsx";
import UniversityProfile from "../pages/user/Profile/UniversityProfile/UniversityProfile.jsx";
import MyLoans from "../pages/user/MyLoan/MyLoan.jsx";
import HistoryTransaction from "../pages/user/HistoryTransaction/HistoryTransaction.jsx";
import DIDs from "../pages/user/DecentralizedIdentification/DIDs/DIDs.jsx";
import VCs from "../pages/user/DecentralizedIdentification/VCs/VCs.jsx";
import NewLoans from "../pages/user/NewLoan/NewLoans.jsx";
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
        <Route path="/landing" element={<LandingPage />} />

        {/* Public: auth routes */}
        {/* Các trang xác thực (đăng nhập, đăng ký) */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          {/* <Route path="verify-email" element={<VerifyEmailPage />} /> */}
        </Route>

        {/* ========================================================= */}
        {/* 2. PROTECTED ROUTES (Yêu cầu đăng nhập)                 */}
        {/* ========================================================= */}
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile/general-info" element={<Profiles />} />
            <Route
              path="profile/student-info"
              element={<UniversityProfile />}
            />

            <Route path="DIDs" element={<DIDs />} />
            <Route path="VCs" element={<VCs />} />

            <Route path="loans" element={<MyLoans />} />
            <Route path="history" element={<HistoryTransaction />} />
            <Route path="newloan" element={<NewLoans />} />
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
