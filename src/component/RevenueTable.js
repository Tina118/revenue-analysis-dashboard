import React from 'react'
import { useTable } from 'react-table'


/**
 * RevenueTable
 * Displays Revenue Information in table with pagination
 */
const RevenueTable = ({ columns, data }) => {
    // Get table properties and data using react-table
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    })

  // Render the UI for your table
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500"
      >
        <thead className="text-xs text-gray-700  bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    className="px-6 py-3"
                    ///style={{ width: column.width }}
                  >
                    {column.render('Header')}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white border-b  hover:bg-gray-50 "
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-6 py-4">
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav
        class="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span class="text-sm font-normal text-gray-500 ">
          Showing <span class="font-semibold text-gray-900 ">1-10</span> of{' '}
          <span class="font-semibold text-gray-900 ">1000</span>
        </span>
        <ul class="inline-flex -space-x-px text-sm h-8">
          <li>
            <span
              href="#"
              class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-70"
            >
              Previous
            </span>
          </li>
          <li>
            <span
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              1
            </span>
          </li>
          <li>
            <span
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              2
            </span>
          </li>
          <li>
            <span
              href="#"
              aria-current="page"
              class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
            >
              3
            </span>
          </li>
          <li>
            <span
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              4
            </span>
          </li>
          <li>
            <span
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              5
            </span>
          </li>
          <li>
            <span
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default RevenueTable
