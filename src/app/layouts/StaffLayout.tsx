import { Navigate, Outlet } from "react-router";

export default function StaffLayout() {
  const isAuthenticated = localStorage.getItem("staffAuth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}