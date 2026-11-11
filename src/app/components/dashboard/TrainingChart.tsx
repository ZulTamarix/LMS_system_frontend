import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { role: "Rider", completionRate: 85 },
  { role: "Technician", completionRate: 92 },
  { role: "Retail Staff", completionRate: 78 },
  { role: "Management", completionRate: 95 },
  { role: "Warehouse", completionRate: 88 },
];

export default function TrainingChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Completion Rate by Role</h3>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Training completion percentage across different roles</p>
      </div>
      <ResponsiveContainer width="100%" height={320} minHeight={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="role" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            domain={[0, 100]}
            label={{ value: 'Completion %', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 12 } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value) => [`${value}%`, 'Completion Rate']}
          />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
            iconType="circle"
          />
          <Bar dataKey="completionRate" fill="#1e3a8a" name="Completion Rate %" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}