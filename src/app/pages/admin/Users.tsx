import { Search, Filter, Plus, MoreVertical, X, Eye } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";

const users = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@company.com", role: "Manager", department: "Sales", status: "Active", courses: 12, jobTitle: "Sales Manager", phone: "+1 (555) 234-5678", assignedCourses: [1, 2, 3, 4] },
  { id: 2, name: "Michael Chen", email: "michael.c@company.com", role: "Employee", department: "Engineering", status: "Active", courses: 8, jobTitle: "Senior Developer", phone: "+1 (555) 345-6789", assignedCourses: [1, 3, 5] },
  { id: 3, name: "Emily Rodriguez", email: "emily.r@company.com", role: "Employee", department: "Marketing", status: "Active", courses: 15, jobTitle: "Marketing Specialist", phone: "+1 (555) 456-7890", assignedCourses: [1, 2, 3, 4, 5] },
  { id: 4, name: "David Kim", email: "david.k@company.com", role: "Admin", department: "HR", status: "Active", courses: 20, jobTitle: "HR Administrator", phone: "+1 (555) 567-8901", assignedCourses: [1, 2, 3, 4, 5] },
  { id: 5, name: "Lisa Anderson", email: "lisa.a@company.com", role: "Manager", department: "Operations", status: "Inactive", courses: 5, jobTitle: "Operations Manager", phone: "+1 (555) 678-9012", assignedCourses: [1, 2] },
];

const availableCourses = [
  { id: 1, title: "Battery Replacement SOP", category: "Mandatory" },
  { id: 2, title: "Emergency Jumpstart Procedures", category: "Field Critical" },
  { id: 3, title: "Battery vs Alternator Diagnosis", category: "Advanced" },
  { id: 4, title: "Roadside Assistance Protocol", category: "Mandatory" },
  { id: 5, title: "Customer Handling & Upselling", category: "Skills" },
];

