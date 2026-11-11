import { Download, FileText, TrendingUp, Calendar } from "lucide-react";

export default function Reports() {
  const reports = [
    { 
      id: 1, 
      title: "Monthly Training Report", 
      description: "Complete overview of training activities",
      type: "Training",
      date: "2024-02-01",
      format: "PDF"
    },
    { 
      id: 2, 
      title: "Certification Expiry Report", 
      description: "List of expiring certifications",
      type: "Certification",
      date: "2024-02-15",
      format: "Excel"
    },
    { 
      id: 3, 
      title: "Employee Progress Report", 
      description: "Individual employee training progress",
      type: "Performance",
      date: "2024-02-10",
      format: "PDF"
    },
    { 
      id: 4, 
      title: "Compliance Audit Report", 
      description: "Regulatory compliance status",
      type: "Compliance",
      date: "2024-02-20",
      format: "PDF"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500 mt-1">Generate and download training reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#1e3a8a]" />
            </div>
            <span className="text-sm text-gray-600">Total Reports</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">48</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">This Month</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">12</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Downloads</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">156</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Scheduled</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">8</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#1e3a8a]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-[#1e3a8a] rounded-full"></span>
                        {report.type}
                      </span>
                      <span>Generated: {report.date}</span>
                      <span>Format: {report.format}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e293b]">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}