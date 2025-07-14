import { Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import SettingsPage from "../pages/user/SettingsPage";
import LandingPage from "../pages/user/LandingPage";
import NotFoundPage from "../pages/user/notfound/NotFoundPage";

const Router = (): React.ReactElement => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <Routes>
        {/* Authencication routes */}
        <Route path="/auth">
          <Route index path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>

        {/* Default user routes */}
        <Route path="/">
          <Route index path="" element={<LandingPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
