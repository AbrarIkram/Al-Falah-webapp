import { useState } from "react";

function UserForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New User:", form);

    // 👉 later you can connect API / DB here

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg relative">

        <h2 className="text-xl font-bold mb-4">Add User</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="role"
            placeholder="Role (Admin, Staff...)"
            value={form.role}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UserForm;