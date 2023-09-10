import React from "react";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";
import { useAuth } from "../features/authentication/useAuth";

export default function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Loader />;
  }
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }
  if (isAuthenticated) return children;
}
