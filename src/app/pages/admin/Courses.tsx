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
            console.error('Response status:', error.response?.data);
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
      
      // tableTitle
      const tableTitle_course: Column<Course_type>[] = [
          {
              key: "1",
              header: "Title",
              render: (row) => 
                <span>{row.crs_title}</span>
          },
          {
              key: "2",
              header: "Code",
              render: (row) => 
                <span>{row.crs_code}</span>
          },
          {
              key: "3",
              header: "Type",
              render: (row) => 
                <span>{row.crs_type}</span>
          },
          {
              key: "4",
              header: "Duration (minute)",
              render: (row) => 
                <span>{row.crs_duration}</span>
          },
          {
              key: "5",
              header: "Price",
              render: (row) => (
                <>
                  {row.crs_isPaid == 0 ? (
                    <span className="py-1 px-2 rounded-full bg-green-100 text-green-600">Free plan</span>
                  ) : (
                    <span>{`RM${Number(row.crs_price || 0).toLocaleString('en-MY', { minimumFractionDigits: 2 })}`}</span>
                  )} 
                </>
              )
          },
          {
              key: "6",
              header: "Status",
              render: (row) => (
                <>
                    {row.crs_status == 'active' ? (
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
                    <button onClick={() => { setCourse(row); setForm_course(true); setCrud('edit') }} className="border border-amber-400 text-amber-400 p-1 px-2 text-sm rounded-md cursor-pointer">
                        Edit
                    </button>
                    
                    <button onClick={() => { setCourse(row); setIs_alert(true) }} className="border border-red-400 text-red-400 p-1 px-2 text-sm rounded-md cursor-pointer">
                        Delete
                    </button>
                </div>
              )
          },
      ];

  //#endregion


  //#region 5) --> searchbar
      const filteredCourse = databaseCourse.filter((data) => {
          const search = searchDatabase.toLowerCase().trim()

          return (
            data.crs_title.toLowerCase().includes(search) ||
            data.crs_type.toLowerCase().includes(search) ||
            String(data.crs_duration).toLowerCase().includes(search) ||
            String(data.crs_price).toLowerCase().includes(search) ||
            data.crs_status.toLowerCase().includes(search) ||
            data.crs_code.toLowerCase().includes(search) ||
            data.crs_category.toLowerCase().includes(search)
          )
      })
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
        
        <SplitPanel
            content_1={
              <>
                {/* Searchbar */}
                <Grid>
                    <Searchbar value={searchDatabase} onChange={(e: any) => setSearchDatabase(e.target.value)} placeholder="Search by title, duration, price ...."/>
                </Grid>
              </>
            }
            content_2={
              <>
                {/* Table */}
                <Grid>
                    <Table fieldName={tableTitle_course} data={filteredCourse} loading={spinner} />
                </Grid>
              </>
            }
        />
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
    </div>
  );
}