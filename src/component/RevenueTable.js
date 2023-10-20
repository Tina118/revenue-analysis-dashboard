import React from 'react'
import { useTable, usePagination } from 'react-table'

/**
 * RevenueTable
 * Displays Revenue Information in a table with pagination.
 */
const RevenueTable = ({ columns, data }) => {
  // Get table properties and data using react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    usePagination,
  )

  // Function to render page numbers dynamically
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const displayCount = 5; // The number of page numbers to display

    let startPage = Math.max(0, pageIndex - Math.floor(displayCount / 2));
    let endPage = startPage + displayCount - 1;

    if (endPage >= pageCount) {
      endPage = pageCount - 1;
      startPage = Math.max(0, endPage - displayCount + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNo) => (
      <li key={pageNo}>
        <span
          onClick={() => gotoPage(pageNo)}
          className={`flex items-center justify-center px-3 h-8 ${
            pageNo === pageIndex
              ? 'bg-blue-50 text-blue-600 border border-gray-300'
              : 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-100 hover-text-gray-700'
          }`}
        >
          {pageNo + 1}
        </span>
      </li>
    ));
  };

  // Render the UI for your table
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500"
      >
        <thead className="text-xs text-gray-700  bg-gray-100">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    className="px-6 py-3"
                  >
                    {column.render('Header')}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white border-b hover:bg-gray-50"
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} className="px-6 py-2">
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500">
          Showing{' '}
          <span className="font-semibold text-gray-900">
            {pageIndex * pageSize + 1}-
            {Math.min((pageIndex + 1) * pageSize, data.length)}
          </span>{' '}
          of <span className="font-semibold text-gray-900">{data.length}</span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${
              !canPreviousPage
                ? 'disabled:bg-gray-100 disabled:text-gray-70'
                : 'hover:bg-gray-100 hover:text-gray-70'
            }`}
          >
            Previous
          </li>
          {renderPageNumbers()} {/* Call the function to render dynamic page numbers */}
          <li
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${
              !canNextPage
                ? 'disabled:bg-gray-100 disabled:text-gray-70'
                : 'hover:bg-gray-100 hover:text-gray-70'
            }`}
          >
            Next
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default RevenueTable
