import { Award, Calendar, AlertCircle } from "lucide-react";

export default function Certifications() {
  const certifications = [
    { id: 1, name: "Battery Replacement SOP", holder: "Sarah Johnson", issued: "2024-01-15", expires: "2026-01-15", status: "Valid" },
    { id: 2, name: "Emergency Jumpstart Procedures", holder: "Michael Chen", issued: "2023-06-20", expires: "2025-06-20", status: "Valid" },
    { id: 3, name: "Roadside Assistance Protocol", holder: "Emily Rodriguez", issued: "2024-02-10", expires: "2026-02-10", status: "Valid" },
    { id: 4, name: "Battery vs Alternator Diagnosis", holder: "David Kim", issued: "2022-09-05", expires: "2025-09-05", status: "Expiring Soon" },
    { id: 5, name: "Customer Handling & Upselling", holder: "Lisa Anderson", issued: "2021-11-12", expires: "2024-11-12", status: "Expired" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Certifications</h1>
        <p className="text-sm text-gray-500 mt-1">Track employee certifications and expiry dates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Valid</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">720</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Expiring Soon</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">180</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">Expired</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">100</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Certifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{cert.holder}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{cert.issued}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{cert.expires}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cert.status === 'Valid' 
                        ? 'bg-green-100 text-green-800' 
                        : cert.status === 'Expiring Soon'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
