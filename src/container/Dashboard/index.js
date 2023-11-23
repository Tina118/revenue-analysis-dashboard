import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Navbar from 'component/Navbar'
import RevenueTable from 'component/RevenueTable'
import Dropdown from 'component/Dropdown'
import Chart from 'component/Chart'
import { useRevenueAnalysisContext } from 'context'

import columns from './makeTableHeader'

// A function to normalize the revenue data
const normaliseData = (revenueInfo = []) => {
  // Step 1: Sort by 'acv' key in descending order
  const sortedData = revenueInfo
    .slice() // Create a copy to avoid modifying the original array
    .sort((a, b) => b.acv - a.acv) // Sort by 'acv' in descending order

  // Step 2: Update 'S_no' values
  const normalizedData = sortedData.map((revenue, index) => ({
    ...revenue,
    S_no: index + 1, // Update 'S_no' with the new order
    postingPeriod: `${revenue.month}-${revenue.year.toString().slice(2)}`,
  }))

  return normalizedData
}

// Function to get unique revenue types
const getUniqueRevenueTypes = (revenue) => {
  // Create a Set to store unique revenue types
  const uniqueRevenueTypes = new Set()

  // Iterate through the revenue data to collect unique revenue types
  revenue.forEach(({ revenue_type }) => {
    uniqueRevenueTypes.add(revenue_type)
  })

  // Convert the Set back to an array
  const uniqueRevenueTypesArray = Array.from(uniqueRevenueTypes).sort(
    (a, b) => {
      const numA = parseInt(a.match(/\d+/), 10) // Extract the numeric part of string a
      const numB = parseInt(b.match(/\d+/), 10) // Extract the numeric part of string b

      return numA - numB // Sort by the numeric value in ascending order
    },
  )

  return uniqueRevenueTypesArray
}

/**
 * Dashboard
 * Represents the Line chart and table for revenue analysis
 */

const Dashboard = () => {
  // Get the navigation function from React Router
  const navigate = useNavigate()

  // Get the userName,selectedOption from the context
  const { userName = '', selectedOption = '' } = useRevenueAnalysisContext()

  // Define state variables
  const [revenue, setRevenue] = useState([])
  const [revenueType, setRevenueType] = useState([])
  const [filteredRevenue, setFilteredRevenue] = useState(revenue)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fetch('api/revenue')
      const res = await response.json()
      const data = normaliseData(res.data)
      setRevenue(data)
      // Call the function to get unique revenue types
      setRevenueType(['All Revenue Type', ...getUniqueRevenueTypes(data)])
      setIsLoading(false)
    } catch (error) {
      toast.error(error)
      setIsLoading(false)
    }
  }

  // Use useEffect for component lifecycle and data fetching
  useEffect(() => {
    // Check if there is no token stored in the local storage (not authenticated)
    if (!localStorage.getItem('token')) {
      // Redirect the user to the login page
      navigate('/')
    } else {
      // Fetch revenue data
      fetchData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selectedOption !== 'All Revenue Type') {
      // If a specific revenue type is selected (not 'All Revenue Type'),
      // filter the revenue data to include only the selected type
      // Map the filtered data to update the 'S_no' property based on the filtered order
      // Note: We reset 'S_no' to start from 1 for the filtered data
      const filteredData = revenue
        .filter(({ revenue_type }) => revenue_type === selectedOption)
        .map((revenue, index) => ({
          ...revenue,
          S_no: index + 1,
        }))

      // Update the 'filteredRevenue' state with the filtered and renumbered data
      setFilteredRevenue(filteredData)
    } else {
      // If 'All Revenue Type' is selected, set 'filteredRevenue' to the original 'revenue' data
      setFilteredRevenue(revenue)
    }
  }, [selectedOption, revenue])

  return (
    <div className="relative">
      <Navbar onClick={() => localStorage.clear()} userName={userName} />
      {isLoading && (
        <div className="text-blue-600 font-bold text-4xl text-center absolute top-64 h-full w-full">
          Loading Data.....
        </div>
      )}
      {revenue.length === 0 && !isLoading && (
        <div className="text-blue-600 font-bold text-4xl text-center absolute top-64 h-full w-full">
          No data available to display, Please try after sometime.....
        </div>
      )}
      {revenue.length > 0 && !isLoading && (
        <div className=" px-2 py-5 md:px-20 md:py-10">
          <div className="relative">
            {/* Dropdown Component */}
            <Dropdown revenueType={revenueType} />

            {/* Chart Component */}
            <Chart revenue={filteredRevenue} />

            {/* Revenue Table Component */}
            <RevenueTable columns={columns} data={filteredRevenue} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
