import { Search, Filter, Plus, MoreVertical, X, Eye } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useCallback, useEffect, useState } from "react";
import { User_type } from "../../interfaces/user";

const availableCourses = [
  { id: 1, title: "Battery Replacement SOP", category: "Mandatory" },
  { id: 2, title: "Emergency Jumpstart Procedures", category: "Field Critical" },
  { id: 3, title: "Battery vs Alternator Diagnosis", category: "Advanced" },
  { id: 4, title: "Roadside Assistance Protocol", category: "Mandatory" },
  { id: 5, title: "Customer Handling & Upselling", category: "Skills" },
];


import Table, { type Column } from "../../components/ui_2nd/Table";
import Grid from "../../components/ui_2nd/Grid";
import Form from "../../components/ui_2nd/Form";
import Field from "../../components/ui_2nd/Field";
import Button from "../../components/ui_2nd/Button";
import Searchbar from "../../components/ui_2nd/Searchbar";
import SplitPanel from "../../components/ui_2nd/SplitPanel";
import Alert from "../../components/ui_2nd/Alert";

import api from "../../api/axios";


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


    // searchbar
    const [searchDatabase, setSearchDatabase] = useState('')
    // detect error
    const [isAlert, setIs_alert] = useState(false);
    // spinner
    const [spinner, setSpinner] = useState(false)
    // loadin
    const [isLoading, setIsLoading] = useState(false)
    // crud
    const [crud, setCrud] = useState<'create'|'edit'|'view'>('create')
    // form
    const [formUser, setForm_user] = useState(false)
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


  // #endregion


  // #region 2) --> useEffect
      // reset fieldname everytime form_user closed
      useEffect(() => {
          if(!formUser) {
              setUser ({
                id: 0,
                usr_role: 'user',
                usr_name: '',
                usr_phoneNo: '',
                usr_email: '',
                usr_company: '',
                usr_username: '',
                usr_password: '',
                usr_status: 'active',
              })
          }
      }, [formUser])
  //#endregion


  // #region 3_old) -> method
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


  // #region 3) -> method

    // READ user
    useEffect(() => {
        fetchData_user()
    }, [])

    // CREATE user
    const handleCreate_user = async () => {

        // loading
        setIsLoading(true)

        // CREATE data
        try {
            await api.post(`/user`, user);

            fetchData_user()
            setForm_user(false)
        }
        catch(error) {
            console.error('Error:', error); // use only to remove warning on vscode
            // console.error('Response status:', error.response?.data);
        }
        finally {
            setIsLoading(false)
        }
    }

    // UPDATE user
    const handleUpdate_user = async () => {

        // loading
        setIsLoading(true)

        // UPDATE data
        try {
            await api.put(`/user/${user.id}`, user);
            fetchData_user()
            setForm_user(false)
        }
        catch(error) {
            console.error('Error:', error); // use only to remove warning on vscode
            // console.error('Response status:', error.response?.data);
        }
        finally {
            setIsLoading(false)
        }
    }

    // DELETE user
    const handleDelete_user = async () => {
        
        setIsLoading(true)

        // DELETE data
        try {
            await  api.delete(`/user/${user.id}`)

            fetchData_user()
            setForm_user(false)
            setIs_alert(false)
        }
        catch(error) {
            console.error('Error:', error); // use only to remove warning on vscode
            // console.error('Response status:', error.response?.data);
        }
        finally {
            setIsLoading(false)
        }
    }

  // #endregion


  // #region 4) --> database

      // fetch user
      const [databaseUser, setDatabase_user] = useState<User_type[]>([])
      const fetchData_user = useCallback(() => {
          
          // loading
          setSpinner(true)

          api.get(`/user`)
          .then((response) => {
              // console.log('response  = ',response.data.data)
              setDatabase_user(response.data.data);
          })
          .catch((error) => {
              console.error('Error fetching:', error);
          })
          .finally(() => {
              setSpinner(false)
          })
      }, []);

      // tableTitle
      const tableTitle_user: Column<User_type>[] = [
          {
              key: "1",
              header: "Name",
              render: (row) => 
                <span>{row.usr_name}</span>
          },
          {
              key: "2",
              header: "Phone number",
              render: (row) => 
                <span>{row.usr_phoneNo}</span>
          },
          {
              key: "3",
              header: "Email",
              render: (row) => 
                <span>{row.usr_email}</span>
          },
          {
              key: "4",
              header: "Company",
              render: (row) => 
                <span>{row.usr_company}</span>
          },
          {
              key: "5",
              header: "Status",
              render: (row) => (
                <>
                    {row.usr_status == 'active' ? (
                        <span className="py-1 px-2 rounded-full bg-green-100 text-green-600">Active</span>
                    ) : (
                        <span className="py-1 px-2 rounded-full bg-slate-100 text-slate-600">Inactive</span>
                    )} 
                </>
              )
          },
          
          {
              key: "",
              header: "Action",
              align: "center",
              render: (row) => (
                <div className="flex gap-3">
                    <button onClick={() => { setUser(row); setForm_user(true); setCrud('edit') }} className="border border-amber-400 text-amber-400 p-1 px-2 text-sm rounded-md cursor-pointer">
                        Edit
                    </button>
                    
                    <button onClick={() => { setUser(row); setIs_alert(true) }} className="border border-red-400 text-red-400 p-1 px-2 text-sm rounded-md cursor-pointer">
                        Delete
                    </button>
                </div>
              )
          },
      ];

  //#endregion


  //#region 5) --> searchbar
      const filteredUser = databaseUser.filter((data) => {
          const search = searchDatabase.toLowerCase().trim()

          return (
            data.usr_name?.toLowerCase().includes(search) ||
            data.usr_phoneNo?.toLowerCase().includes(search) ||
            data.usr_email?.toLowerCase().includes(search) ||
            data.usr_company?.toLowerCase().includes(search) ||
            data.usr_status?.toLowerCase().includes(search)
          )
      })
  //#endregion


  return (
    <div className="space-y-4 md:space-y-6">

      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Users</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">Manage employee accounts and permissions</p>
        </div>
        <button onClick={()=> {setForm_user(true); setCrud('create')}} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]">
        {/* <button onClick={() => setShowAddUserModal(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]"> */}

          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <SplitPanel
          content_1={
            <>
              {/* Searchbar */}
              <Grid>
                  <Searchbar value={searchDatabase} onChange={(e: any) => setSearchDatabase(e.target.value)} placeholder="Search by name, phone number, ...."/>
              </Grid>
            </>
          }
          content_2={
            <>
              {/* Table */}
              <Grid>
                  <Table fieldName={tableTitle_user} data={filteredUser} loading={spinner} />
              </Grid>
            </>
          }
      />

      {/* Form */}
      <Form title={crud=='create'? 'Add User':'Edit User'} isOpen={formUser} onClose={() => setForm_user(false)} width="max-w-lg"
          
          footer={
              <>
                  <Button
                      label="Cancel"
                      className="w-24"
                      onClick={() => setForm_user(false)}
                      disabled={isLoading}
                  />

                  {crud == 'create' ? (
                      <Button
                          label="Save"
                          className="w-24"
                          onClick={handleCreate_user}
                          disabled={isLoading || Object.values(user).some(value => value === "")}

                      />
                  ) : (
                      <Button
                          label="Update"
                          className="w-24"
                          onClick={handleUpdate_user}
                          disabled={isLoading || Object.values(user).some(value => value === "")}

                      />
                  )}

              </>
          }
      >
          <div className="space-y-4">
              {/* for all role */}
              <Field
                  label="Name"
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
                  label="Status"
                  placeholder="Enter status"
                  value={user.usr_status}
                  onChange={(e) => setUser({ ...user, usr_status: e.target.value as 'active' | 'inactive' })}
                  type="select"   
                  options={[
                      { label: 'Active', value: 'active' },
                      { label: 'Inactive', value: 'inactive' },
                  ]}
              />
          </div>
      </Form>

      
      {/* Delete user */}
      <Alert
          open={isAlert}
          title="Delete this user?"
          description="This action can't be undone."
          isLoading={isLoading}
          confirmLabel="Delete"
          onCancel={() => setIs_alert(false)}
          onConfirm={() => {
              // do your action here
              handleDelete_user()
          }}
      />


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