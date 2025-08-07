import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import ProtectedRoute from "../utils/ProtectedRoute";

//AUTH PAGES
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmail";

//USER PAGES
import SettingsPage from "../pages/user/SettingPage/SettingPage.jsx";
import LandingPage from "../pages/user/LandingPage/LandingPage.jsx";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import AuthLayout from "../layouts/AuthLayout.jsx";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/user/Home/Home.jsx";
import Dashboard from "../pages/user/Dashboard/Dashboard.jsx";
import UserProfile from "@/pages/user/Profile/UserProfile/UserProfile";
import UniversityProfile from "../pages/user/Profile/UniversityProfile/UniversityProfile.jsx";
import AcademicProfile from "../pages/user/Profile/Academic/AcademicProfile.jsx";
import MyLoans from "../pages/user/MyLoan/MyLoan.jsx";
import HistoryTransaction from "../pages/user/HistoryTransaction/HistoryTransaction.jsx";
import DIDs from "../pages/user/DecentralizedIdentification/DIDs/DIDs.jsx";
import VCs from "../pages/user/DecentralizedIdentification/VCs/VCs.jsx";
import NewLoans from "../pages/user/NewLoan/NewLoans.jsx";
import ProtectedAcademicProfile from "@/utils/ProtectedAcademicProfile";
import AcademicProfileNotVerified from "@/pages/user/Profile/Academic/AcademicProfileNotVerified";

//ADMIN PAGE
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import PaymentSchedulePage from "@/pages/admin/PaymentSchedule";
import RiskAnalyze from "@/pages/admin/RiskAnalyze";
import OverviewLoans from "@/pages/admin/OverviewLoans";
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
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
 
          <Route path="admin" element={<AdminLayout />}>
            <Route index path="dashboard" element={<AdminDashboard />} />
            <Route path="loans" element={<OverviewLoans />} />
            <Route path="payment-schedule" element={<PaymentSchedulePage />} />
            <Route path="risk-analyze" element={<RiskAnalyze />} /> 
          </Route>

          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile/general-info" element={<UserProfile />} />
            <Route
              path="profile/student-info"
              element={<UniversityProfile />}
            />

            <Route
              path="profile/academic-info"
              element={
                <ProtectedAcademicProfile>
                  <AcademicProfile />
                </ProtectedAcademicProfile>
              }
            />
            <Route
              path="profile/academic-info/not-verified"
              element={<AcademicProfileNotVerified />}
            />

            <Route path="DIDs" element={<DIDs />} />
            <Route path="VCs" element={<VCs />} />

            <Route path="loans" element={<MyLoans />} />
            <Route path="history" element={<HistoryTransaction />} />
            <Route path="newloan" element={<NewLoans />} />
            </Route>
            <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
