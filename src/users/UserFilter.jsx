import { useState } from "react";

function UserFilter() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  return (
    <div className="bg-white p-4 rounded-xl shadow flex gap-3 items-center">

      {/* Search */}
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Role filter */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All</option>
        <option value="Admin">Admin</option>
        <option value="Staff">Staff</option>
      </select>

      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Filter
      </button>

    </div>
  );
}

export default UserFilter;