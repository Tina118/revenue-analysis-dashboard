import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from 'component/Navbar';
import RevenueTable from 'component/RevenueTable';
import { useRevenueAnalysisContext } from 'context';

import columns from './makeTableHeader';

// A function to normalize the revenue data
const normaliseData = (revenueInfo = []) => {
  // Step 1: Sort by 'acv' key in descending order
  const sortedData = revenueInfo
    .slice() // Create a copy to avoid modifying the original array
    .sort((a, b) => b.acv - a.acv); // Sort by 'acv' in descending order

  // Step 2: Update 'S_no' values
  const normalizedData = sortedData.map((revenue, index) => ({
    ...revenue,
    S_no: index + 1, // Update 'S_no' with the new order
    postingPeriod: `${revenue.month}-${revenue.year}`,
  }));

  return normalizedData;
};

/**
 * Dashboard
 * Represents the dashboard page.
 */
const Dashboard = () => {
  // Get the navigation function from React Router
  const navigate = useNavigate();

  // Initialize state to hold revenue data
  const [revenue, setRevenue] = useState([]);

  // Get the userName function from the context
  const { userName = '' } = useRevenueAnalysisContext();

  // Function to fetch and update revenue data
  const fetchData = async () => {
    try {
      const response = await fetch('api/revenue');
      const res = await response.json();
      const data = normaliseData(res.data);
      setRevenue(data);
    } catch (error) {
      // Handle error, e.g., show an error message to the user
    }
  };

  // Use useEffect for component lifecycle and data fetching
  useEffect(() => {
    // Check if there is no token stored in the local storage (not authenticated)
    if (!localStorage.getItem('token')) {
      // Redirect the user to the login page
      navigate('/');
    } else {
      // Fetch revenue data
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* Render the Navbar component with a callback to clear local storage and display the user's name */}
      <Navbar onClick={() => localStorage.clear()} userName={userName} />

      {/* Render the RevenueTable if data is available */}
      {revenue.length > 0 && <RevenueTable columns={columns} data={revenue} rowsPerPage={10} />}
    </div>
  );
};

export default Dashboard;
