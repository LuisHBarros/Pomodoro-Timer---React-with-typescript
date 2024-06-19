import React from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { CyclesContextProvider } from './context/CyclesContext'

function App() {

  return (
      <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
              <CyclesContextProvider>
                    <Router />
              </CyclesContextProvider>
          </BrowserRouter>
        <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
