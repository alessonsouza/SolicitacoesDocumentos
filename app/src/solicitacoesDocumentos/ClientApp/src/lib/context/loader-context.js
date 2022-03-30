// eslint-disable-next-line no-use-before-define
import React, { createContext, useState } from 'react'

const LoaderContext = createContext()

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading, estaAutenticado, setEstaAutenticado }}>
      {children}
    </LoaderContext.Provider>
  )
}

export { LoaderContext, LoaderProvider }
