import { useState } from "react";

function UserTable() {
  const [users, setUsers] = useState([
    { id: 1, name: "Abrar Ikram", email: "abrar@gmail.com", role: "Admin" },
    { id: 2, name: "John Doe", email: "john@gmail.com", role: "Staff" },
  ]);

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4">

      <table className="w-full border-collapse">

        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Role</th>
            <th className="text-left p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default UserTable;