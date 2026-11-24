import { useCallback, useEffect, useState, type ComponentType } from "react";
import { Pencil, User as UserIcon, Mail, Phone, Building2 } from "lucide-react";

import { User_type } from "../../interfaces/user";
import api from "../../api/axios";


// #region Helpers

    type FieldKey = "usr_name" | "usr_email" | "usr_phoneNo" | "usr_company";

    type FieldConfig = {
        key: FieldKey;
        label: string;
        icon: ComponentType<{ size?: number; strokeWidth?: number }>;
        type: string;
    };

    const FIELDS: FieldConfig[] = [
        { key: "usr_name", label: "Name", icon: UserIcon, type: "text" },
        { key: "usr_email", label: "Email", icon: Mail, type: "email" },
        { key: "usr_phoneNo", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "usr_company", label: "Company Name", icon: Building2, type: "text" },
    ];

    const getInitials = (name: string = "") =>
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0].toUpperCase())
            .join("");

    function ProfileRow({
        field,
        value,
        editing,
        onChange,
    } : {
        field: FieldConfig;
        value: string;
        editing: boolean;
        onChange: (value: string) => void;
    }) {
        const Icon = field.icon;

        return (
            <div className="flex items-center gap-5 border-t border-slate-200 py-5 first:border-t-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <Icon size={20} strokeWidth={1.75} />
                </div>

                <div className="min-w-0 flex-1">
                    <label
                        htmlFor={field.key}
                        className="text-xs font-semibold text-slate-800"
                    >
                        {field.label}
                    </label>
                    {editing ? (
                        <input
                            id={field.key}
                            type={field.type}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-base font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                    ) : (
                        <p className="mt-1 truncate text-base font-semibold text-slate-900">
                            {value || "—"}
                        </p>
                    )}
                </div>
            </div>
        );
    }

// #endregion


export default function User() {

    // #region 1) --> useState

        const [selectedUser, ] = useState<User_type | null>(() => {
            return JSON.parse(localStorage.getItem('user') || 'null');
        });
        
        // loading
        const [isLoading, setIsLoading] = useState(false)

        const [isEditing, setIsEditing] = useState(false);
        const [draft, setDraft] = useState<User_type>();

    // #endregion


    // #region 2) --> handlers

        const handleStartEdit = () => {

            // copy current values into the draft so the inputs start pre-filled
            setDraft(databaseUser);
            setIsEditing(true);
        };

        const handleSave = async () => {
            // TODO: send `draft` to your API and update `user`
            console.log('data = ',draft)

            // loading
            setIsLoading(true)

            // UPDATE data
            try {
                await api.put(`/user/${selectedUser?.id}`, draft);
                fetchData_user()
            }
            catch(error) {
                console.error('Error:', error); // use only to remove warning on vscode
                console.error('Response status:', error.response?.data);
            }
            finally {
                setIsLoading(false)
                setIsEditing(false);
            }
        };

    // #endregion


    // #region 4) --> database

        // fetch user
        const [databaseUser, setDatabase_user] = useState<User_type>()
        const fetchData_user = useCallback(() => {
            

            api.get(`/user/${selectedUser?.id}`)
            .then((response) => {
                // console.log('response  = ',response.data.data)
                setDatabase_user(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching:', error);
            })
        }, []);
        useEffect(() => {
            fetchData_user()
        }, [])
        
        //#endregion

        
    return (
        <div className="space-y-6">

            {/* Page header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-indigo-950">My Profile</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your personal information
                    </p>
                </div>

                {isEditing ? (
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="cursor-pointer rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        >
                            Save changes
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={handleStartEdit}
                        className="cursor-pointer flex items-center gap-2 rounded-lg border border-indigo-600 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-900 shadow-sm transition hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                        <Pencil size={16} className="text-indigo-600" />
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Card */}
            <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-bold text-indigo-950">Profile Information</h2>

                {/* Avatar */}
                <div className="mt-6">
                    <div
                        className="flex h-32 w-32 items-center justify-center rounded-full bg-[#0a1f7a] text-5xl font-bold text-white"
                        aria-label={`${databaseUser?.usr_name} avatar`}
                    >
                        {getInitials(databaseUser?.usr_name)}
                    </div>
                </div>

                {/* Fields */}
                <div className="mt-6 border-t border-slate-200">
                    {FIELDS.map((field) => (
                        <ProfileRow
                            key={field.key}
                            field={field}
                            value={databaseUser?.[field.key] ?? ""}
                            editing={isEditing}
                            onChange={(v) =>
                                setDatabase_user((prev) =>
                                    prev ? { ...prev, [field.key]: v } : prev
                                )
                            }
                        />
                    ))}
                </div>
            </section>

        </div>
    );
}