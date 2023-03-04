import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, adminRoute }) {
  const { user } = useSelector((state) => state.user);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  if (adminRoute && user.role !== "admin") return <Navigate to={"/login"} />;
  return <Outlet />;
}

export default ProtectedRoute;
