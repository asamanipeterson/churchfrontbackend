import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || user.user_type !== "admin") {
    return <Navigate to="/auth" replace />;  // Redirect if not admin
  }

  return <Outlet />;  // Render the protected route if checks pass
};

export default ProtectedAdminRoute;