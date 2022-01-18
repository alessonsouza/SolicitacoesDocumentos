/* eslint-disable space-before-function-paren */
/* eslint-disable no-use-before-define */
import React from 'react'
import { createTheme } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './rotas'
import { LoaderProvider } from './lib/context/loader-context'
import { AuthProvider } from './lib/context/auth-context'
import { UploadProvider } from './lib/context/upload-context'
// import Form from './components/form'
// import { Counter } from './components/Counter';

// import './custom.css'
// import { Router } from '@material-ui/icons';


function App() {
  const darkMode = false

  const theme = createTheme({
    spacing: 6,
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f44336'
      },
      secondary: {
        main: '#3EA6FF'
      },
      background: {
        default: darkMode ? '#232323' : '#FFF',
        dark: darkMode ? '#181818' : '#006690',
        paper: darkMode ? '#232323' : '#FFF'
      },
      backgroundImage: 'linear-gradient(45deg, #006600 30%, #FF8E53 96%)'
    }
  })

  // background: 'linear-gradient(45deg, #006690 30%, #FF8E53 90%)',
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  const supportsHistory = 'pushState' in window.history

  return (
    <LoaderProvider>
      <AuthProvider>
        <UploadProvider>
          <BrowserRouter
            basename={process.env.PUBLIC_URL}
            forceRefresh={!supportsHistory}>
            <Rotas />
          </BrowserRouter>
        </UploadProvider>
      </AuthProvider>
    </LoaderProvider>
  )
}
export default App
