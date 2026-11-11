import { Search, Filter, Plus, Clock, Users, X, FileText, BookOpen, Video, Upload, Trash2, Edit2, GripVertical } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";

const courses = [
  { id: 1, title: "Battery Replacement SOP", category: "Mandatory", duration: "20 mins", enrolled: 450, completion: 92, status: "Active", description: "Step-by-step battery installation & safety handling", modules: 4, videos: 6, quizzes: 3, instructor: "John Smith", lastUpdated: "2024-02-15" },
  { id: 2, title: "Emergency Jumpstart Procedures", category: "Field Critical", duration: "15 mins", enrolled: 380, completion: 88, status: "Active", description: "Safe jumpstart methods during roadside emergencies", modules: 3, videos: 5, quizzes: 2, instructor: "Sarah Williams", lastUpdated: "2024-02-10" },
  { id: 3, title: "Battery vs Alternator Diagnosis", category: "Advanced", duration: "25 mins", enrolled: 290, completion: 75, status: "Active", description: "Identify root cause of vehicle starting issues", modules: 5, videos: 8, quizzes: 4, instructor: "Michael Chen", lastUpdated: "2024-02-20" },
  { id: 4, title: "Roadside Assistance Protocol", category: "Mandatory", duration: "30 mins", enrolled: 520, completion: 95, status: "Active", description: "End-to-end SOP from customer arrival to job completion", modules: 6, videos: 9, quizzes: 5, instructor: "Emily Rodriguez", lastUpdated: "2024-02-05" },
  { id: 5, title: "Customer Handling & Upselling", category: "Skills", duration: "15 mins", enrolled: 340, completion: 82, status: "Active", description: "Handling stressed customers + upsell premium batteries", modules: 4, videos: 6, quizzes: 3, instructor: "David Kim", lastUpdated: "2024-02-18" },
];

