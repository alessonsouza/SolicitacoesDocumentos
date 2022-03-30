/* eslint-disable no-use-before-define */
import React, { createContext, useState } from 'react'

const HistoryContext = createContext()

const HistoryProvider = ({ children }) => {
  const [path, setPath] = useState(null)

  return (
    <HistoryContext.Provider value={{ path, setPath }}>
      {children}
    </HistoryContext.Provider>
  )
}

export { HistoryContext, HistoryProvider }
