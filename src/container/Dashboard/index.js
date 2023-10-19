import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


/**
 * Dashboard
 * 
 */
const Dashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>Dashboard</div>
}

export default Dashboard
