import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Teju from './Teju.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Teju /> */}
  </StrictMode>,
)
