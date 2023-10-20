import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from 'component/Navbar'
import RevenueTable from 'component/RevenueTable'
import { useRevenueAnalysisContext } from 'context'

import columns from './makeTableHeader'

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

// Function to get unique revenue types
const getUniqueRevenueTypes = (revenue) => {
  // Create a Set to store unique revenue types
  const uniqueRevenueTypes = new Set()

  // Iterate through the revenue data to collect unique revenue types
  revenue.forEach((item) => {
    uniqueRevenueTypes.add(item.revenue_type)
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
 * Represents the dashboard page.
 */

const Dashboard = () => {
  // Get the navigation function from React Router
  const navigate = useNavigate()

   // Get the userName function from the context
  const { userName = '' } = useRevenueAnalysisContext()

  // Define state variables
  const [revenue, setRevenue] = useState([])
  const [selectedOption, setSelectedOption] = useState('All Revenue Type')
  const [dropdownOpen, setDropdownOpen] = useState(false) // State for dropdown
  const [revenueType, setRevenueType] = useState([])
  const [filteredRevenue,setFilteredRevenue] = useState(revenue)

  const fetchData = async () => {
    try {
      const response = await fetch('api/revenue')
      const res = await response.json()
      const data = normaliseData(res.data)
      setRevenue(data)
      // Call the function to get unique revenue types
      setRevenueType(['All Revenue Type', ...getUniqueRevenueTypes(data)])
    } catch (error) {
      // Handle error
    }
  }

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

useEffect(() => {
  if (selectedOption !== 'All Revenue Type') {
    // If a specific revenue type is selected (not 'All Revenue Type'),
    // filter the revenue data to include only the selected type
    const filteredData = revenue.filter(({ revenue_type }) => revenue_type === selectedOption);

    // Map the filtered data to update the 'S_no' property based on the filtered order
    // Note: We reset 'S_no' to start from 1 for the filtered data
    const filteredDataWithSNo = filteredData.map((revenue, index) => ({
      ...revenue,
      S_no: index + 1,
    }));

    // Update the 'filteredRevenue' state with the filtered and renumbered data
    setFilteredRevenue(filteredDataWithSNo);
  } else {
    // If 'All Revenue Type' is selected, set 'filteredRevenue' to the original 'revenue' data
    setFilteredRevenue(revenue);
  }
}, [selectedOption, revenue]);


  const toggleDropdown = () => {
    // Toggle the dropdownOpen state to open or close the dropdown
    setDropdownOpen(!dropdownOpen)
  }


  return (
    <div>
      <Navbar onClick={() => localStorage.clear()} userName={userName} />

      {revenue.length > 0 && (
        <div className="px-20 py-10">
          <div className="flex items-center justify-between pb-4">
            <div>
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
                type="button"
                onClick={toggleDropdown} // Toggle the dropdown on button click
              >
                {selectedOption}
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 ${
                    dropdownOpen ? 'transform rotate-180' : ''
                  }`} // Rotate arrow icon if dropdown is open
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownRadio"
                className={`z-20 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow ${
                  dropdownOpen ? '' : 'hidden'
                }`} // Add or remove 'hidden' class
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="top"
              >
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700"
                  aria-labelledby="dropdownRadioButton"
                >
                  {revenueType.map((type) => (
                    <li key={type}>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100">
                        <input
                          id="filter-radio-example-5"
                          type="radio"
                          name="filter-radio"
                          onChange={() => {
                            setSelectedOption(type)
                            setDropdownOpen(false) // Close the dropdown on option selection
                          }}
                        />
                        <label
                          htmlFor="filter-radio-example-5"
                          className="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                        >
                          {type}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <RevenueTable columns={columns} data={filteredRevenue} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
