function StudentTable({ data = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden mt-4">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Age</th>
            <th className="p-3">Grade</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No students found
              </td>
            </tr>
          ) : (
            data.map((student, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.age}</td>
                <td className="p-3">{student.grade}</td>
                <td className="p-3">{student.email}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => onEdit(student)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(student)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;