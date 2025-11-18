import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { me } from "../services/auth";
import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
