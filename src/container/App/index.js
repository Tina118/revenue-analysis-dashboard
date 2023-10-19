import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from 'container/Login'
import Registration from 'container/Registration'
import Dashboard from 'container/Dashboard'

/**
 * App
 * Handles routes for all pages
 */
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
