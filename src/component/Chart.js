import React from 'react'
import {array} from 'prop-types';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

/**
 * Chart
 * Display Line Chart for revenue analysis 
 */
const Chart = ({ revenue }) => {
  // Highcharts Configuration
  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'ACV by Product Over Time',
    },
    xAxis: {
      categories: ['January','Februray','March','April','May','June','July','August','September','October','November','December'],
      title: {
        text: 'Posting Period',
      },
    },
    yAxis: {
      title: {
        text: 'ACV',
      },
    },
    series: revenue
      .reduce((products, item) => {
        const productIndex = products.findIndex((p) => p.name === item.product)

        if (productIndex === -1) {
          // Product not found in the products array, add it
          products.push({
            name: item.product,
            data: [item.acv],
          })
        } else {
          // Product found, add ACV to its data
          products[productIndex].data.push(item.acv)
        }

        return products
      }, [])
      .map((productData) => ({
        name: productData.name,
        data: productData.data,
      })),
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

// PropTypes for the Chart component
Chart.propTypes = {
    revenue: array
  };

export default Chart 
