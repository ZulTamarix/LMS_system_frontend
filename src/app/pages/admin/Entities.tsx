import EntityTable from "../../components/dashboard/EntityTable";
import { Building2, MapPin, Users } from "lucide-react";

export default function Entities() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Entities</h1>
        <p className="text-sm text-gray-500 mt-1">Manage subsidiaries and outlets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#1e3a8a]" />
            </div>
            <span className="text-sm text-gray-600">Total Entities</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">12</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Active Locations</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">9</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Total Employees</span>
          </div>
          <p className="text-3xl font-semibold text-gray-900">1,000</p>
        </div>
      </div>

      <EntityTable />
    </div>
  );
}