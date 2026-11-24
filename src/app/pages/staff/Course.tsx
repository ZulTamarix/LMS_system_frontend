import { Search, Filter, Clock, Users, Leaf, Gift } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Course_type } from "../../interfaces/course";


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
    
    // searchbar
    const [searchDatabase, setSearchDatabase] = useState('')
    // spinner
    const [spinner, setSpinner] = useState(false)

  // #endregion
  


  // #region 3_old) --> method

    const handleViewDetails = (course: any) => {
      // setSelectedCourse(course);
      // setShowCourseDetailModal(true);
    };
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

      useEffect(() => {
          fetchData_course()
      }, [])
  //#endregion


  return (
    <div className="space-y-6">

      {/* Header */}

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
    </div>
  );
}