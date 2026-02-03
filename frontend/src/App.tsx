import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold mb-4">AlixPartners Diagnostic Tool</h1>
      <div className="flex flex-col gap-2 w-80">
        <Link to="/login" className="bg-blue-600 text-white py-2 rounded text-center">Login</Link>
        <Link to="/diagnostic" className="bg-blue-600 text-white py-2 rounded text-center">Diagnostic</Link>
        <Link to="/profile" className="bg-blue-600 text-white py-2 rounded text-center">Profile</Link>
        <Link to="/team" className="bg-blue-600 text-white py-2 rounded text-center">Team Dashboard</Link>
        <Link to="/dashboard" className="bg-blue-600 text-white py-2 rounded text-center">Organisation Dashboard</Link>
        <Link to="/admin" className="bg-blue-600 text-white py-2 rounded text-center">Admin Panel</Link>
      </div>
    </div>
  )
}

export default App
