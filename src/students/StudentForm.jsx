import { useState } from "react";

function StudentForm({ onClose, onSave, editData }) {
  const [form, setForm] = useState(
    editData || {
      name: "",
      age: "",
      grade: "",
      email: "",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[400px] p-6 rounded-2xl shadow-lg">
        
        <h2 className="text-xl font-bold mb-4">
          {editData ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="grade"
            placeholder="Grade"
            value={form.grade}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default StudentForm;