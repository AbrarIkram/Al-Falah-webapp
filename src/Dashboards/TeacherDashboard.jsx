import { useState } from 'react';
import { Users, BookOpen, Mail, Award, ChevronRight, Star } from 'lucide-react';

function TeacherDashboard() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
  const teachers = [
    { 
      id: 1,
      name: "Mr. John", 
      subject: "Mathematics", 
      email: "john@school.edu",
      experience: "8 years",
      rating: 4.8,
      students: 32,
      status: "active"
    },
    { 
      id: 2,
      name: "Ms. Anu", 
      subject: "Science", 
      email: "anu@school.edu",
      experience: "5 years",
      rating: 4.9,
      students: 28,
      status: "active"
    },
    { 
      id: 3,
      name: "Mr. David", 
      subject: "English", 
      email: "david@school.edu",
      experience: "12 years",
      rating: 4.7,
      students: 30,
      status: "on leave"
    },
  ];

  const getSubjectColor = (subject) => {
    const colors = {
      Mathematics: "bg-blue-100 text-blue-700",
      Science: "bg-green-100 text-green-700",
      English: "bg-purple-100 text-purple-700",
    };
    return colors[subject] || "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status) => {
    return status === "active" 
      ? "bg-green-100 text-green-700" 
      : "bg-orange-100 text-orange-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Teachers Overview
              </h1>
              <p className="text-gray-600">
                Manage and view all teacher information
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-700">
                Total Teachers: {teachers.length}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Active Teachers</p>
                <p className="text-2xl font-bold text-gray-800">
                  {teachers.filter(t => t.status === "active").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Average Rating</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(teachers.reduce((acc, t) => acc + t.rating, 0) / teachers.length).toFixed(1)}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Students</p>
                <p className="text-2xl font-bold text-gray-800">
                  {teachers.reduce((acc, t) => acc + t.students, 0)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                {/* Teacher Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {teacher.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectColor(teacher.subject)}`}>
                      <BookOpen className="w-3 h-3 mr-1" />
                      {teacher.subject}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                    {teacher.status}
                  </span>
                </div>

                {/* Teacher Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {teacher.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-2 text-gray-400" />
                    Experience: {teacher.experience}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    Students: {teacher.students}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                    Rating: {teacher.rating}/5.0
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedTeacher(teacher)}
                  className="w-full mt-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-between text-gray-700 text-sm font-medium"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Teacher Details */}
        {selectedTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Teacher Details</h3>
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-3">
                <p><strong className="text-gray-700">Name:</strong> {selectedTeacher.name}</p>
                <p><strong className="text-gray-700">Subject:</strong> {selectedTeacher.subject}</p>
                <p><strong className="text-gray-700">Email:</strong> {selectedTeacher.email}</p>
                <p><strong className="text-gray-700">Experience:</strong> {selectedTeacher.experience}</p>
                <p><strong className="text-gray-700">Students:</strong> {selectedTeacher.students}</p>
                <p><strong className="text-gray-700">Rating:</strong> {selectedTeacher.rating}/5.0</p>
                <p><strong className="text-gray-700">Status:</strong> {selectedTeacher.status}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;