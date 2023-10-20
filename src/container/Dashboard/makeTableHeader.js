const columns = [
  {
    Header: 'S.No',                  // Header for the S.No column
    accessor: 'S_no',                // Data accessor for S.No
  },
  {
    Header: 'Line of Business',      // Header for the Line of Business column
    accessor: 'line_of_business',    // Data accessor for Line of Business
  },
  {
    Header: 'Revenue Type',          // Header for the Revenue Type column
    accessor: 'revenue_type',        // Data accessor for Revenue Type
  },
  {
    Header: 'Product',              // Header for the Product column
    accessor: 'product',            // Data accessor for Product
  },
  {
    Header: 'Posting Period',        // Header for the Posting Period column
    accessor: 'postingPeriod',      // Data accessor for Posting Period
  },
  {
    Header: 'ACV',                  // Header for the ACV column
    accessor: 'acv',                // Data accessor for ACV
    
    // Cell function formats the data as Indian currency (₹) using 'toLocaleString'
    Cell: ({
      row: {
        original: { acv },          // Access the 'acv' field in the original data
      },
    }) => `₹ ${acv.toLocaleString('en-IN')}`,
  },
  {
    Header: 'TCV',                  // Header for the TCV column
    accessor: 'tcv',                // Data accessor for TCV
    
    // Cell function formats the data as Indian currency (₹) using 'toLocaleString'
    Cell: ({
      row: {
        original: { tcv },          // Access the 'tcv' field in the original data
      },
    }) => `₹ ${tcv.toLocaleString('en-IN')}`,
  },
  {
    Header: 'Revenue',              // Header for the Revenue column
    accessor: 'revenue',            // Data accessor for Revenue
    
    // Cell function formats the data as Indian currency (₹) using 'toLocaleString'
    Cell: ({
      row: {
        original: { revenue },      // Access the 'revenue' field in the original data
      },
    }) => `₹ ${revenue.toLocaleString('en-IN')}`,
  },
];

export default columns;
