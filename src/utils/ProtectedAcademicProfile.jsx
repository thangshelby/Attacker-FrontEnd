import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React from "react";
import { useAcademic } from "@/hooks/useAcademic";
import { useStudent } from "@/hooks/useStudent";

const ProtectedAcademicProfile = ({ children }) => {
  const { academicData } = useAcademic();
  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (!academicData?.verified) {
  //     navigate("/profile/academic-info/not-verified", { replace: true });
  //   }
  // }, [academicData]);

  return <>{children}</>; // Render the child components if the academic profile is verified
};

export default ProtectedAcademicProfile;
  