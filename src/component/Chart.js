import React, { memo } from 'react'
import { array } from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

 // Define an array of month names
 const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Chart
 * Display Line Chart for revenue analysis
 */
const Chart = ({ revenue }) => {

  // Create an object to store data by product and month
  const dataByProductAndMonth = {}

  // Initialize data for each product
  revenue.forEach((item) => {
    if (!dataByProductAndMonth[item.product]) {
      dataByProductAndMonth[item.product] = monthNames.map((month) => ({
        name: month,
        y: 0,
      }))
    }
  })

  // Populate the data
  revenue.forEach((item) => {
    const monthIndex = monthNames.indexOf(item.month)
    dataByProductAndMonth[item.product][monthIndex].y += item.acv
  })

  // Convert data to series format
  const series = Object.keys(dataByProductAndMonth).map((product) => ({
    name: product,
    data: dataByProductAndMonth[product],
  }))

  // Highcharts Configuration
  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'ACV by Product Over Time',
    },
    xAxis: {
      categories: monthNames, // Use the defined month names
      title: {
        text: 'Posting Period',
      },
    },
    yAxis: {
      title: {
        text: 'ACV',
      },
    },
    series: series,
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

// PropTypes for the Chart component
Chart.propTypes = {
  revenue: array,
}

export default memo(Chart)
