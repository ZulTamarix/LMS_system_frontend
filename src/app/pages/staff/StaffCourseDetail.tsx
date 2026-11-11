import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Play, Clock, Award, CheckCircle, BookOpen, Video, FileText, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const coursesData = [
  {
    id: 1,
    title: "Battery Replacement SOP",
    category: "Mandatory",
    duration: "20 mins",
    description: "Step-by-step battery installation & safety handling",
    instructor: "John Smith",
    modules: [
      { id: 1, title: "Battery Safety Fundamentals", duration: "5 min", type: "video", completed: false },
      { id: 2, title: "Proper Battery Removal Techniques", duration: "5 min", type: "video", completed: false },
      { id: 3, title: "Installation & Connection Steps", duration: "5 min", type: "video", completed: false },
      { id: 4, title: "Battery Replacement Assessment", duration: "5 min", type: "quiz", completed: false },
    ]
  },
  {
    id: 2,
    title: "Emergency Jumpstart Procedures",
    category: "Field Critical",
    duration: "15 mins",
    description: "Safe jumpstart methods during roadside emergencies",
    instructor: "Sarah Williams",
    modules: [
      { id: 1, title: "Jumpstart Safety Protocols", duration: "5 min", type: "video", completed: false },
      { id: 2, title: "Cable Connection Sequence", duration: "5 min", type: "video", completed: false },
      { id: 3, title: "Jumpstart Procedures Quiz", duration: "5 min", type: "quiz", completed: false },
    ]
  },
  {
    id: 3,
    title: "Battery vs Alternator Diagnosis",
    category: "Advanced",
    duration: "25 mins",
    description: "Identify root cause of vehicle starting issues",
    instructor: "Michael Chen",
    modules: [
      { id: 1, title: "Understanding Electrical Systems", duration: "7 min", type: "video", completed: false },
      { id: 2, title: "Diagnostic Testing Methods", duration: "7 min", type: "video", completed: false },
      { id: 3, title: "Identifying Battery vs Alternator Faults", duration: "6 min", type: "video", completed: false },
      { id: 4, title: "Diagnosis Assessment", duration: "5 min", type: "quiz", completed: false },
    ]
  },
  {
    id: 4,
    title: "Roadside Assistance Protocol",
    category: "Mandatory",
    duration: "30 mins",
    description: "End-to-end SOP from customer arrival to job completion",
    instructor: "Emily Rodriguez",
    modules: [
      { id: 1, title: "Customer Arrival & Assessment", duration: "5 min", type: "video", completed: false },
      { id: 2, title: "Safety Protocols & Site Setup", duration: "5 min", type: "video", completed: false },
      { id: 3, title: "Service Execution Steps", duration: "7 min", type: "video", completed: false },
      { id: 4, title: "Documentation & Payment", duration: "6 min", type: "video", completed: false },
      { id: 5, title: "Post-Service Procedures", duration: "4 min", type: "video", completed: false },
      { id: 6, title: "Roadside Protocol Assessment", duration: "3 min", type: "quiz", completed: false },
    ]
  },
  {
    id: 5,
    title: "Customer Handling & Upselling",
    category: "Skills",
    duration: "15 mins",
    description: "Handling stressed customers + upsell premium batteries",
    instructor: "David Kim",
    modules: [
      { id: 1, title: "Managing Stressed Customers", duration: "5 min", type: "video", completed: false },
      { id: 2, title: "Premium Battery Benefits", duration: "4 min", type: "video", completed: false },
      { id: 3, title: "Effective Upselling Techniques", duration: "4 min", type: "video", completed: false },
      { id: 4, title: "Customer Service Quiz", duration: "2 min", type: "quiz", completed: false },
    ]
  },
];

