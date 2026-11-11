import { Progress } from "../ui/progress";

const entities = [
  { id: 1, name: "Malaysia HQ", type: "Subsidiary", employees: 245, completion: 92 },
  { id: 2, name: "Klang Valley Division", type: "Subsidiary", employees: 198, completion: 88 },
  { id: 3, name: "Southern Region", type: "Subsidiary", employees: 167, completion: 85 },
  { id: 4, name: "Kuala Lumpur Outlet", type: "Outlet", employees: 52, completion: 90 },
  { id: 5, name: "Petaling Jaya Outlet", type: "Outlet", employees: 45, completion: 88 },
  { id: 6, name: "Johor Bahru Outlet", type: "Outlet", employees: 48, completion: 85 },
  { id: 7, name: "Penang Outlet", type: "Outlet", employees: 41, completion: 82 },
  { id: 8, name: "Shah Alam Outlet", type: "Outlet", employees: 38, completion: 86 },
  { id: 9, name: "Subang Jaya Outlet", type: "Outlet", employees: 35, completion: 78 },
  { id: 10, name: "Ipoh Outlet", type: "Outlet", employees: 29, completion: 75 },
  { id: 11, name: "Melaka Outlet", type: "Outlet", employees: 32, completion: 80 },
  { id: 12, name: "Kota Kinabalu Outlet", type: "Outlet", employees: 28, completion: 84 },
];

export default function EntityTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Entity Performance</h3>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Training completion by location</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entity Name
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employees
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completion Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entities.map((entity) => (
              <tr key={entity.id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{entity.name}</div>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    entity.type === 'Subsidiary' 
                      ? 'bg-blue-50 text-[#1e3a8a]' 
                      : 'bg-orange-50 text-[#d97706]'
                  }`}>
                    {entity.type}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entity.employees}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Progress value={entity.completion} className="flex-1" />
                    <span className="text-sm font-medium text-gray-900 min-w-[3rem] text-right">
                      {entity.completion}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}