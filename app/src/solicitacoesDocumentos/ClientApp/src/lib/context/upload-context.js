/* eslint-disable no-use-before-define */
import React, { createContext, useState } from 'react'

const UploadContext = createContext()

const UploadProvider = ({ children }) => {
  const [dadosUpload, setDadosUpload] = useState(null)

  return (
    <UploadContext.Provider value={{ dadosUpload, setDadosUpload }}>
      {children}
    </UploadContext.Provider>
  )
}

export { UploadContext, UploadProvider }
