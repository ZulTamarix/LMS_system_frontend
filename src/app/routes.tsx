import { createBrowserRouter, Navigate } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import MobileLayout from "./layouts/MobileLayout";
import StaffLayout from "./layouts/StaffLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Courses from "./pages/admin/Courses";
import RoleBasedAssignment from "./pages/admin/RoleBasedAssignment";
import TrainingPassport from "./pages/admin/TrainingPassport";
import Certifications from "./pages/admin/Certifications";
import Reports from "./pages/admin/Reports";
import Entities from "./pages/admin/Entities";
import Settings from "./pages/admin/Settings";
import Login from "./pages/mobile/Login";
import Home from "./pages/mobile/Home";
import CourseDetail from "./pages/mobile/CourseDetail";
import Certificate from "./pages/mobile/Certificate";
import Notifications from "./pages/mobile/Notifications";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffCourseDetail from "./pages/staff/StaffCourseDetail";
import StaffCertificate from "./pages/staff/StaffCertificate";
import PortalSelector from "./pages/PortalSelector";
import UnifiedLogin from "./pages/UnifiedLogin";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: UnifiedLogin,
  },
  {
    path: "/admin/login",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "users", Component: Users },
      { path: "courses", Component: Courses },
      { path: "role-assignment", Component: RoleBasedAssignment },
      { path: "training-passport", Component: TrainingPassport },
      { path: "certifications", Component: Certifications },
      { path: "reports", Component: Reports },
      { path: "entities", Component: Entities },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/staff/login",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/staff",
    Component: StaffLayout,
    children: [
      { index: true, element: <Navigate to="/staff/dashboard" replace /> },
      { path: "dashboard", Component: StaffDashboard },
      { path: "course/:id", Component: StaffCourseDetail },
      { path: "certificate/:id", Component: StaffCertificate },
    ],
  },
  {
    path: "/mobile",
    Component: MobileLayout,
    children: [
      { index: true, Component: Login },
      { path: "home", Component: Home },
      { path: "course/:id", Component: CourseDetail },
      { path: "certificate/:id", Component: Certificate },
      { path: "notifications", Component: Notifications },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/portals",
    Component: PortalSelector,
  },
]);