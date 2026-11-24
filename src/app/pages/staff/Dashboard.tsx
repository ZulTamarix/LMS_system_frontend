import { Users, BookOpen, TrendingUp, AlertCircle, Clock } from "lucide-react";
import KPICard from "../../components/dashboard/KPICard";
import TrainingChart from "../../components/dashboard/TrainingChart";
import CertificationChart from "../../components/dashboard/CertificationChart";
import EntityTable from "../../components/dashboard/EntityTable";

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">Welcome back! Here's your training overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        <KPICard
          title="Total Employees"
          value="1,000"
          icon={Users}
          trend={{ value: "12%", isPositive: true }}
          color="blue"
        />
        <KPICard
          title="Active Courses"
          value="48"
          icon={BookOpen}
          trend={{ value: "8%", isPositive: true }}
          color="green"
        />
        <KPICard
          title="Completion Rate"
          value="87%"
          icon={TrendingUp}
          trend={{ value: "5%", isPositive: true }}
          color="purple"
        />
        <KPICard
          title="Expiring Certifications"
          value="23"
          icon={AlertCircle}
          trend={{ value: "3%", isPositive: false }}
          color="orange"
        />
        <KPICard
          title="Overdue Mandatory Training"
          value="15"
          icon={Clock}
          trend={{ value: "2%", isPositive: false }}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <TrainingChart />
        <CertificationChart />
      </div>

      {/* Entity Table */}
      <EntityTable />
    </div>
  );
}