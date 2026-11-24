import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Award,
  FileText,
  Building2,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  Search,
  GraduationCap,
  UserCheck,
  IdCard,
  NotebookText,
  CreditCard,
} from "lucide-react";
import exibyteLogo from "figma:asset/a4cfe9bd1927990d0a64f23cf7f0aeef602f8fa0.png";
import api from "../api/axios";


export default function StaffLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async() => {
    try {
      await api.post(`/logout`);

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const navItems = [
    { path: "/staff/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/staff/users", label: "My Profile", icon: Users },
    { path: "/staff/courses", label: "My Courses", icon: BookOpen },
    { path: "/staff/assessment", label: "Assessments", icon: NotebookText },
    { path: "/staff/certifications", label: "Certificates", icon: Award },
    { path: "/staff/reports", label: "Reports", icon: FileText },
    { path: "/staff/entities", label: "Payments", icon: CreditCard },
    { path: "/staff/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#1e3a8a] border-r border-[#1e293b] flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <img src={exibyteLogo} alt="Exibyte LMS" className="h-8 w-auto" />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-[#1e293b] p-2 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/staff"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#d97706] text-white"
                        : "text-white hover:bg-[#1e293b]"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#1e293b] space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-[#d97706] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Staff User</p>
              <p className="text-xs text-blue-200 truncate">staff@company.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-white hover:bg-[#1e293b]"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

          {/* Top Bar */}
          <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
              {/* Your existing header content */}
          </header>

          {/* Page Content */}
          <main className="flex-1">
              <div className="max-w-[1440px] mx-auto p-4 md:p-6">
                  <Outlet />
              </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-4 mt-8">
              <div className="max-w-[1440px] mx-auto px-4 md:px-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-sm text-gray-600">
                          © 2026 Enterprise LMS. All rights reserved.
                      </p>

                      <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">Powered by</p>
                          <img src={exibyteLogo} alt="Exibyte" className="h-5 w-auto" />
                      </div>
                  </div>
              </div>
          </footer>

      </div>
    </div>
  );
}