export default function Courses() {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showCourseDetailModal, setShowCourseDetailModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [editTab, setEditTab] = useState<"details" | "videos" | "quizzes" | "modules">("details");
  const [formData, setFormData] = useState({
    title: "",
    category: "Mandatory",
    duration: "",
    description: "",
    instructor: "",
    modules: "",
    videos: "",
    quizzes: "",
    enrollmentLimit: "",
    status: "Active",
  });

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setShowCourseDetailModal(true);
  };

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course);
    setShowCourseDetailModal(false);
    setShowEditCourseModal(true);
    setEditTab("details");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setShowAddCourseModal(false);
    // Reset form
    setFormData({
      title: "",
      category: "Mandatory",
      duration: "",
      description: "",
      instructor: "",
      modules: "",
      videos: "",
      quizzes: "",
      enrollmentLimit: "",
      status: "Active",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Manage training courses and content</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]" onClick={() => setShowAddCourseModal(true)}>
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={course.category === 'Mandatory' ? 'default' : 'secondary'}>
                  {course.category}
                </Badge>
                <span className={`text-xs px-2 py-1 rounded ${
                  course.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {course.status}
                </span>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolled}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completion</span>
                  <span className="font-medium text-gray-900">{course.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#1e3a8a] h-2 rounded-full transition-all"
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium" onClick={() => handleViewDetails(course)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Course</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowAddCourseModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Battery Replacement SOP"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    >
                      <option value="Mandatory">Mandatory</option>
                      <option value="Field Critical">Field Critical</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Skills">Skills</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 2h 30m"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Provide a detailed description of the course..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., John Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modules *</label>
                    <input
                      type="number"
                      name="modules"
                      value={formData.modules}
                      onChange={handleInputChange}
                      required
                      placeholder="8"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Videos *</label>
                    <input
                      type="number"
                      name="videos"
                      value={formData.videos}
                      onChange={handleInputChange}
                      required
                      placeholder="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quizzes *</label>
                    <input
                      type="number"
                      name="quizzes"
                      value={formData.quizzes}
                      onChange={handleInputChange}
                      required
                      placeholder="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Limit</label>
                    <input
                      type="number"
                      name="enrollmentLimit"
                      value={formData.enrollmentLimit}
                      onChange={handleInputChange}
                      placeholder="e.g., 500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  onClick={() => setShowAddCourseModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      {showCourseDetailModal && selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-md rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Course Details</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowCourseDetailModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="space-y-6">
                {/* Header Section */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant={selectedCourse.category === 'Mandatory' ? 'default' : 'secondary'}>
                      {selectedCourse.category}
                    </Badge>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      selectedCourse.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedCourse.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{selectedCourse.title}</h3>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-[#1e3a8a] mb-1">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{selectedCourse.duration}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-[#d97706] mb-1">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Enrolled</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{selectedCourse.enrolled}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-700 mb-1">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-sm font-medium">Completion</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{selectedCourse.completion}%</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-purple-700 mb-1">
                      <FileText className="w-5 h-5" />
                      <span className="text-sm font-medium">Modules</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{selectedCourse.modules}</p>
                  </div>
                </div>

                {/* Course Content */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Course Content</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Video Lessons</span>
                      </div>
                      <span className="font-medium text-gray-900">{selectedCourse.videos} videos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Quizzes</span>
                      </div>
                      <span className="font-medium text-gray-900">{selectedCourse.quizzes} assessments</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Learning Modules</span>
                      </div>
                      <span className="font-medium text-gray-900">{selectedCourse.modules} modules</span>
                    </div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">Instructor</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-[#1e40af]">
                        {selectedCourse.instructor.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedCourse.instructor}</p>
                      <p className="text-sm text-gray-600">Course Instructor</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="border border-gray-200 rounded-lg p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <p className="font-medium text-gray-900">{selectedCourse.lastUpdated}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Course ID</span>
                      <p className="font-medium text-gray-900">CRS-{String(selectedCourse.id).padStart(4, '0')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowCourseDetailModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => handleEditCourse(selectedCourse)}
                className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]"
              >
                Edit Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEditCourseModal && selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white/80 backdrop-blur-md rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Edit Course - {selectedCourse.title}</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowEditCourseModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 px-6">
              <div className="flex gap-6">
                <button
                  onClick={() => setEditTab("details")}
                  className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                    editTab === "details"
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Course Details
                </button>
                <button
                  onClick={() => setEditTab("videos")}
                  className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                    editTab === "videos"
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Video Lessons ({selectedCourse.videos})
                </button>
                <button
                  onClick={() => setEditTab("quizzes")}
                  className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                    editTab === "quizzes"
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Quizzes ({selectedCourse.quizzes})
                </button>
                <button
                  onClick={() => setEditTab("modules")}
                  className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                    editTab === "modules"
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Learning Modules ({selectedCourse.modules})
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Course Details Tab */}
              {editTab === "details" && (
                <div className="space-y-4 max-w-3xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                    <input
                      type="text"
                      defaultValue={selectedCourse.title}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        defaultValue={selectedCourse.category}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                      >
                        <option value="Mandatory">Mandatory</option>
                        <option value="Field Critical">Field Critical</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Skills">Skills</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                      <select
                        defaultValue={selectedCourse.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      defaultValue={selectedCourse.description}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                      <input
                        type="text"
                        defaultValue={selectedCourse.duration}
                        placeholder="e.g., 20 mins"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                      <input
                        type="text"
                        defaultValue={selectedCourse.instructor}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Limit</label>
                    <input
                      type="number"
                      placeholder="e.g., 500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e3a8a] focus:border-[#1e3a8a]"
                    />
                  </div>
                </div>
              )}

              {/* Video Lessons Tab */}
              {editTab === "videos" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Video Lessons</h3>
                      <p className="text-sm text-gray-600">Upload and manage video content for this course</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]">
                      <Upload className="w-4 h-4" />
                      Upload Video
                    </button>
                  </div>

                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#1e3a8a] transition-colors cursor-pointer">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-900 mb-1">Drop video files here or click to browse</p>
                    <p className="text-xs text-gray-500">Supported formats: MP4, MOV, AVI (Max 500MB)</p>
                  </div>

                  {/* Video List */}
                  <div className="space-y-3">
                    {[
                      { id: 1, title: "Battery Safety Fundamentals", duration: "5 min", size: "45 MB", status: "Published" },
                      { id: 2, title: "Proper Battery Removal Techniques", duration: "5 min", size: "52 MB", status: "Published" },
                      { id: 3, title: "Installation & Connection Steps", duration: "5 min", size: "48 MB", status: "Published" },
                      { id: 4, title: "Common Mistakes to Avoid", duration: "3 min", size: "32 MB", status: "Draft" },
                    ].map((video) => (
                      <div key={video.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Video className="w-5 h-5 text-[#1e3a8a]" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm">{video.title}</h4>
                          <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {video.duration}
                            </span>
                            <span>{video.size}</span>
                            <span className={`px-2 py-0.5 rounded-full ${
                              video.status === 'Published'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {video.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-200 rounded-lg">
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quizzes Tab */}
              {editTab === "quizzes" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Quizzes & Assessments</h3>
                      <p className="text-sm text-gray-600">Create and manage course assessments</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]">
                      <Plus className="w-4 h-4" />
                      Create Quiz
                    </button>
                  </div>

                  {/* Quiz List */}
                  <div className="space-y-3">
                    {[
                      { id: 1, title: "Battery Replacement Assessment", questions: 10, passingScore: 80, attempts: 245, avgScore: 87 },
                      { id: 2, title: "Safety Procedures Quiz", questions: 5, passingScore: 100, attempts: 198, avgScore: 92 },
                      { id: 3, title: "Tools & Equipment Knowledge", questions: 8, passingScore: 75, attempts: 167, avgScore: 81 },
                    ].map((quiz) => (
                      <div key={quiz.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                            <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                              <span>{quiz.questions} questions</span>
                              <span>Passing: {quiz.passingScore}%</span>
                              <span>{quiz.attempts} attempts</span>
                              <span className="text-green-600 font-medium">Avg: {quiz.avgScore}%</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-white">
                              Edit Questions
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>

                        {/* Question Preview */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-700 mb-2">Sample Questions:</p>
                          <div className="space-y-2">
                            <div className="text-xs text-gray-600 bg-white p-2 rounded">
                              1. What is the first step when replacing a vehicle battery?
                            </div>
                            <div className="text-xs text-gray-600 bg-white p-2 rounded">
                              2. Which terminal should be disconnected first?
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Modules Tab */}
              {editTab === "modules" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Learning Modules</h3>
                      <p className="text-sm text-gray-600">Organize course content into structured modules</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]">
                      <Plus className="w-4 h-4" />
                      Add Module
                    </button>
                  </div>

                  {/* Module List */}
                  <div className="space-y-3">
                    {[
                      {
                        id: 1,
                        title: "Module 1: Battery Safety Fundamentals",
                        items: 2,
                        itemsList: ["Video: Safety Introduction", "Quiz: Safety Check"],
                        status: "Published"
                      },
                      {
                        id: 2,
                        title: "Module 2: Battery Removal Process",
                        items: 3,
                        itemsList: ["Video: Removal Techniques", "Video: Tool Usage", "Practice: Hands-on Demo"],
                        status: "Published"
                      },
                      {
                        id: 3,
                        title: "Module 3: Installation Procedures",
                        items: 2,
                        itemsList: ["Video: Step-by-step Installation", "Quiz: Installation Assessment"],
                        status: "Published"
                      },
                      {
                        id: 4,
                        title: "Module 4: Final Assessment",
                        items: 1,
                        itemsList: ["Quiz: Comprehensive Exam"],
                        status: "Draft"
                      },
                    ].map((module) => (
                      <div key={module.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-purple-700" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{module.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                module.status === 'Published'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {module.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">{module.items} items in this module</p>

                            {/* Module Items */}
                            <div className="space-y-1.5">
                              {module.itemsList.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 bg-white px-3 py-2 rounded">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-200 rounded-lg">
                              <Edit2 className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowEditCourseModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}