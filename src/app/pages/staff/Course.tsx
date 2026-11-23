import { Search, Filter, Plus, Clock, Users, X, FileText, BookOpen, Video, Upload, Trash2, Edit2, GripVertical, Globe, Landmark, Leaf, Gift } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useCallback, useEffect, useState } from "react";
import { Course_type } from "../../interfaces/course";

const courses = [
  { id: 1, title: "Battery Replacement SOP", category: "Mandatory", duration: "20 mins", enrolled: 450, completion: 92, status: "Active", description: "Step-by-step battery installation & safety handling", modules: 4, videos: 6, quizzes: 3, instructor: "John Smith", lastUpdated: "2024-02-15" },
  { id: 2, title: "Emergency Jumpstart Procedures", category: "Field Critical", duration: "15 mins", enrolled: 380, completion: 88, status: "Active", description: "Safe jumpstart methods during roadside emergencies", modules: 3, videos: 5, quizzes: 2, instructor: "Sarah Williams", lastUpdated: "2024-02-10" },
  { id: 3, title: "Battery vs Alternator Diagnosis", category: "Advanced", duration: "25 mins", enrolled: 290, completion: 75, status: "Active", description: "Identify root cause of vehicle starting issues", modules: 5, videos: 8, quizzes: 4, instructor: "Michael Chen", lastUpdated: "2024-02-20" },
  { id: 4, title: "Roadside Assistance Protocol", category: "Mandatory", duration: "30 mins", enrolled: 520, completion: 95, status: "Active", description: "End-to-end SOP from customer arrival to job completion", modules: 6, videos: 9, quizzes: 5, instructor: "Emily Rodriguez", lastUpdated: "2024-02-05" },
  { id: 5, title: "Customer Handling & Upselling", category: "Skills", duration: "15 mins", enrolled: 340, completion: 82, status: "Active", description: "Handling stressed customers + upsell premium batteries", modules: 4, videos: 6, quizzes: 3, instructor: "David Kim", lastUpdated: "2024-02-18" },
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

export default function Courses() {
  

  // #region 1) --> useState
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
    const [formCourse, setForm_course] = useState(false)
    const [course, setCourse] = useState<Course_type>({
      id: 0,
      crs_title: "",
      crs_code: "",
      crs_category: "",
      crs_description: "",
      crs_thumbnail: "",
      crs_type: "",
      crs_isPaid: 0,
      crs_price: 0,
      crs_duration: 0,
      crs_status: "active",
    });

  // #endregion
  

  // #region 2) --> useEffect
      // reset fieldname everytime form_user closed
      useEffect(() => {
          if(!formCourse) {
              setCourse ({
                id: 0,
                crs_title: "",
                crs_code: "",
                crs_category: "",
                crs_description: "",
                crs_thumbnail: "",
                crs_type: "",
                crs_isPaid: 0,
                crs_price: 0,
                crs_duration: 0,
                crs_status: "active",
              })
          }
      }, [formCourse])
  //#endregion


  // #region 3_old) --> method

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
    // #endregion


  // #region 3) -> method

    // READ course
    useEffect(() => {
        fetchData_course()
    }, [])

    // CREATE course
    const handleCreate_course = async () => {
        // loading
        setIsLoading(true)

        // CREATE data
        try {
            await api.post(`/course`, course);

            fetchData_course()
            setForm_course(false)
        }
        catch(error) {
            console.error('Error:', error); // use only to remove warning on vscode
            // console.error('Response status:', error.response?.data);
        }
        finally {
            setIsLoading(false)
        }
    }

    // UPDATE course
    const handleUpdate_course = async () => {
    }

    // DELETE course
    const handleDelete_course = async () => {
    }

  // #endregion


  // #region 4) --> database

      // fetch course
      const [databaseCourse, setDatabase_course] = useState<Course_type[]>([])
      const fetchData_course = useCallback(() => {
          
          // loading
          setSpinner(true)

          api.get(`/course`)
          .then((response) => {
              // console.log('response  = ',response.data.data)
              setDatabase_course(response.data.data);
          })
          .catch((error) => {
              console.error('Error fetching:', error);
          })
          .finally(() => {
              setSpinner(false)
          })
      }, []);

  //#endregion


  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Manage training courses and content</p>
        </div>
        {/* <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]" onClick={() => setShowAddCourseModal(true)}> */}
        <button onClick={()=> {setForm_course(true); setCrud('create')}} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]">
        
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        
        {/* Searchbar */}
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

        {/* ESG banner */}
        <div className="p-3">
          <section className="flex items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-5 py-4 sm:px-6">
            {/* Left: leaf icon + text */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-emerald-600"
                  aria-hidden="true"
                >
                  <path d="M20 4C10 4 5 9 5 15c0 1.5.4 2.8 1 4 1.2.6 2.5 1 4 1 6 0 10-5 10-16Z" />
                  <path d="M4 21c2-5 5-8 9-10" />
                  <path d="M9 14l3 .5M11 11.5l3 .3M13.5 9l2.5.2" />
                </svg>
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  ESG Learning for a Sustainable Future
                </h2>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                  Build knowledge and drive impact across Environmental, Social, and
                  Governance (ESG) topics.
                </p>
              </div>
            </div>

            {/* Right: decorative icons */}
            <div className="hidden shrink-0 items-end gap-3 text-emerald-600 md:flex" aria-hidden="true" >
              {/* Leaves + sparkle */}
              <svg viewBox="0 0 48 48" fill="currentColor" className="h-12 w-12">
                <path d="M6 40c0-9 6-15 14-15 0 9-5 15-14 15Z" />
                <path d="M22 40c0-12 7-20 18-20 0 12-7 20-18 20Z" />
                <path d="M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2L12 8Z" />
              </svg>

              {/* Globe */}
              <svg
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-14 w-14"
              >
                <circle cx="24" cy="24" r="19" />
                <ellipse cx="24" cy="24" rx="8" ry="19" />
                <path d="M5 24h38M8 14h32M8 34h32M24 5v38" />
              </svg>

              {/* Governance building */}
              <svg viewBox="0 0 48 48" fill="currentColor" className="h-12 w-12">
                <path d="M24 6 6 16v4h36v-4L24 6Z" />
                <path d="M10 23h5v13h-5zM21.5 23h5v13h-5zM33 23h5v13h-5z" />
                <path d="M6 39h36v4H6z" />
              </svg>
            </div>
          </section>
        </div>
        
        {/* Course */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {databaseCourse.map((data) => {
            const style = { icon: <Leaf className="w-6 h-6" />, bg: 'bg-green-100', color: 'text-green-700' }
            const completion = 0; // TODO: replace with data.completion when available
            const learners = 0;   // TODO: replace with data.enrolled when available

            return (
              <div
                key={data.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Top row: Free/Paid badge + status */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded text-white ${
                      data.crs_isPaid == 0 ? 'bg-green-700' : 'bg-orange-500'
                    }`}
                  >
                    {data.crs_isPaid == 0 ? 'FREE' : 'PAID'}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded capitalize ${
                      data.crs_status === 'active'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {data.crs_status}
                  </span>
                </div>

                {/* Icon + title + code/category */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${style.bg} ${style.color}`}
                  >
                    {style.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 leading-snug mb-2">
                      {data.crs_title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-medium">
                        {data.crs_code}
                      </span>
                      <span className="text-gray-500">{data.crs_category}</span>
                    </div>
                  </div>
                </div>

                {/* Duration + learners */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{data.crs_duration} mins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{learners} learners</span>
                  </div>
                </div>

                {/* Completion */}
                {/* <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-semibold text-gray-900">{completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-[#1e3a8a] h-1.5 rounded-full transition-all"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div> */}

                {/* Footer: differs for free vs paid */}
                <div className="mt-auto">
                  {data.crs_isPaid == 0 ? (
                    <div className="space-y-2">
                      <button
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium cursor-pointer"
                        onClick={() => handleViewDetails(data)}
                      >
                        View Details
                      </button>
                      <div className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">
                        <Gift className="w-4 h-4" />
                        Free Course
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-orange-600 font-bold text-lg mb-2">
                        RM {Number(data.crs_price).toFixed(2)}
                      </p>
                      <button
                        className="w-full px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors cursor-pointer"
                        // onClick={() => handleEnroll(data)}
                      >
                        Enroll Now
                      </button>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                        {/* <Lock className="w-3.5 h-3.5" /> */}
                        <span>Premium Course</span>
                        <span>•</span>
                        <span>Lifetime Access</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Form */}
      <Form title={crud=='create'? 'Add Course':'Edit Course'} isOpen={formCourse} onClose={() => setForm_course(false)} width="max-w-2xl"
          
          footer={
              <>
                  <Button
                      label="Cancel"
                      className="w-24"
                      onClick={() => setForm_course(false)}
                      disabled={isLoading}
                  />

                  {crud == 'create' ? (
                      <Button
                          label="Save"
                          className="w-24"
                          onClick={handleCreate_course}
                          disabled={isLoading || Object.values(course).some(value => value === "")}

                      />
                  ) : (
                      <Button
                          label="Update"
                          className="w-24"
                          onClick={handleUpdate_course}
                          disabled={isLoading || Object.values(course).some(value => value === "")}

                      />
                  )}

              </>
          }
      >
          <div className="space-y-4">
            {/* for all role */}
            <Field
                label="Title"
                placeholder="Enter title"
                value={course.crs_title}
                onChange={(e) => setCourse({ ...course, crs_title: e.target.value })}
            />
            <Grid className="md:grid-cols-2">
              <Field
                  label="Code"
                  placeholder="Enter course code"
                  value={course.crs_code}
                  onChange={(e) => setCourse({ ...course, crs_code: e.target.value })}
              />
              <Field
                  label="Category"
                  placeholder="Enter category"
                  value={course.crs_category}
                  onChange={(e) => setCourse({ ...course, crs_category: e.target.value })}
              />
            </Grid>

            <Field
                label="Description"
                placeholder="Enter description"
                value={course.crs_description}
                onChange={(e) => setCourse({ ...course, crs_description: e.target.value })}
                type="textarea"
            />

            <Field
                label="Thumbnail"
                placeholder="Enter thumbnail URL"
                value={course.crs_thumbnail}
                onChange={(e) => setCourse({ ...course, crs_thumbnail: e.target.value })}
            />

            <Field
                label="Type"
                placeholder="Enter course type"
                value={course.crs_type}
                onChange={(e) => setCourse({ ...course, crs_type: e.target.value })}
            />
            <Grid className="md:grid-cols-2">

            <Field
                label="Price (RM)"
                placeholder="Enter price"
                value={course?.crs_price || ""}
                onChange={(e) => setCourse({ ...course, crs_price: Number(e.target.value) })}
                type="number"
            />

            <Field
                label="Duration (Hours)"
                placeholder="Enter duration"
                value={course?.crs_duration || ""}
                onChange={(e) => setCourse({ ...course, crs_duration: Number(e.target.value) })}
                type="number"
            />
            </Grid>

            <Field
                label="Status"
                placeholder="Enter status"
                value={course.crs_status}
                onChange={(e) => setCourse({ ...course, crs_status: e.target.value as 'active' | 'inactive' })}
                type="select"
                options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                ]}
            />
          </div>
      </Form>
      

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