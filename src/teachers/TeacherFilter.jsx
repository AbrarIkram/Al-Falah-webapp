import { useState } from "react";

function TeacherFilter({ onFilter }) {
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    onFilter?.(value);
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow flex gap-3 items-center">
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search teacher..."
        className="w-full border p-2 rounded"
      />

      <select className="border p-2 rounded">
        <option>All Subjects</option>
        <option>Math</option>
        <option>Science</option>
        <option>English</option>
      </select>
    </div>
  );
}

export default TeacherFilter;