export default function StaffCourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id || "1");
  
  const course = coursesData.find(c => c.id === courseId) || coursesData[0];
  
  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem(`course_${courseId}_modules`);
    return saved ? JSON.parse(saved) : course.modules;
  });

  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    localStorage.setItem(`course_${courseId}_modules`, JSON.stringify(modules));
    
    // Calculate progress
    const completedCount = modules.filter((m: any) => m.completed).length;
    const progress = Math.round((completedCount / modules.length) * 100);
    localStorage.setItem(`courseProgress_${courseId}`, progress.toString());
  }, [modules, courseId]);

  const toggleModuleComplete = (moduleId: number) => {
    setModules((prev: any[]) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, completed: !m.completed } : m
      )
    );
  };

  const playModule = (moduleId: number) => {
    setCurrentModule(moduleId);
    setIsPlaying(true);
  };

  const completedCount = modules.filter((m: any) => m.completed).length;
  const progress = Math.round((completedCount / modules.length) * 100);
  const allCompleted = progress === 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-16">
            <button 
              onClick={() => navigate("/staff/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <div>
              <h1 className="font-semibold text-gray-900">Course Details</h1>
              <p className="text-xs text-gray-600">{progress}% Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 aspect-video flex items-center justify-center">
                {!isPlaying ? (
                  <button 
                    onClick={() => currentModule && setIsPlaying(true)}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Play className="w-10 h-10 text-[#1e3a8a] ml-2" />
                  </button>
                ) : (
                  <div className="text-white text-center">
                    <Video className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-medium">
                      {currentModule && modules.find((m: any) => m.id === currentModule)?.title}
                    </p>
                    <p className="text-sm text-blue-200 mt-2">Video is playing...</p>
                  </div>
                )}
                
                {currentModule && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-3">
                      <div className="flex items-center justify-between text-xs text-white mb-2">
                        <span>Module Progress</span>
                        <span>{isPlaying ? "Playing" : "Paused"}</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-1.5">
                        <div 
                          className="bg-white h-1.5 rounded-full transition-all" 
                          style={{ width: isPlaying ? '65%' : '0%' }} 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {currentModule && isPlaying && (
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      toggleModuleComplete(currentModule);
                      setIsPlaying(false);
                      // Auto-advance to next module
                      const currentIndex = modules.findIndex((m: any) => m.id === currentModule);
                      if (currentIndex < modules.length - 1) {
                        setCurrentModule(modules[currentIndex + 1].id);
                      }
                    }}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Complete & Continue
                  </button>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className={`inline-block text-xs px-3 py-1 rounded-full mb-3 ${
                    course.category === 'Mandatory'
                      ? 'bg-red-100 text-red-700'
                      : course.category === 'Field Critical'
                      ? 'bg-orange-100 text-orange-700'
                      : course.category === 'Advanced'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {course.category}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Instructor:</span>
                    <span>{course.instructor}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-6 h-6 text-[#1e3a8a] mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Duration</p>
                  <p className="text-sm font-medium text-gray-900">{course.duration}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Modules</p>
                  <p className="text-sm font-medium text-gray-900">{modules.length}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-1">Completed</p>
                  <p className="text-sm font-medium text-gray-900">{completedCount}/{modules.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Overall Progress</h3>
              <div className="space-y-4">
                <div className="relative">
                  <svg className="w-32 h-32 mx-auto" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#1e3a8a"
                      strokeWidth="10"
                      strokeDasharray={`${progress * 3.14} 314`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                    <text
                      x="60"
                      y="60"
                      textAnchor="middle"
                      dy="7"
                      className="text-2xl font-bold fill-gray-900"
                    >
                      {progress}%
                    </text>
                  </svg>
                </div>
                <div className="text-center text-sm text-gray-600">
                  {completedCount} of {modules.length} modules completed
                </div>
              </div>

              {allCompleted && (
                <button
                  onClick={() => navigate(`/staff/certificate/${courseId}`)}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-[#d97706] to-[#ea580c] text-white rounded-xl font-medium hover:from-[#ea580c] hover:to-[#d97706] transition-colors flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Get Certificate
                </button>
              )}
            </div>

            {/* Course Modules */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Course Modules</h3>
              <div className="space-y-3">
                {modules.map((module: any, index: number) => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      module.completed
                        ? 'bg-green-50 border-green-200'
                        : currentModule === module.id
                        ? 'bg-blue-50 border-blue-300'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => !module.completed && playModule(module.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        module.completed
                          ? 'bg-green-600'
                          : currentModule === module.id
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}>
                        {module.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : module.type === 'quiz' ? (
                          <FileText className="w-4 h-4 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500">
                            Module {index + 1}
                          </span>
                          {module.type === 'quiz' && (
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
                              Quiz
                            </span>
                          )}
                        </div>
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

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Need Help?</h4>
                  <p className="text-xs text-blue-700">
                    Contact support if you have questions about this course.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
