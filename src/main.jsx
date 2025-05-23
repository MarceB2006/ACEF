import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginForm from './component/Login.jsx'
import ActaPanel from './component/Instructor/actaPanel.jsx'
import Acta from './component/Instructor/acta.jsx'
import Inicio from './component/coordinación/inicio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Inicio/>
  </StrictMode>,
)
