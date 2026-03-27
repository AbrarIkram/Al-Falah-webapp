import { useState } from "react";

function StudentFilter({ onFilter }) {
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    onFilter(value);
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow flex gap-2">
      
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search students..."
        className="flex-1 border p-2 rounded"
      />

      <select className="border p-2 rounded">
        <option value="">All Grades</option>
        <option value="A">Grade A</option>
        <option value="B">Grade B</option>
        <option value="C">Grade C</option>
      </select>

    </div>
  );
}

export default StudentFilter;