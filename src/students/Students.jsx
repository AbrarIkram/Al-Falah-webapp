import { useState } from "react";
import StudentFilter from "./StudentFilter";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

function Students() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-3xl font-bold text-gray-900">Students</h2>
          <p className="text-gray-600 mt-1">Manage and view all student records</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <StudentFilter />
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <StudentTable />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setOpenForm(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full text-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Add new student"
      >
        +
      </button>

      {/* Modal Overlay */}
      {openForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <StudentForm onClose={() => setOpenForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;