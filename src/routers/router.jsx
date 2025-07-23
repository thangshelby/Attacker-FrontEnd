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
        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="verify-email" element={<VerifyEmailPage />} />
          </Route>
          <Route path="admin" element={<AdminPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="" element={<LandingPage />} />
        </Route>

        {/* Public: auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          {/* <Route path="verify-email" element={<VerifyEmailPage />} /> */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
