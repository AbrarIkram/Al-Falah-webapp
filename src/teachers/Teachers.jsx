import { useState } from "react";
import TeacherFilter from "./TeacherFilter";
import TeacherForm from "./TeacherForm";
import TeacherTable from "./TeacherTable";


function Teachers() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teachers</h2>

      <button
        onClick={() => setOpenForm(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white w-14 h-14 rounded-full text-2xl shadow-lg"
      >
        +
      </button>

      <TeacherFilter />
      <TeacherTable />

      {openForm && (
        <TeacherForm onClose={() => setOpenForm(false)} />
      )}
    </div>
  );
}

export default Teachers;