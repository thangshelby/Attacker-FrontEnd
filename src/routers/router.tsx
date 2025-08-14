import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import ProtectedRoute from "../utils/ProtectedRoute";

//AUTH PAGES
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmail";

//USER PAGES
import SettingsPage from "../pages/user/SettingPage/SettingPage.tsx";
import LandingPage from "../pages/user/LandingPage/LandingPage.tsx";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import AuthLayout from "../layouts/AuthLayout.tsx";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/user/Home/Home.tsx";
import Dashboard from "../pages/user/Dashboard/Dashboard.tsx";
import UserProfile from "@/pages/user/Profile/UserProfile/UserProfile";
import UniversityProfile from "../pages/user/Profile/UniversityProfile/UniversityProfile.tsx";
import AcademicProfile from "../pages/user/Profile/Academic/AcademicProfile.tsx";
import LoanHistory from "../pages/user/UserLoan/LoanHistory.tsx";
import DIDs from "../pages/user/DecentralizedIdentification/DIDs/DIDs.tsx";
import VCs from "../pages/user/DecentralizedIdentification/VCs/VCs.tsx";
import LoanNew from "../pages/user/UserLoan/LoanNew.tsx";
import ProtectedAcademicProfile from "@/utils/ProtectedAcademicProfile";
import AcademicProfileNotVerified from "@/pages/user/Profile/Academic/AcademicProfileNotVerified";
import UserLoanDetail from "@/pages/user/UserLoan/LoanDetail";

//ADMIN PAGE
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import PaymentSchedulePage from "@/pages/admin/PaymentSchedule";
import RiskAnalyze from "@/pages/admin/RiskAnalyze";
import OverviewLoans from "@/pages/admin/OverviewLoans";
import MultiAgentDebateSystem from "@/pages/admin/DebateAgent";
import AIReasoningDashboard from "@/pages/admin/Debate2";
import AdminLoanDetail from "@/pages/admin/LoanDetail";

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
        {/* PUBLIC ROUTES */}
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

          {/* ADMIN ROUTES */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index path="dashboard" element={<AdminDashboard />} />
            <Route path="loans" element={<OverviewLoans />} />
            <Route path="loans/:loan_id" element={<AdminLoanDetail />} />

            <Route path="payment-schedule" element={<PaymentSchedulePage />} />
            <Route path="risk-analyze" element={<RiskAnalyze />} />
            <Route path="debate" element={<MultiAgentDebateSystem />} />
            <Route path="debate-2" element={<AIReasoningDashboard />} />
          </Route>

          {/* USER ROUTE */}

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

            <Route path="loans/:loan_id" element={<UserLoanDetail />} />
            <Route path="history" element={<LoanHistory />} />
            <Route path="newloan" element={<LoanNew />} />
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
