import React, { createContext, useContext, useState } from 'react'

const RevenueAnalysisContext = createContext({})

export function useRevenueAnalysisContext() {
  return useContext(RevenueAnalysisContext)
}

export const RevenueAnalysisProvider = ({children}) => {
  const [userName, setUserName] = useState('')

  const value = {
    userName,
    setUserName,
  }

  return (
    <RevenueAnalysisContext.Provider value={value}>
      {children}
    </RevenueAnalysisContext.Provider>
  )
}
