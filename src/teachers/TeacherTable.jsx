function TeacherTable({ data = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden mt-4">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan="5">
                No teachers found
              </td>
            </tr>
          ) : (
            data.map((t, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{t.name}</td>
                <td className="p-3">{t.subject}</td>
                <td className="p-3">{t.email}</td>
                <td className="p-3">{t.phone}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => onEdit?.(t)}
                    className="px-3 py-1 bg-yellow-400 rounded text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete?.(t)}
                    className="px-3 py-1 bg-red-500 rounded text-white"
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

export default TeacherTable;