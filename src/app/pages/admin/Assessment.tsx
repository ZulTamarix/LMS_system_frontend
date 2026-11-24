import { Search, Filter, Plus, Clock, Users, X, FileText, BookOpen, Video, Upload, Trash2, Edit2, GripVertical, Globe, Landmark, Leaf, Gift, EyeIcon } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useCallback, useEffect, useState } from "react";
import { Assessment_type } from "../../interfaces/assessment";

import Table, { type Column } from "../../components/ui_2nd/Table";
import Grid from "../../components/ui_2nd/Grid";
import Form from "../../components/ui_2nd/Form";
import Field from "../../components/ui_2nd/Field";
import Button from "../../components/ui_2nd/Button";
import Searchbar from "../../components/ui_2nd/Searchbar";
import SplitPanel from "../../components/ui_2nd/SplitPanel";
import Alert from "../../components/ui_2nd/Alert";

import api from "../../api/axios";
import { Course_type } from "../../interfaces/course";
import { Question_type } from "../../interfaces/question";

export default function Assessment() {
  

    // #region 1) --> useState
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
        const [formAssessment, setForm_assessment] = useState(false)
        const [assessment, setAssessment] = useState<Assessment_type>({
            id: 0,
            asm_crs_id: 0,
            asm_title: "",
            asm_totalQuestion: 1,
            asm_timeLimit: 45,
            asm_score: 0,
            asm_status: "active",
        });
        const [formQuestion, setForm_question] = useState(false)
        const [questions, setQuestions] = useState<Question_type[]>([]);

    // #endregion
    

    // #region 2) --> useEffect
        // reset fieldname everytime form_user closed
        useEffect(() => {
            if(!formAssessment) {
                setAssessment ({
                    id: 0,
                    asm_crs_id: databaseCourse[0]?.id || 0,
                    asm_title: "",
                    asm_totalQuestion: 1,
                    asm_timeLimit: 45,
                    asm_score: 0,
                    asm_status: "active",
                })
            }
        }, [formAssessment])
    //#endregion


    // #region 3) --> method

        // READ
        useEffect(() => {
            fetchData_assessment()
            fetchData_course()
        }, [])

        // CREATE assessment
        const handleCreate_assessment = async () => {
            // loading
            setIsLoading(true)

            // CREATE data
            try {
                await api.post(`/assessment`, assessment);
                fetchData_assessment()
                setForm_assessment(false)
            }
            catch(error) {
                console.error('Error:', error); // use only to remove warning on vscode
                // console.error('Response status:', error.response?.data);
            }
            finally {
                setIsLoading(false)
            }
        }

        // UPDATE assessment
        const handleUpdate_assessment = async () => {

            // loading
            setIsLoading(true)

            // UPDATE data
            try {
                await api.put(`/assessment/${assessment.id}`, assessment);
                fetchData_assessment()
                setForm_assessment(false)
            }
            catch(error) {
                console.error('Error:', error); // use only to remove warning on vscode
                // console.error('Response status:', error.response?.data);
            }
            finally {
                setIsLoading(false)
            }
        }
        
        // DELETE assessment
        const handleDelete_assessment = async () => {
        }

        
        // CREATE questions
        const handleCreate_question = async () => {
            console.log('quest = ',questions)
           
            // loading
            setIsLoading(true)

            // CREATE data
            try {
                await api.post(`/question`, { questions });
                fetchData_assessment()
                setForm_question(false)
            }
            catch(error) {
                console.error('Error:', error); // use only to remove warning on vscode
                // console.error('Response status:', error.response?.data);
            }
            finally {
                setIsLoading(false)
            }
        }
        // UPDATE assessment
        const handleUpdate_question = async () => {

            // loading
            setIsLoading(true)

            // UPDATE data
            try {
                await api.put(`/question/${assessment.id}`, {
                    questions: questions.map((q, index) => ({
                        ...q,
                        qst_asm_id: assessment.id,
                        qst_order: index + 1
                    }))
                });
                fetchData_assessment()
                setForm_question(false)
            }
            catch(error) {
                console.error('Error:', error); // use only to remove warning on vscode
                console.error('Response status:', error.response?.data);
            }
            finally {
                setIsLoading(false)
            }
        }

    // #endregion


    // #region 4) --> database

        // a. fetch assessment
        const [databaseAssessment, setDatabase_assessment] = useState<Assessment_type[]>([])
        const fetchData_assessment = useCallback(() => {
            
            // loading
            setSpinner(true)

            api.get(`/assessment`)
            .then((response) => {
                // console.log('response  = ',response.data.data)
                setDatabase_assessment(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching:', error);
            })
            .finally(() => {
                setSpinner(false)
            })
        }, []);

        
        // b. fetch course
            const [databaseCourse, setDatabase_course] = useState<Course_type[]>([])
            const fetchData_course = useCallback(() => {
                
                // loading
                setSpinner(true)

                api.get(`/course`)
                .then((response) => {
                    // console.log('response  = ',response.data.data)
                    setDatabase_course(response.data.data);
                    setAssessment ((prev) => ({
                        ...prev,
                        asm_crs_id: response.data[0]?.id || 0,
                    }))
                })
                .catch((error) => {
                    console.error('Error fetching:', error);
                })
                .finally(() => {
                    setSpinner(false)
                })
            }, []);
        
        // tableTitle
        const tableTitle_assessment: Column<Assessment_type>[] = [
            {
                key: "0",
                header: "Course",
                render: (row) => 
                    <span>{row.course?.crs_title}</span>
            },
            {
                key: "1",
                header: "Assessment Title",
                render: (row) => 
                    <span>{row.asm_title}</span>
            },
            {
                key: "2",
                header: "Total questions",
                render: (row) => 
                    <span>{row.asm_totalQuestion}</span>
            },
            {
                key: "3",
                header: "Time limit (minute)",
                render: (row) => 
                    <span>{row.asm_timeLimit}</span>
            },
            {
                key: "4",
                header: "Total score",
                render: (row) => 
                    <span>{row.asm_score}</span>
            },
            {
                key: "5",
                header: "Status",
                render: (row) => (
                    <>
                        {row.asm_status == 'active' ? (
                            <span className="py-1 px-2 rounded-full bg-green-100 text-green-600">Active</span>
                        ) : (
                            <span className="py-1 px-2 rounded-full bg-slate-100 text-slate-600">Inactive</span>
                        )} 
                    </>
                )
            },
            {
                key: "6",
                header: "Question Paper",
                align: "center",
                render: (row) => (
                    <>
                        {row?.questions?.length? (
                            <>
                                <button onClick={() => { setAssessment(row); setQuestions(row?.questions || []); setForm_question(true); setCrud('edit') }} className="border border-amber-400 text-amber-400 p-1 px-2 text-sm rounded-md cursor-pointer">
                                    Edit
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="border border-blue-400 text-blue-400 p-1 px-2 text-sm rounded-md cursor-pointer"
                                    onClick={() => {
                                        setAssessment(row);
                                        setForm_question(true);
                                        setCrud('create')
                                        setQuestions(
                                            Array.from({ length: row.asm_totalQuestion }, (_, index) => ({
                                                id: 0,
                                                qst_asm_id: row.id!,
                                                qst_order: index + 1,
                                                qst_question: "",
                                                qst_option_A: "",
                                                qst_option_B: "",
                                                qst_option_C: "",
                                                qst_option_D: "",
                                                qst_answer: ""
                                            }))
                                        );

                                    }}
                                >
                                    Add
                                </button>
                            </>
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
                        <button onClick={() => { setAssessment(row); setForm_assessment(true); setCrud('edit') }} className="border border-amber-400 text-amber-400 p-1 px-2 text-sm rounded-md cursor-pointer">
                            Edit
                        </button>
                        
                        <button onClick={() => { setAssessment(row); setIs_alert(true) }} className="border border-red-400 text-red-400 p-1 px-2 text-sm rounded-md cursor-pointer">
                            Delete
                        </button>
                    </div>
                )
            },
        ];

    //#endregion


    //#region 5) --> searchbar
        const filteredAssessment = databaseAssessment.filter((data) => {
            const search = searchDatabase.toLowerCase().trim()

            return (
                data.asm_title.toLowerCase().includes(search) ||
                String(data.asm_totalQuestion).toLowerCase().includes(search) ||
                String(data.asm_timeLimit).toLowerCase().includes(search) ||
                String(data.asm_score).toLowerCase().includes(search) ||
                data.asm_status.toLowerCase().includes(search)
            )
        })
    //#endregion


    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Assessments</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage training assessments and content</p>
                </div>
                {/* <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]" onClick={() => setShowAddAssessmentModal(true)}> */}
                <button onClick={()=> {setForm_assessment(true); setCrud('create')}} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]">
                
                <Plus className="w-4 h-4" />
                Add Assessment
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
                            <Table fieldName={tableTitle_assessment} data={filteredAssessment} loading={spinner} />
                        </Grid>
                    </>
                    }
                />
            </div>

            {/* Form */} {/* Assessment */}
            <Form title={crud=='create'? 'Add Assessment':'Edit Assessment'} isOpen={formAssessment} onClose={() => setForm_assessment(false)} width="max-w-2xl"
                
                footer={
                    <>
                        <Button
                            label="Cancel"
                            className="w-24"
                            onClick={() => setForm_assessment(false)}
                            disabled={isLoading}
                        />

                        {crud == 'create' ? (
                            <Button
                                label="Save"
                                className="w-24"
                                onClick={handleCreate_assessment}
                                disabled={isLoading || Object.values(assessment).some(value => value === "")}

                            />
                        ) : (
                            <Button
                                label="Update"
                                className="w-24"
                                onClick={handleUpdate_assessment}
                                disabled={isLoading || Object.values(assessment).some(value => value === "")}

                            />
                        )}

                    </>
                }
            >
                <div className="space-y-4">
                    {/* for all role */}
                    <Field
                        label="Course"
                        placeholder="Select a course"
                        value={String(assessment.asm_crs_id)}
                        onChange={(e) => setAssessment({ ...assessment, asm_crs_id: Number(e.target.value) })}
                        type="select"
                        options={
                            databaseCourse?.map((item: Course_type) => ({
                                label: `${item.crs_title} ( ${item.crs_code} )`,
                                value: item.id
                            }))
                        }
                    />
                    <Field
                        label="Title"
                        placeholder="Enter title"
                        value={assessment.asm_title}
                        onChange={(e) => setAssessment({ ...assessment, asm_title: e.target.value })}
                    />
                    <Grid className="md:grid-cols-3">
                        <Field
                            label="Time Limit (Minutes)"
                            placeholder="Enter time limit"
                            value={String(assessment.asm_timeLimit)}
                            onChange={(e) => setAssessment({ ...assessment, asm_timeLimit: Number(e.target.value) })}
                            type="number"
                        />
                        <Field
                            label="Total Score"
                            placeholder="Enter total score"
                            value={String(assessment.asm_score)}
                            onChange={(e) => setAssessment({ ...assessment, asm_score: Number(e.target.value) })}
                            type="number"
                        />
                        <Field
                            label="Total Questions"
                            placeholder="Enter total questionss"
                            value={String(assessment.asm_totalQuestion)}
                            onChange={(e) => setAssessment({ ...assessment, asm_totalQuestion: Number(e.target.value) })}
                            type="number"
                        />
                    </Grid>
                    <Field
                        label="Status"
                        placeholder="Enter status"
                        value={assessment.asm_status}
                        onChange={(e) => setAssessment({ ...assessment, asm_status: e.target.value as 'active' | 'inactive' })}
                        type="select"
                        options={[
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' },
                        ]}
                    />
                </div>
            </Form>
            
            {/* Form */} {/* Question */}
            <Form title={crud=='create'? 'Add Question':'Edit Question'} isOpen={formQuestion} onClose={() => setForm_question(false)} width="max-w-6xl"
                
                footer={
                    <>
                        <Button
                            label="Cancel"
                            className="w-24"
                            onClick={() => setForm_question(false)}
                            disabled={isLoading}
                        />

                        {crud == 'create' ? (
                            <Button
                                label="Save"
                                className="w-24"
                                onClick={handleCreate_question}
                                disabled={isLoading ||  questions.some(question =>
                                                            Object.values(question).some(value => value === "")
                                                        )
                                }
                            />
                        ) : (
                            <Button
                                label="Update"
                                className="w-24"
                                onClick={handleUpdate_question}
                                disabled={isLoading ||  questions.some(question =>
                                                            Object.values(question).some(value => value === "")
                                                        )
                                }

                            />
                        )}

                    </>
                }
            >
                <div className="space-y-4 p-2">

                    {questions.map((question, index) => (
                        <div key={index} className="space-y-4 border border-slate-700 p-7 mb-7 rounded-lg">

                            <h3 className="font-semibold text-lg">
                                Question {index + 1}
                            </h3>

                            {/* Question */}
                            <Field
                                // label="Question"
                                placeholder="Enter question"
                                value={question.qst_question}
                                onChange={(e) => {
                                    const updated = [...questions];
                                    updated[index].qst_question = e.target.value;
                                    setQuestions(updated);
                                }}
                            />

                            {/* Options */}
                            <Grid className="md:grid-cols-10">
                                <label className="flex items-center justify-center">A)</label>
                                <div className="col-span-9">
                                    <Field
                                        placeholder="Answer A"
                                        value={question.qst_option_A}
                                        onChange={(e) => {
                                            const updated = [...questions];
                                            updated[index].qst_option_A = e.target.value;
                                            setQuestions(updated);
                                        }}
                                    />
                                </div>

                                <label className="flex items-center justify-center">B)</label>
                                <div className="col-span-9">
                                    <Field
                                        placeholder="Answer B"
                                        value={question.qst_option_B}
                                        onChange={(e) => {
                                            const updated = [...questions];
                                            updated[index].qst_option_B = e.target.value;
                                            setQuestions(updated);
                                        }}
                                    />
                                </div>

                                <label className="flex items-center justify-center">C)</label>
                                <div className="col-span-9">
                                    <Field
                                        placeholder="Answer C"
                                        value={question.qst_option_C}
                                        onChange={(e) => {
                                            const updated = [...questions];
                                            updated[index].qst_option_C = e.target.value;
                                            setQuestions(updated);
                                        }}
                                    />
                                </div>

                                <label className="flex items-center justify-center">D)</label>
                                <div className="col-span-9">
                                    <Field
                                        placeholder="Answer D"
                                        value={question.qst_option_D}
                                        onChange={(e) => {
                                            const updated = [...questions];
                                            updated[index].qst_option_D = e.target.value;
                                            setQuestions(updated);
                                        }}
                                    />
                                </div>
                            </Grid>

                            {/* Correct Answer */}
                            <Field
                                // label="Correct Answer"
                                placeholder="Select correct answer"
                                value={question.qst_answer}
                                onChange={(e) => {
                                    const updated = [...questions];
                                    updated[index].qst_answer = e.target.value;
                                    setQuestions(updated);
                                }}
                                type="select"
                                options={[
                                    { label: 'A', value: 'A' },
                                    { label: 'B', value: 'B' },
                                    { label: 'C', value: 'C' },
                                    { label: 'D', value: 'D' },
                                ]}
                            />

                        </div>
                    ))}

                </div>
            </Form>
        </div>
    );
}