import { useNavigate } from "react-router";
import { ChevronLeft, Bell, Award, BookOpen, AlertCircle, CheckCircle } from "lucide-react";

export default function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "alert",
      icon: AlertCircle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Certification Expiring Soon",
      message: "Your Safety Compliance Certification expires in 7 days.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 2,
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-[#1e3a8a]",
      title: "New Course Available",
      message: "Emergency Jumpstart Procedures course has been assigned to you",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "certification",
      icon: Award,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Certificate Earned",
      message: "Congratulations! You've completed Battery Replacement SOP",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 4,
      type: "alert",
      icon: AlertCircle,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Certification Expiring Soon",
      message: "Your Roadside Assistance Protocol Certificate expires in 30 days",
      time: "1 day ago",
      unread: false,
    },
    {
      id: 5,
      type: "success",
      icon: CheckCircle,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Quiz Passed",
      message: "You scored 95% on Battery vs Alternator Diagnosis quiz",
      time: "2 days ago",
      unread: false,
    },
    {
      id: 6,
      type: "course",
      icon: BookOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-[#1e3a8a]",
      title: "Course Reminder",
      message: "Don't forget to complete your mandatory safety training",
      time: "3 days ago",
      unread: false,
    },
    {
      id: 7,
      type: "alert",
      icon: AlertCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Deadline Approaching",
      message: "Annual Safety Certification due in 5 days",
      time: "4 days ago",
      unread: false,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/mobile/home")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="font-semibold text-gray-900">Notifications</h1>
        </div>
        <button className="text-sm text-[#1e3a8a] font-medium">
          Mark all read
        </button>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-semibold text-gray-900">{notifications.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Unread</p>
            <p className="text-2xl font-semibold text-[#1e3a8a]">
              {notifications.filter(n => n.unread).length}
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-auto">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              className={`w-full px-6 py-4 hover:bg-gray-50 transition-colors text-left ${
                notification.unread ? 'bg-blue-50/50' : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 ${notification.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {notification.title}
                    </h3>
                    {notification.unread && (
                      <span className="w-2 h-2 bg-[#1e3a8a] rounded-full flex-shrink-0 mt-1.5"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}