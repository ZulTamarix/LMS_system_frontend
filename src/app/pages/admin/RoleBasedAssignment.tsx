import { useState } from "react";
import { Search, Plus, Save, Settings2 } from "lucide-react";

const roles = ["Rider", "Technician", "Retail Staff", "Management", "Warehouse Staff"];

const courses = [
  { id: 1, name: "Battery Replacement SOP", duration: "20 mins", mandatory: true },
  { id: 2, name: "Emergency Jumpstart Procedures", duration: "15 mins", mandatory: true },
  { id: 3, name: "Battery vs Alternator Diagnosis", duration: "25 mins", mandatory: false },
  { id: 4, name: "Roadside Assistance Protocol", duration: "30 mins", mandatory: true },
  { id: 5, name: "Customer Handling & Upselling", duration: "15 mins", mandatory: false },
];

// Role-course assignment matrix
const initialAssignments = {
  "Rider": [1, 2, 4, 5],
  "Technician": [1, 2, 3, 4, 5],
  "Retail Staff": [1, 4, 5],
  "Management": [4, 5],
  "Warehouse Staff": [1, 4],
};

export default function RoleBasedAssignment() {
  const [selectedRole, setSelectedRole] = useState("Rider");
  const [assignments, setAssignments] = useState(initialAssignments);
  const [autoAssignment, setAutoAssignment] = useState(true);
  const [recurringCompliance, setRecurringCompliance] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCourseAssignment = (role: string, courseId: number) => {
    setAssignments((prev) => {
      const roleAssignments = prev[role as keyof typeof prev] || [];
      const isAssigned = roleAssignments.includes(courseId);
      
      return {
        ...prev,
        [role]: isAssigned
          ? roleAssignments.filter((id) => id !== courseId)
          : [...roleAssignments, courseId],
      };
    });
  };

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Role-Based Assignment</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Assign training courses to employee roles</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors text-sm md:text-base">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">Auto-Assignment</h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">Automatically assign courses to new employees based on their role</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoAssignment}
                onChange={(e) => setAutoAssignment(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3a8a]"></div>
            </label>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">Recurring Compliance Training</h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">Require employees to retake compliance courses annually</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={recurringCompliance}
                onChange={(e) => setRecurringCompliance(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1e3a8a]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">Select Role</h3>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg text-sm md:text-base transition-colors ${
                selectedRole === role
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Training Matrix */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base">Training Matrix</h3>
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Course Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Type</th>
                {roles.map((role) => (
                  <th key={role} className="text-center py-3 px-4 text-sm font-semibold text-gray-900">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">{course.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{course.duration}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      course.mandatory
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {course.mandatory ? "Mandatory" : "Optional"}
                    </span>
                  </td>
                  {roles.map((role) => (
                    <td key={role} className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={(assignments[role as keyof typeof assignments] || []).includes(course.id)}
                        onChange={() => toggleCourseAssignment(role, course.id)}
                        className="w-4 h-4 text-[#1e3a8a] bg-gray-100 border-gray-300 rounded focus:ring-[#1e40af] focus:ring-2"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{course.name}</h4>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-600">{course.duration}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    course.mandatory
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {course.mandatory ? "Mandatory" : "Optional"}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Assigned to:</p>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => {
                    const isAssigned = (assignments[role as keyof typeof assignments] || []).includes(course.id);
                    return (
                      <button
                        key={role}
                        onClick={() => toggleCourseAssignment(role, course.id)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          isAssigned
                            ? "bg-[#1e3a8a] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
