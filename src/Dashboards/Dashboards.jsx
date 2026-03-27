import { useState, useEffect } from "react";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Calendar,
  Activity,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 120,
    totalTeachers: 25,
    activeClasses: 8,
    attendanceRate: 94,
    upcomingEvents: 3,
  });

  const [activeTab, setActiveTab] = useState("overview");

  const refreshData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const summaryCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Active Classes",
      value: stats.activeClasses,
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      icon: Activity,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      trend: "+3%",
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back! Here's what's happening with your institution today.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={refreshData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="text-sm font-medium">Refresh</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-all duration-200">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Academic Year 2024</span>
            </button>
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${card.bgColor} p-3 rounded-xl`}>
                      <Icon className={`w-6 h-6 ${card.textColor}`} />
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        card.trendUp ? "text-green-600" : "text-red-600"
                      } bg-${card.trendUp ? "green" : "red"}-50 px-2 py-1 rounded-full`}
                    >
                      {card.trendUp ? "↑" : "↓"} {card.trend}
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium mb-1">
                    {card.title}
                  </h3>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className={`h-1 bg-gradient-to-r ${card.color}`} />
              </div>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-6">
            {["overview", "students", "teachers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Sub Dashboards Section */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Dashboard Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Student Overview
                  </h2>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View All →
                </button>
              </div>
              <div className="p-6">
                <StudentDashboard />
              </div>
            </div>

            {/* Teacher Dashboard Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Teacher Overview
                  </h2>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View All →
                </button>
              </div>
              <div className="p-6">
                <TeacherDashboard />
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <StudentDashboard />
          </div>
        )}

        {activeTab === "teachers" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <TeacherDashboard />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;