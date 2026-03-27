import { useState } from "react";
import UserFilter from "./UserFilter";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

function Users() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>

        <button
          onClick={() => setOpenForm(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full text-2xl shadow-lg"
        >
          +
        </button>
      </div>

      <UserFilter />
      <UserTable />

      {openForm && <UserForm onClose={() => setOpenForm(false)} />}
    </div>
  );
}

export default Users;