export default function Users() {

  // #region 1) -> useState
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [showUserDetailModal, setShowUserDetailModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editFormData, setEditFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "Employee",
      department: "",
      jobTitle: "",
      status: "Active",
      courses: [] as number[],
    });
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "Employee",
      department: "",
      jobTitle: "",
      employeeId: "",
      password: "",
      status: "Active",
      courses: [] as number[],
    });
  // #endregion


  // #region 2) -> method
    const handleViewUser = (user: any) => {
      setSelectedUser(user);
      setIsEditMode(false);
      setShowUserDetailModal(true);
    };

    const handleEditUser = () => {
      if (selectedUser) {
        const [firstName, ...lastNameParts] = selectedUser.name.split(" ");
        const lastName = lastNameParts.join(" ");
        setEditFormData({
          firstName,
          lastName,
          email: selectedUser.email,
          phone: selectedUser.phone,
          role: selectedUser.role,
          department: selectedUser.department,
          jobTitle: selectedUser.jobTitle,
          status: selectedUser.status,
          courses: selectedUser.assignedCourses || [],
        });
        setIsEditMode(true);
      }
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditCourseToggle = (courseId: number) => {
      setEditFormData(prev => ({
        ...prev,
        courses: prev.courses.includes(courseId)
          ? prev.courses.filter(id => id !== courseId)
          : [...prev.courses, courseId]
      }));
    };

    const handleSaveEdit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle save edit
      console.log("User updated:", editFormData);
      setIsEditMode(false);
      // Update selectedUser with new data
      const updatedUser = {
        ...selectedUser,
        name: `${editFormData.firstName} ${editFormData.lastName}`,
        email: editFormData.email,
        phone: editFormData.phone,
        role: editFormData.role,
        department: editFormData.department,
        jobTitle: editFormData.jobTitle,
        status: editFormData.status,
        assignedCourses: editFormData.courses,
        courses: editFormData.courses.length,
      };
      setSelectedUser(updatedUser);
    };

    const handleCancelEdit = () => {
      setIsEditMode(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCourseToggle = (courseId: number) => {
      setFormData(prev => ({
        ...prev,
        courses: prev.courses.includes(courseId)
          ? prev.courses.filter(id => id !== courseId)
          : [...prev.courses, courseId]
      }));
    };

    const generateEmployeeId = () => {
      // Generate a unique employee ID (format: EMP-XXXX)
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      return `EMP-${randomNum}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Generate employee ID automatically
      const employeeId = generateEmployeeId();
      const submissionData = { ...formData, employeeId };
      // Handle form submission
      console.log("Form submitted:", submissionData);
      setShowAddUserModal(false);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "Employee",
        department: "",
        jobTitle: "",
        employeeId: "",
        password: "",
        status: "Active",
        courses: [],
      });
    };
  // #endregion


  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Users</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Manage employee accounts and permissions</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]" onClick={() => setShowAddUserModal(true)}>
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Role
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Department
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Courses
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-[#1e40af]">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span className="text-sm text-gray-900">{user.role}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className="text-sm text-gray-900">{user.department}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="text-sm text-gray-900">{user.courses} courses</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => handleViewUser(user)}>
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div onClick={() => setShowAddUserModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add User</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => setShowAddUserModal(false)}>
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Technician">Technician</option>
                    <option value="Rider">Rider</option>
                    <option value="Retail Staff">Retail Staff</option>
                    <option value="Management">Management</option>
                    <option value="Warehouse Staff">Warehouse Staff</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Engineering, Sales"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Developer"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID *</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., EMP-001"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Courses</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableCourses.map(course => (
                      <div key={course.id} className="flex items-center">
                        <input
                          type="checkbox"
                          name="courses"
                          value={course.id}
                          checked={formData.courses.includes(course.id)}
                          onChange={() => handleCourseToggle(course.id)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-900">{course.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showUserDetailModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">{isEditMode ? 'Edit User' : 'User Details'}</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => { setShowUserDetailModal(false); setIsEditMode(false); }}>
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {!isEditMode ? (
              // View Mode
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                    <p className="text-base text-gray-900">{selectedUser.name.split(' ')[0]}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                    <p className="text-base text-gray-900">{selectedUser.name.split(' ').slice(1).join(' ')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="text-base text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                    <p className="text-base text-gray-900">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                    <p className="text-base text-gray-900">{selectedUser.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                    <p className="text-base text-gray-900">{selectedUser.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Job Title</label>
                    <p className="text-base text-gray-900">{selectedUser.jobTitle}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Employee ID</label>
                    <p className="text-base text-gray-900">EMP-{String(selectedUser.id).padStart(4, '0')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                    <Badge variant={selectedUser.status === 'Active' ? 'default' : 'secondary'}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Total Courses</label>
                    <p className="text-base text-gray-900">{selectedUser.courses} courses</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Assigned Courses</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.assignedCourses?.map((courseId: number) => {
                        const course = availableCourses.find(c => c.id === courseId);
                        return course ? (
                          <Badge key={courseId} variant={course.category === 'Mandatory' ? 'default' : 'secondary'}>
                            {course.title}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Account Created</label>
                    <p className="text-base text-gray-900">January 15, 2024</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Last Login</label>
                    <p className="text-base text-gray-900">March 3, 2026 at 2:45 PM</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setShowUserDetailModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleEditUser}
                    className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]"
                  >
                    Edit User
                  </button>
                </div>
              </>
            ) : (
              // Edit Mode
              <form onSubmit={handleSaveEdit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editFormData.firstName}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editFormData.lastName}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <select
                      name="role"
                      value={editFormData.role}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    >
                      <option value="Employee">Employee</option>
                      <option value="Technician">Technician</option>
                      <option value="Rider">Rider</option>
                      <option value="Retail Staff">Retail Staff</option>
                      <option value="Management">Management</option>
                      <option value="Warehouse Staff">Warehouse Staff</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={editFormData.department}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={editFormData.jobTitle}
                      onChange={handleEditInputChange}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                    <input
                      type="text"
                      value={`EMP-${String(selectedUser.id).padStart(4, '0')}`}
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleEditInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Courses</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                      {availableCourses.map(course => (
                        <div key={course.id} className="flex items-start">
                          <input
                            type="checkbox"
                            id={`edit-course-${course.id}`}
                            checked={editFormData.courses.includes(course.id)}
                            onChange={() => handleEditCourseToggle(course.id)}
                            className="mt-1 mr-2"
                          />
                          <label htmlFor={`edit-course-${course.id}`} className="text-sm text-gray-900 cursor-pointer">
                            {course.title}
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                              course.category === 'Mandatory' 
                                ? 'bg-blue-100 text-blue-700' 
                                : course.category === 'Professional'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {course.category}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}