import { useState } from 'react';
import { Star, Award, TrendingUp, UserPlus } from 'lucide-react';

function StudentDashboard() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ali", grade: "A", attendance: 95, projects: 8, avatar: "👨‍🎓" },
    { id: 2, name: "Nimal", grade: "B", attendance: 87, projects: 6, avatar: "👨‍🎓" },
    { id: 3, name: "Sara", grade: "A+", attendance: 98, projects: 10, avatar: "👩‍🎓" },
  ]);

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('A');

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A+': return 'text-emerald-600 bg-emerald-50';
      case 'A': return 'text-blue-600 bg-blue-50';
      case 'B': return 'text-purple-600 bg-purple-50';
      case 'C': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getGradeIcon = (grade) => {
    if (grade === 'A+' || grade === 'A') return <Award className="w-4 h-4" />;
    if (grade === 'B') return <Star className="w-4 h-4" />;
    return null;
  };

  const addStudent = () => {
    if (newStudentName.trim()) {
      const newStudent = {
        id: students.length + 1,
        name: newStudentName,
        grade: newStudentGrade,
        attendance: Math.floor(Math.random() * 20) + 80,
        projects: Math.floor(Math.random() * 5) + 5,
        avatar: "👨‍🎓"
      };
      setStudents([...students, newStudent]);
      setNewStudentName('');
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const stats = {
    averageGrade: (students.reduce((acc, s) => {
      const gradePoints = { 'A+': 4.3, 'A': 4.0, 'B': 3.0, 'C': 2.0 };
      return acc + (gradePoints[s.grade] || 0);
    }, 0) / students.length).toFixed(1),
    totalStudents: students.length,
    averageAttendance: Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Student Dashboard
        </h1>
        <p className="text-gray-500 mt-2">Track and manage student performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold mt-1">{stats.totalStudents}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Average GPA</p>
              <p className="text-3xl font-bold mt-1">{stats.averageGrade}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Avg Attendance</p>
              <p className="text-3xl font-bold mt-1">{stats.averageAttendance}%</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Students</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div
              key={student.id}
              className="p-6 hover:bg-gray-50 transition-colors duration-150 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{student.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{student.name}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getGradeColor(student.grade)}`}>
                        {getGradeIcon(student.grade)}
                        <span>Grade {student.grade}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        📊 {student.attendance}% attendance
                      </div>
                      <div className="text-xs text-gray-500">
                        📚 {student.projects} projects
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No students yet. Add your first student above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;