import React, { useState } from 'react';
import {arrayOf,string,func} from 'prop-types';

/**
 * Dropdown
 * A component for rendering a dropdown menu.
 */
const Dropdown = ({ revenueType, selectedOption, setSelectedOption }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown

  const toggleDropdown = () => {
    // Toggle the dropdownOpen state to open or close the dropdown
    setDropdownOpen(!dropdownOpen);
  };

  return (
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
          className={`z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow absolute top-[33px] left-0 ${
            dropdownOpen ? '' : 'hidden'
          }`}
          // Add or remove 'hidden' class
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement={`top-${dropdownOpen ? 'start' : 'end'}`}
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700"
            aria-labelledby="dropdownRadioButton"
          >
            {revenueType.map((type) => (
              <li key={type}>
                <div className="flex items-center p-2 rounded hover-bg-gray-100">
                  <input
                    id="filter-radio-example-5"
                    type="radio"
                    name="filter-radio"
                    onChange={() => {
                      setSelectedOption(type);
                      setDropdownOpen(false); // Close the dropdown on option selection
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
  );
};

// PropTypes for the Dropdown component
Dropdown.propTypes = {
  revenueType: arrayOf(string),
  selectedOption: string,
  setSelectedOption: func,
};

export default Dropdown;
