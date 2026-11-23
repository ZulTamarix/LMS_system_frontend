import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, User, AlertCircle, GraduationCap, Briefcase, LogIn, Eye, EyeOff, UserPlusIcon } from "lucide-react";
import exibyteLog from "figma:asset/a4cfe9bd1927990d0a64f23cf7f0aeef602f8fa0.png";
import Field from "../components/ui_2nd/Field";
import { User_type } from "../interfaces/user";

type LoginType = "admin" | "staff";

export default function UnifiedLogin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<LoginType>("staff");
  
  // Admin state
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  
  // Staff state
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [showStaffPassword, setShowStaffPassword] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");

    if (adminUsername === "admin" && adminPassword === "password@1") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setAdminError("Invalid username or password");
    }
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - store in localStorage
    localStorage.setItem("staffAuth", "true");
    localStorage.setItem("staffEmail", staffEmail);
    localStorage.setItem("staffRole", "Technician");
    navigate("/staff/dashboard");
  };

  // #region 2) -> from Zulhazmi
    const [type, setType] = useState<'login' | 'register'>('login')
    const [user, setUser] = useState<User_type>({
      id: 0,
      usr_role: 'user',
      usr_name: '',
      usr_phoneNo: '',
      usr_email: '',
      usr_company: '',
      usr_username: '',
      usr_password: '',
      usr_status: 'active',
    });
    const [password2, setPassword2] = useState('')

  // #endregion

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3a8a] to-[#1e293b] p-4">
      <div className="w-full max-w-md">

          {/* Card */} 
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Logo & Title */}
            <div className="text-center pt-8 px-8 pb-6">
              <div className="flex justify-center mb-4">
                <img src={exibyteLog} alt="Exibyte" className="h-16 w-auto" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Learning Management System</h1>
              <p className="text-sm text-gray-600"><span>{type === "register" ? "Register" : "Sign in"}</span> to access your portal</p>

            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => {
                  setActiveTab("staff");
                  setAdminError("");
                }}
                className={`flex-1 py-4 px-6 font-medium text-sm transition-all ${
                  activeTab === "staff"
                    ? "border-b-2 border-[#d97706] text-[#d97706] bg-orange-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{type === "register" ? "User Register" : "User Login"}</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("admin");
                  setAdminError("");
                }}
                className={`flex-1 py-4 px-6 font-medium text-sm transition-all ${
                  activeTab === "admin"
                    ? "border-b-2 border-[#1e3a8a] text-[#1e3a8a] bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>{type === "register" ? "Admin Register" : "Admin Login"}</span>
                </div>
              </button>
            </div>

            {/* Forms Container */}
            {type == 'login' ? (
              <>
                <div className="p-8">

                  {/* Staff Login Form */}
                  {activeTab === "staff" && (
                    <form onSubmit={handleStaffLogin} className="space-y-5">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={staffEmail}
                            onChange={(e) => setStaffEmail(e.target.value)}
                            placeholder="Enter you email address"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showStaffPassword ? "text" : "password"}
                            value={staffPassword}
                            onChange={(e) => setStaffPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:border-transparent transition-all"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            onClick={() => setShowStaffPassword(!showStaffPassword)}
                          >
                            {showStaffPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-[#d97706] hover:underline">
                          Forgot password?
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-[#d97706] to-[#ea580c] text-white rounded-lg font-medium hover:from-[#ea580c] hover:to-[#d97706] transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
                      >
                        <LogIn className="w-5 h-5" />
                        Sign In as User
                      </button>

                      <p className="text-center text-sm">
                          Dont have an account?{" "}
                          <span onClick={() => setType('register')} className="text-secondary underline cursor-pointer font-medium">
                              Create an account
                          </span>
                      </p>

                      {/* Staff Demo Credentials */}
                      <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-xs font-medium text-orange-900 mb-2">Demo Credentials:</p>
                        <div className="text-xs text-orange-700 space-y-1">
                          <p><span className="font-medium">Email:</span> tech@company.com</p>
                          <p><span className="font-medium">Password:</span> any password</p>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Admin Login Form */}
                  {activeTab === "admin" && (
                    <form onSubmit={handleAdminLogin} className="space-y-5">
                      {/* Error Message */}
                      {adminError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">{adminError}</p>
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Username
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showAdminPassword ? "text" : "password"}
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            onClick={() => setShowAdminPassword(!showAdminPassword)}
                          >
                            {showAdminPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#1e293b] transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                      >
                        <LogIn className="w-5 h-5" />
                        Sign In as Admin
                      </button>

                      {/* Admin Demo Credentials */}
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs font-medium text-blue-900 mb-2">Demo Credentials:</p>
                        <div className="text-xs text-blue-700 space-y-1">
                          <p><span className="font-medium">Username:</span> admin</p>
                          <p><span className="font-medium">Password:</span> password@1</p>
                        </div>
                      </div>
                    </form>
                  )}

                </div>
              </>
            ) : (
              <>
                <div className="p-8">

                  {/* Staff Login Form */}
                  {activeTab === "staff" && (
                    <>
                      <form onSubmit={handleStaffLogin} className="space-y-5">
                        
                        <div className="space-y-4">
                            {/* for all role */}
                            <Field
                                label="Full Name"
                                placeholder="Enter name"
                                value={user.usr_name}
                                onChange={(e) => setUser({ ...user, usr_name: e.target.value })}
                            />
              
                            <Field
                                label="Phone Number"
                                placeholder="Enter phone number"
                                value={user.usr_phoneNo}
                                onChange={(e) => setUser({ ...user, usr_phoneNo: e.target.value })}
                            />
              
                            <Field
                                label="Email"
                                placeholder="Enter email"
                                value={user.usr_email}
                                onChange={(e) => setUser({ ...user, usr_email: e.target.value })}
                            />
              
                            <Field
                                label="Company"
                                placeholder="Enter company"
                                value={user.usr_company}
                                onChange={(e) => setUser({ ...user, usr_company: e.target.value })}
                            />
              
                            <Field
                                label="Username"
                                placeholder="Enter username"
                                value={user.usr_username}
                                onChange={(e) => setUser({ ...user, usr_username: e.target.value })}
                            />
              
                            <Field
                                label="Password"
                                placeholder="Enter password"
                                value={user.usr_password}
                                onChange={(e) => setUser({ ...user, usr_password: e.target.value })}
                                type="password"
                            />
                            <Field
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                value={password2}
                                onChange={(e) => setPassword2( e.target.value )}
                                type="password"
                            />
                        </div>

                        <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#d97706] to-[#ea580c] text-white rounded-lg font-medium hover:from-[#ea580c] hover:to-[#d97706] transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                          <UserPlusIcon className="w-5 h-5" />
                          Create Account
                        </button>
                      </form>

                      
                        <p className="text-center text-sm mt-3">
                            Already have an account?{" "}
                            <span onClick={() => setType('login')} className="text-secondary underline cursor-pointer font-medium">
                                Sign In
                            </span>
                        </p>
                      </>
                  )}

                  {/* Admin Login Form */}
                  {activeTab === "admin" && (
                    <form onSubmit={handleAdminLogin} className="space-y-5">
                      {/* Error Message */}
                      {adminError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <p className="text-sm">{adminError}</p>
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Username
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={adminUsername}
                            onChange={(e) => setAdminUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showAdminPassword ? "text" : "password"}
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            onClick={() => setShowAdminPassword(!showAdminPassword)}
                          >
                            {showAdminPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#1e3a8a] text-white rounded-lg font-medium hover:bg-[#1e293b] transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                      >
                        <LogIn className="w-5 h-5" />
                        Sign In as Admin
                      </button>
                    </form>
                  )}

                </div>
              </>
            )}
            
          </div>

        {/* Footer */}
        <div>
          <p className="text-center text-sm text-blue-100 mt-6">
            © 2026 Enterprise LMS. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <p className="text-xs text-blue-200">Powered by</p>
            <img src={exibyteLog} alt="Exibyte" className="h-6 w-auto" />
          </div>
        </div>

      </div>
    </div>
  );

}