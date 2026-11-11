import { useNavigate } from "react-router";
import { Shield, User, Smartphone } from "lucide-react";

export default function PortalSelector() {
  const navigate = useNavigate();

  const portals = [
    {
      id: "admin",
      title: "Admin Portal",
      description: "Access the administrative dashboard to manage users, courses, and reports",
      icon: Shield,
      color: "from-[#1e3a8a] to-[#1e293b]",
      path: "/admin/login",
    },
    {
      id: "staff",
      title: "Staff Portal",
      description: "Access your training courses, track progress, and earn certificates",
      icon: User,
      color: "from-[#d97706] to-[#ea580c]",
      path: "/staff/login",
    },
    {
      id: "mobile",
      title: "Mobile App",
      description: "Mobile-optimized experience for learning on the go",
      icon: Smartphone,
      color: "from-blue-600 to-blue-800",
      path: "/mobile",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1e3a8a] to-[#d97706] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Learning Management System</h1>
          <p className="text-lg text-gray-600">Select your portal to continue</p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.id}
                onClick={() => navigate(portal.path)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-transparent hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${portal.color} p-8 text-white`}>
                  <Icon className="w-12 h-12 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">{portal.title}</h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {portal.description}
                  </p>
                  <div className="mt-6 flex items-center justify-center text-sm font-medium text-gray-400 group-hover:text-[#1e3a8a] transition-colors">
                    Click to access →
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Demo Access Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Shield className="w-6 h-6 text-[#1e3a8a] mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">Admin Portal</p>
              <p className="text-xs text-gray-600">admin@company.com</p>
              <p className="text-xs text-gray-600">any password</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <User className="w-6 h-6 text-[#d97706] mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">Staff Portal</p>
              <p className="text-xs text-gray-600">tech@company.com</p>
              <p className="text-xs text-gray-600">any password</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Smartphone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">Mobile App</p>
              <p className="text-xs text-gray-600">employee@company.com</p>
              <p className="text-xs text-gray-600">any password</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Enterprise Learning Management System v2.0</p>
        </div>
      </div>
    </div>
  );
}
