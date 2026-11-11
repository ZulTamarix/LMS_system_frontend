import { useNavigate } from "react-router";
import { BookOpen, Award, CheckCircle, Clock, PlayCircle, TrendingUp, Bell, User, LogOut, Search, Filter, MapPin, Target, Download, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import exibyteLogo from "figma:asset/a4cfe9bd1927990d0a64f23cf7f0aeef602f8fa0.png";

const availableCourses = [
  {
    id: 1,
    title: "Battery Replacement SOP",
    category: "Mandatory",
    duration: "20 mins",
    enrolled: false,
    progress: 0,
    description: "Step-by-step battery installation & safety handling",
    modules: 4,
    deadline: "2026-04-20",
    learningPath: "Roadside Technician Core"
  },
  {
    id: 2,
    title: "Emergency Jumpstart Procedures",
    category: "Field Critical",
    duration: "15 mins",
    enrolled: false,
    progress: 0,
    description: "Safe jumpstart methods during roadside emergencies",
    modules: 3,
    deadline: "2026-04-20",
    learningPath: "Roadside Technician Core"
  },
  {
    id: 3,
    title: "Battery vs Alternator Diagnosis",
    category: "Advanced",
    duration: "25 mins",
    enrolled: false,
    progress: 0,
    description: "Identify root cause of vehicle starting issues",
    modules: 5,
    deadline: null,
    learningPath: "Advanced Diagnostics"
  },
  {
    id: 4,
    title: "Roadside Assistance Protocol",
    category: "Mandatory",
    duration: "30 mins",
    enrolled: false,
    progress: 0,
    description: "End-to-end SOP from customer arrival to job completion",
    modules: 6,
    deadline: "2026-04-25",
    learningPath: "Roadside Technician Core"
  },
  {
    id: 5,
    title: "Customer Handling & Upselling",
    category: "Skills",
    duration: "15 mins",
    enrolled: false,
    progress: 0,
    description: "Handling stressed customers + upsell premium batteries",
    modules: 4,
    deadline: null,
    learningPath: "Customer Service Excellence"
  },
];

const learningPaths = [
  {
    id: 1,
    name: "Roadside Technician Core",
    description: "Essential skills for roadside assistance technicians",
    icon: "🔋",
    requiredCourses: [1, 2, 4],
    color: "blue"
  },
  {
    id: 2,
    name: "Advanced Diagnostics",
    description: "Master vehicle electrical system troubleshooting",
    icon: "🔧",
    requiredCourses: [3],
    color: "purple"
  },
  {
    id: 3,
    name: "Customer Service Excellence",
    description: "Enhance customer interaction and sales skills",
    icon: "💬",
    requiredCourses: [5],
    color: "green"
  },
];

export default function StaffDashboard() {
  const navigate = useNavigate();
  const staffEmail = localStorage.getItem("staffEmail") || "technician@company.com";
  const staffRole = localStorage.getItem("staffRole") || "Technician";
  
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem("enrolledCourses");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState<"available" | "my-courses" | "certificates" | "passport">("passport");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const handleEnroll = (courseId: number) => {
    const newEnrolled = [...enrolledCourses, courseId];
    setEnrolledCourses(newEnrolled);
    localStorage.setItem("enrolledCourses", JSON.stringify(newEnrolled));
  };

  const handleLogout = () => {
    localStorage.removeItem("staffAuth");
    localStorage.removeItem("staffEmail");
    localStorage.removeItem("staffRole");
    navigate("/login");
  };

  const myCourses = availableCourses.filter(course => enrolledCourses.includes(course.id));
  const availableCoursesFiltered = availableCourses.filter(course => !enrolledCourses.includes(course.id));

  // Get course progress from localStorage
  const getCourseProgress = (courseId: number) => {
    const progress = localStorage.getItem(`courseProgress_${courseId}`);
    return progress ? parseInt(progress) : 0;
  };

  const completedCourses = myCourses.filter(course => getCourseProgress(course.id) === 100);

  // Filter function
  const filterCourses = (courses: typeof availableCourses) => {
    return courses.filter(course => {
      // Search filter
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      
      // Status filter
      let matchesStatus = true;
      if (selectedStatus === "Enrolled") {
        matchesStatus = enrolledCourses.includes(course.id);
      } else if (selectedStatus === "Not Enrolled") {
        matchesStatus = !enrolledCourses.includes(course.id);
      } else if (selectedStatus === "Completed") {
        matchesStatus = getCourseProgress(course.id) === 100;
      } else if (selectedStatus === "In Progress") {
        matchesStatus = enrolledCourses.includes(course.id) && getCourseProgress(course.id) > 0 && getCourseProgress(course.id) < 100;
      }
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  // Calculate learning path progress
  const getLearningPathProgress = (pathId: number) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return 0;
    
    const completedInPath = path.requiredCourses.filter(courseId => 
      getCourseProgress(courseId) === 100
    ).length;
    
    return Math.round((completedInPath / path.requiredCourses.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a8a] to-[#d97706] rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Staff Portal</h1>
                <p className="text-xs text-gray-600">{staffRole}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {staffEmail.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{staffEmail}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-[#1e3a8a]" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">{myCourses.length}</p>
            <p className="text-sm text-gray-600">Enrolled Courses</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">{completedCourses.length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-[#d97706]" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">{completedCourses.length}</p>
            <p className="text-sm text-gray-600">Certificates</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {myCourses.length > 0 ? Math.round(myCourses.reduce((acc, course) => acc + getCourseProgress(course.id), 0) / myCourses.length) : 0}%
            </p>
            <p className="text-sm text-gray-600">Avg. Progress</p>
          </div>
        </div>

        {/* Tabs & Search/Filter */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 pt-4">
              <div className="flex gap-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("passport")}
                  className={`py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === "passport"
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Training Passport
                </button>
                <button
                  onClick={() => setActiveTab("my-courses")}
                  className={`py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === "my-courses"
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My Courses ({myCourses.length})
                </button>
                <button
                  onClick={() => setActiveTab("available")}
                  className={`py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === "available"
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Available Courses ({availableCoursesFiltered.length})
                </button>
                <button
                  onClick={() => setActiveTab("certificates")}
                  className={`py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === "certificates"
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My Certificates ({completedCourses.length})
                </button>
              </div>
            </div>

            {/* Search and Filter Bar */}
            {activeTab !== "passport" && (
              <div className="px-6 pb-4 pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                      showFilters 
                        ? "bg-[#1e3a8a] text-white border-[#1e3a8a]" 
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                      >
                        <option>All</option>
                        <option>Mandatory</option>
                        <option>Field Critical</option>
                        <option>Advanced</option>
                        <option>Skills</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                      >
                        <option>All</option>
                        <option>Enrolled</option>
                        <option>Not Enrolled</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-6">
            {/* Training Passport Tab */}
            {activeTab === "passport" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1e3a8a] to-[#d97706] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Training Passport</h2>
                      <p className="text-gray-700 mb-4">
                        Track your progress across different learning paths. Complete all required courses in each path to earn certifications and advance your career.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#1e3a8a]">{learningPaths.length}</p>
                          <p className="text-sm text-gray-600">Learning Paths</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{learningPaths.filter(p => getLearningPathProgress(p.id) === 100).length}</p>
                          <p className="text-sm text-gray-600">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{learningPaths.filter(p => getLearningPathProgress(p.id) > 0 && getLearningPathProgress(p.id) < 100).length}</p>
                          <p className="text-sm text-gray-600">In Progress</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-600">{availableCourses.length}</p>
                          <p className="text-sm text-gray-600">Total Courses</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Paths */}
                <div className="space-y-6">
                  {learningPaths.map((path) => {
                    const progress = getLearningPathProgress(path.id);
                    const pathCourses = availableCourses.filter(c => path.requiredCourses.includes(c.id));
                    const completedInPath = pathCourses.filter(c => getCourseProgress(c.id) === 100).length;
                    
                    return (
                      <div key={path.id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Path Header */}
                        <div className={`p-6 bg-gradient-to-r ${
                          path.color === 'red' ? 'from-red-50 to-red-100' :
                          path.color === 'blue' ? 'from-blue-50 to-blue-100' :
                          path.color === 'purple' ? 'from-purple-50 to-purple-100' :
                          'from-green-50 to-green-100'
                        }`}>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="text-4xl">{path.icon}</div>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">{path.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                              </div>
                            </div>
                            {progress === 100 && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                <CheckCircle className="w-4 h-4" />
                                Completed
                              </div>
                            )}
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-700 font-medium">
                                Progress: {completedInPath} of {pathCourses.length} courses completed
                              </span>
                              <span className="font-semibold text-gray-900">{progress}%</span>
                            </div>
                            <div className="w-full bg-white rounded-full h-3 border border-gray-200">
                              <div 
                                className={`h-3 rounded-full transition-all ${
                                  path.color === 'red' ? 'bg-red-600' :
                                  path.color === 'blue' ? 'bg-blue-600' :
                                  path.color === 'purple' ? 'bg-purple-600' :
                                  'bg-green-600'
                                }`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Path Courses */}
                        <div className="p-6">
                          <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-gray-600" />
                            Required Courses
                          </h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {pathCourses.map((course) => {
                              const courseProgress = getCourseProgress(course.id);
                              const isEnrolled = enrolledCourses.includes(course.id);
                              
                              return (
                                <div key={course.id} className={`border-2 rounded-xl p-4 transition-all ${
                                  courseProgress === 100 
                                    ? 'border-green-200 bg-green-50' 
                                    : isEnrolled
                                    ? 'border-blue-200 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}>
                                  <div className="flex items-start justify-between mb-2">
                                    <span className={`text-xs px-2 py-1 rounded ${
                                      course.category === 'Mandatory' 
                                        ? 'bg-red-100 text-red-700' 
                                        : course.category === 'Professional'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-green-100 text-green-700'
                                    }`}>
                                      {course.category}
                                    </span>
                                    {courseProgress === 100 && (
                                      <CheckCircle className="w-5 h-5 text-green-600" />
                                    )}
                                  </div>
                                  
                                  <h5 className="font-medium text-gray-900 mb-2 text-sm">{course.title}</h5>
                                  
                                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <BookOpen className="w-3 h-3" />
                                      <span>{course.modules} modules</span>
                                    </div>
                                  </div>

                                  {isEnrolled && (
                                    <div className="space-y-1 mb-3">
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-600">Progress</span>
                                        <span className="font-medium text-gray-900">{courseProgress}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div 
                                          className="bg-[#1e3a8a] h-1.5 rounded-full transition-all"
                                          style={{ width: `${courseProgress}%` }}
                                        />
                                      </div>
                                    </div>
                                  )}

                                  <button
                                    onClick={() => {
                                      if (!isEnrolled) {
                                        handleEnroll(course.id);
                                      } else {
                                        navigate(`/staff/course/${course.id}`);
                                      }
                                    }}
                                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                      courseProgress === 100
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : isEnrolled
                                        ? 'bg-[#1e3a8a] text-white hover:bg-[#1e293b]'
                                        : 'bg-gradient-to-r from-[#1e3a8a] to-[#d97706] text-white hover:from-[#1e293b] hover:to-[#ea580c]'
                                    }`}
                                  >
                                    {courseProgress === 100 ? (
                                      'View Certificate'
                                    ) : isEnrolled ? (
                                      courseProgress > 0 ? 'Continue' : 'Start Course'
                                    ) : (
                                      'Enroll Now'
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* My Courses Tab */}
            {activeTab === "my-courses" && (
              <div className="space-y-4">
                {filterCourses(myCourses).length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {myCourses.length === 0 ? "No Enrolled Courses" : "No courses match your filters"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {myCourses.length === 0 ? "Start learning by enrolling in available courses" : "Try adjusting your search or filters"}
                    </p>
                    {myCourses.length === 0 && (
                      <button
                        onClick={() => setActiveTab("available")}
                        className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]"
                      >
                        Browse Courses
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filterCourses(myCourses).map((course) => {
                      const progress = getCourseProgress(course.id);
                      return (
                        <div key={course.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <span className={`text-xs px-2 py-1 rounded ${
                              course.category === 'Mandatory' 
                                ? 'bg-red-100 text-red-700' 
                                : course.category === 'Professional'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {course.category}
                            </span>
                            {progress === 100 && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                          
                          <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.modules} modules</span>
                            </div>
                          </div>

                          {course.deadline && progress < 100 && (
                            <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                              Deadline: {new Date(course.deadline).toLocaleDateString()}
                            </div>
                          )}

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium text-gray-900">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#1e3a8a] h-2 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => navigate(`/staff/course/${course.id}`)}
                            className="w-full px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b] text-sm font-medium flex items-center justify-center gap-2"
                          >
                            {progress === 0 ? (
                              <>
                                <PlayCircle className="w-4 h-4" />
                                Start Course
                              </>
                            ) : progress === 100 ? (
                              <>
                                <Award className="w-4 h-4" />
                                View Certificate
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4" />
                                Continue Learning
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Available Courses Tab */}
            {activeTab === "available" && (
              <div className="space-y-4">
                {filterCourses(availableCoursesFiltered).length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {availableCoursesFiltered.length === 0 ? "All Courses Enrolled" : "No courses match your filters"}
                    </h3>
                    <p className="text-gray-600">
                      {availableCoursesFiltered.length === 0 ? "You're enrolled in all available courses!" : "Try adjusting your search or filters"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filterCourses(availableCoursesFiltered).map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <span className={`text-xs px-2 py-1 rounded ${
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
                        </div>
                        
                        <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.modules} modules</span>
                          </div>
                        </div>

                        {course.deadline && (
                          <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                            Deadline: {new Date(course.deadline).toLocaleDateString()}
                          </div>
                        )}

                        <button
                          onClick={() => {
                            handleEnroll(course.id);
                            setActiveTab("my-courses");
                          }}
                          className="w-full px-4 py-2 bg-gradient-to-r from-[#1e3a8a] to-[#d97706] text-white rounded-lg hover:from-[#1e293b] hover:to-[#ea580c] text-sm font-medium transition-all"
                        >
                          Enroll Now
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <div className="space-y-4">
                {completedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Yet</h3>
                    <p className="text-gray-600">Complete courses to earn certificates</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Certificates Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Your Certificates</h3>
                        <p className="text-sm text-gray-600">{completedCourses.length} certificate{completedCourses.length !== 1 ? 's' : ''} earned</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                        <Download className="w-4 h-4" />
                        Download All
                      </button>
                    </div>

                    {/* Certificate Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {completedCourses.map((course) => {
                        const completionDate = new Date();
                        const expiryDate = new Date(completionDate);
                        expiryDate.setFullYear(expiryDate.getFullYear() + 2);
                        const certificateId = `CERT-${course.id}-${Date.now().toString().slice(-6)}`;

                        return (
                          <div key={course.id} className="bg-white border-2 border-[#d97706] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Certificate Header */}
                            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#1e293b] p-5 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                              <div className="relative flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Award className="w-6 h-6 text-[#d97706]" />
                                    <span className="text-xs text-blue-200 font-medium">Certificate of Completion</span>
                                  </div>
                                  <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">{course.title}</h3>
                                  <p className="text-blue-200 text-xs">{staffEmail}</p>
                                </div>
                                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                              </div>
                            </div>

                            {/* Certificate Details */}
                            <div className="p-5 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-start gap-2">
                                  <Calendar className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-xs text-gray-600">Issue Date</p>
                                    <p className="text-sm font-medium text-gray-900">{completionDate.toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-xs text-gray-600">Valid Until</p>
                                    <p className="text-sm font-medium text-gray-900">{expiryDate.toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-gray-600">Certificate ID</p>
                                  <p className="text-sm font-medium text-gray-900">{certificateId}</p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2">
                                <button
                                  onClick={() => navigate(`/staff/certificate/${course.id}`)}
                                  className="flex-1 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b] text-sm font-medium flex items-center justify-center gap-2"
                                >
                                  <Award className="w-4 h-4" />
                                  View
                                </button>
                                <button
                                  onClick={() => {
                                    // In production, this would trigger PDF download
                                    alert(`Downloading certificate for ${course.title}...`);
                                  }}
                                  className="flex-1 px-4 py-2 bg-[#d97706] text-white rounded-lg hover:bg-[#ea580c] text-sm font-medium flex items-center justify-center gap-2"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </div>
  );
}