import React from 'react'
import ReactDOM from 'react-dom/client'
import './theme/app-theme.less'
import App from './App.jsx'
import CustomProvider from 'rsuite/CustomProvider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomProvider theme="light">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CustomProvider>
  </React.StrictMode>,
)
