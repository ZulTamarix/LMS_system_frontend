import { useNavigate } from "react-router";
import { Mail, Lock, GraduationCap } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/mobile/home");
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#1e3a8a] to-[#1e293b] p-6 sm:p-8">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 text-[#1e3a8a]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">LearnHub</h1>
          <p className="text-sm sm:text-base text-blue-100">Your Corporate Learning Platform</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white block mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="email"
                placeholder="email@company.com"
                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                defaultValue="user@company.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-white block mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-[#d97706]"
                defaultValue="password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#d97706] text-white rounded-xl font-medium hover:bg-[#ea580c] transition-colors mt-6"
          >
            Sign In
          </button>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-100 hover:text-white">
              Forgot password?
            </a>
          </div>
        </form>
      </div>

      <p className="text-center text-xs text-blue-200 mt-8">
        © 2026 LearnHub. All rights reserved.
      </p>
    </div>
  );
}