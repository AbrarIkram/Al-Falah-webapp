import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
        
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Hello World 👋
        </h1>

        <p className="text-gray-600 mb-6">
          My first Tailwind React App
        </p>

        <button
          onClick={() => setCount(count + 1)}
          className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          Count: {count}
        </button>

      </div>
    </div>
  );
}

export default App;