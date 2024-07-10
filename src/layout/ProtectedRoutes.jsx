import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useVendor } from "../context/vendorContext";

const ProtectedRoutes = () => {
  const { vendorId, isLoading: isVendorLoading } = useVendor();
  const { isAuth, isLoading } = useAuth();

  console.log(vendorId + " is loading");

  if (isLoading || isVendorLoading) return "Loading...";
  if (!isAuth || vendorId === null) return <Navigate to="/signin" replace />;

  return <Outlet />;
};

export default ProtectedRoutes;
