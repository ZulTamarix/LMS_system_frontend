import { useState } from "react";
import { Search, Download, Filter, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  certifications: Certification[];
}

interface Certification {
  id: number;
  name: string;
  completedDate: string;
  expiryDate: string;
  status: "Valid" | "Expiring" | "Expired";
}

const employees: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Rider",
    department: "Operations",
    certifications: [
      { id: 1, name: "Battery Replacement SOP", completedDate: "2024-01-15", expiryDate: "2025-01-15", status: "Valid" },
      { id: 2, name: "Emergency Jumpstart Procedures", completedDate: "2023-11-20", expiryDate: "2024-11-20", status: "Expiring" },
      { id: 4, name: "Roadside Assistance Protocol", completedDate: "2024-02-01", expiryDate: "2025-02-01", status: "Valid" },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Technician",
    department: "Field Services",
    certifications: [
      { id: 1, name: "Battery Replacement SOP", completedDate: "2024-02-10", expiryDate: "2025-02-10", status: "Valid" },
      { id: 2, name: "Emergency Jumpstart Procedures", completedDate: "2023-08-15", expiryDate: "2024-08-15", status: "Expired" },
      { id: 3, name: "Battery vs Alternator Diagnosis", completedDate: "2024-03-01", expiryDate: "2025-03-01", status: "Valid" },
      { id: 4, name: "Roadside Assistance Protocol", completedDate: "2024-02-15", expiryDate: "2025-02-15", status: "Valid" },
      { id: 5, name: "Customer Handling & Upselling", completedDate: "2024-01-20", expiryDate: "2025-01-20", status: "Valid" },
    ],
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Retail Staff",
    department: "Sales",
    certifications: [
      { id: 1, name: "Battery Replacement SOP", completedDate: "2024-01-20", expiryDate: "2025-01-20", status: "Valid" },
      { id: 4, name: "Roadside Assistance Protocol", completedDate: "2023-10-10", expiryDate: "2024-10-10", status: "Expiring" },
      { id: 5, name: "Customer Handling & Upselling", completedDate: "2024-02-05", expiryDate: "2025-02-05", status: "Valid" },
    ],
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Management",
    department: "Leadership",
    certifications: [
      { id: 4, name: "Roadside Assistance Protocol", completedDate: "2024-02-01", expiryDate: "2025-02-01", status: "Valid" },
      { id: 5, name: "Customer Handling & Upselling", completedDate: "2024-02-15", expiryDate: "2025-02-15", status: "Valid" },
    ],
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Warehouse Staff",
    department: "Logistics",
    certifications: [
      { id: 1, name: "Battery Replacement SOP", completedDate: "2023-09-01", expiryDate: "2024-09-01", status: "Expired" },
      { id: 4, name: "Roadside Assistance Protocol", completedDate: "2024-01-05", expiryDate: "2025-01-05", status: "Valid" },
    ],
  },
];

export default function TrainingPassport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Valid":
        return <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />;
      case "Expiring":
        return <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />;
      case "Expired":
        return <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Valid":
        return `${baseClasses} bg-green-100 text-green-700`;
      case "Expiring":
        return `${baseClasses} bg-orange-100 text-orange-700`;
      case "Expired":
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return baseClasses;
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === "All") return matchesSearch;
    
    const hasMatchingStatus = employee.certifications.some(
      (cert) => cert.status === filterStatus
    );
    
    return matchesSearch && hasMatchingStatus;
  });

  const downloadCertificate = (employeeName: string, certName: string) => {
    // Mock download functionality
    alert(`Downloading certificate: ${certName} for ${employeeName}`);
  };

  const downloadAllCertificates = (employeeName: string) => {
    // Mock download all functionality
    alert(`Downloading all certificates for ${employeeName}`);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Training Passport</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">View and manage employee certifications</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees, roles, or departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Valid">Valid</option>
              <option value="Expiring">Expiring Soon</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-xs text-gray-600">Valid</p>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-gray-900">8</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <p className="text-xs text-gray-600">Expiring</p>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-gray-900">2</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="w-4 h-4 text-red-600" />
            <p className="text-xs text-gray-600">Expired</p>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-gray-900">2</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Download className="w-4 h-4 text-blue-600" />
            <p className="text-xs text-gray-600">Total</p>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-gray-900">12</p>
        </div>
      </div>

      {/* Employee List - Desktop */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Role</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Certifications</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-medium">
                        {employee.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{employee.role}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{employee.department}</td>
                  <td className="py-4 px-4">
                    <div className="space-y-2">
                      {employee.certifications.map((cert) => (
                        <div key={cert.id} className="flex items-center gap-2">
                          {getStatusIcon(cert.status)}
                          <span className="text-sm text-gray-900">{cert.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-2">
                      {employee.certifications.map((cert) => (
                        <div key={cert.id}>
                          <span className={getStatusBadge(cert.status)}>{cert.status}</span>
                          <p className="text-xs text-gray-500 mt-1">Expires: {cert.expiryDate}</p>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => downloadAllCertificates(employee.name)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors mx-auto text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download All
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee List - Mobile */}
      <div className="md:hidden space-y-4">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-medium">
                  {employee.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{employee.name}</p>
                  <p className="text-xs text-gray-600">{employee.role}</p>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
              </div>
              <button
                onClick={() => downloadAllCertificates(employee.name)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors text-xs"
              >
                <Download className="w-3 h-3" />
                All
              </button>
            </div>
            
            <div className="space-y-3 pt-3 border-t border-gray-200">
              {employee.certifications.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(cert.status)}
                      <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={getStatusBadge(cert.status)}>{cert.status}</span>
                      <span className="text-xs text-gray-500">Expires: {cert.expiryDate}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadCertificate(employee.name, cert.name)}
                    className="p-2 text-[#1e3a8a] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500">No employees found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
