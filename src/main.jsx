import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'
import { AgeGroupProvider } from './lib/ageGroup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <AgeGroupProvider>
        <App />
      </AgeGroupProvider>
    </LangProvider>
  </StrictMode>,
)
