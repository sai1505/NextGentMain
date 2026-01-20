import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Vite + React + Tailwind</h1>

      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Count: {count}
      </button>

      <p className="mt-4 text-sm text-gray-600">
        Edit <code className="bg-gray-200 px-1 rounded">src/App.jsx</code> and save
      </p>
    </div>
  );
}
