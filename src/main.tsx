import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/rubik'
import './index.css'
import App from './App'
import { AuthProvider } from './auth/AuthContext'
import { EventsProvider } from './data/EventsContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EventsProvider>
        <App />
      </EventsProvider>
    </AuthProvider>
  </StrictMode>
)
