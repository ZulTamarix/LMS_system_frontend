import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Mar", expiring: 12 },
  { month: "Apr", expiring: 18 },
  { month: "May", expiring: 23 },
  { month: "Jun", expiring: 15 },
  { month: "Jul", expiring: 28 },
  { month: "Aug", expiring: 20 },
];

export default function CertificationChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">Certification Expiry Timeline</h3>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Number of certifications expiring in the next 6 months</p>
      </div>
      <ResponsiveContainer width="100%" height={320} minHeight={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Certifications', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 12 } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value) => [`${value}`, 'Expiring']}
          />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="expiring" 
            stroke="#d97706" 
            strokeWidth={2}
            name="Expiring Certifications" 
            dot={{ fill: '#d97706', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}