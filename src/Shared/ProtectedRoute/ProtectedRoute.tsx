import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { loggedIn, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return loggedIn ? children : <Navigate to="/login" />;
}
