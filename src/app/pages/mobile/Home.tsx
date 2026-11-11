import { useNavigate } from "react-router";
import { BookOpen, Award, FileCheck, Bell, User, ChevronRight, Play, Clock } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: "Battery Replacement SOP", progress: 75, duration: "20 mins", type: "Mandatory" },
    { id: 2, title: "Emergency Jumpstart Procedures", progress: 30, duration: "15 mins", type: "Field Critical" },
    { id: 4, title: "Roadside Assistance Protocol", progress: 90, duration: "30 mins", type: "Mandatory" },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e293b] px-4 sm:px-6 pt-10 sm:pt-12 pb-6 sm:pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <p className="text-blue-100 text-xs sm:text-sm">Welcome back,</p>
            <h1 className="text-white text-xl sm:text-2xl font-semibold">John Doe</h1>
          </div>
          <button 
            onClick={() => navigate("/mobile/notifications")}
            className="relative p-2 bg-white/10 rounded-full"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#d97706] rounded-full"></span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center">
            <p className="text-xl sm:text-2xl font-semibold text-white">12</p>
            <p className="text-xs text-blue-100 mt-1">Courses</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center">
            <p className="text-xl sm:text-2xl font-semibold text-white">8</p>
            <p className="text-xs text-blue-100 mt-1">Completed</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center">
            <p className="text-xl sm:text-2xl font-semibold text-white">4</p>
            <p className="text-xs text-blue-100 mt-1">Certificates</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button className="bg-white rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#1e3a8a]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900">My Courses</span>
          </button>

          <button className="bg-white rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900">Certifications</span>
          </button>

          <button className="bg-white rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 rounded-full flex items-center justify-center">
              <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#d97706]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900">Training Passport</span>
          </button>

          <button className="bg-white rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#1e3a8a]" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-900">Profile</span>
          </button>
        </div>

        {/* Mandatory Training */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Mandatory Training</h2>
            <button className="text-xs sm:text-sm text-[#1e3a8a]">View All</button>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 sm:p-5 text-white">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs sm:text-sm text-orange-100 mb-1">Due in 5 days</p>
                <h3 className="text-sm sm:text-base font-medium mb-2">Annual Safety Certification</h3>
                <p className="text-xs sm:text-sm text-orange-100">Complete before Feb 28, 2026</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <button className="w-full py-2 bg-white/20 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-medium mt-3">
              Start Now
            </button>
          </div>
        </div>

        {/* My Courses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-semibold text-gray-900">Continue Learning</h2>
            <button className="text-xs sm:text-sm text-[#1e3a8a]">View All</button>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => navigate(`/mobile/course/${course.id}`)}
                className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#1e3a8a]" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-medium text-gray-900 text-xs sm:text-sm">{course.title}</h3>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-2" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        course.type === 'Mandatory' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-[#1e3a8a]'
                      }`}>
                        {course.type}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900 font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-[#1e3a8a] h-1.5 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}