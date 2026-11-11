import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Play, Clock, Award, CheckCircle } from "lucide-react";

export default function CourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const modules = [
    { id: 1, title: "Battery Safety Fundamentals", duration: "5 min", completed: true },
    { id: 2, title: "Proper Battery Removal Techniques", duration: "5 min", completed: true },
    { id: 3, title: "Installation & Connection Steps", duration: "5 min", completed: true },
    { id: 4, title: "Battery Replacement Assessment", duration: "5 min", completed: false },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 border-b border-gray-200">
        <button 
          onClick={() => navigate("/mobile/home")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="font-semibold text-gray-900">Course Details</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Video Preview */}
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 aspect-video flex items-center justify-center">
          <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-[#1e3a8a] ml-1" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="flex items-center justify-between text-xs text-white mb-1">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-1">
                <div className="bg-white h-1 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Course Info */}
          <div>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <span className="inline-block text-xs px-2 py-1 bg-red-100 text-red-700 rounded mb-2">
                  Mandatory
                </span>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Battery Replacement SOP
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Learn essential workplace safety procedures and protocols to ensure a safe working environment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                <Clock className="w-5 h-5 text-[#1e3a8a] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Duration</p>
                <p className="text-sm font-medium text-gray-900">2h 30m</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                <Award className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Certificate</p>
                <p className="text-sm font-medium text-gray-900">Yes</p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                <CheckCircle className="w-5 h-5 text-[#d97706] mx-auto mb-1" />
                <p className="text-xs text-gray-600">Completed</p>
                <p className="text-sm font-medium text-gray-900">60%</p>
              </div>
            </div>
          </div>

          {/* Course Modules */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Course Modules</h3>
            <div className="space-y-2">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`p-4 rounded-xl border transition-all ${
                    module.completed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      module.completed
                        ? 'bg-green-600'
                        : 'bg-gray-200'
                    }`}>
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {module.title}
                      </h4>
                      <p className="text-xs text-gray-600">{module.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full py-3 bg-[#1e3a8a] text-white rounded-xl font-medium hover:bg-[#1e293b] transition-colors">
            Continue Learning
          </button>

          {/* Quiz Button */}
          <button className="w-full py-3 bg-gradient-to-r from-[#d97706] to-[#ea580c] text-white rounded-xl font-medium hover:from-[#ea580c] hover:to-[#d97706] transition-colors">
            Take Quiz
          </button>

          {/* Certificate Button */}
          <button 
            onClick={() => navigate(`/mobile/certificate/${id}`)}
            className="w-full py-3 border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-xl font-medium hover:bg-blue-50 transition-colors"
          >
            View Certificate
          </button>
        </div>
      </div>
    </div>
  );
}