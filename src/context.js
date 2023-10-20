import React, { createContext, useContext, useState } from 'react'

const RevenueAnalysisContext = createContext({})

export function useRevenueAnalysisContext() {
  return useContext(RevenueAnalysisContext)
}

export const RevenueAnalysisProvider = ({children}) => {
  const [userName, setUserName] = useState('')
  const [selectedOption, setSelectedOption] = useState('All Revenue Type')

  const value = {
    userName,
    setUserName,
    selectedOption,
    setSelectedOption
  }

  return (
    <RevenueAnalysisContext.Provider value={value}>
      {children}
    </RevenueAnalysisContext.Provider>
  )
}
