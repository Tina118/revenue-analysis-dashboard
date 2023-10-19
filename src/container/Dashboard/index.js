import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from 'component/Navbar'
import { useRevenueAnalysisContext } from 'context'

/**
 * Dashboard
 * Represents the dashboard page.
 */
const Dashboard = () => {
  // Get the navigation function from React Router
  const navigate = useNavigate()

  // Get the userName function from the context
  const { userName = '' } = useRevenueAnalysisContext()

  useEffect(() => {
    // Check if there is no token stored in the local storage (not authenticated)
    if (!localStorage.getItem('token')) {
      // Redirect the user to the login page
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {/* Render the Navbar component with a callback to clear local storage and display the user's name */}
      <Navbar onClick={() => localStorage.clear()} userName={userName}/>
    </div>
  )
}

export default Dashboard
