import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/rubik'
import './index.css'
import App from './App'
import { AuthProvider } from './auth/AuthContext'
import { EventsProvider } from './data/EventsContext'
import { RsvpsProvider } from './data/RsvpsContext'
import { SiteMovedPage } from './components/SiteMovedPage'
import { isOldSite } from './utils/siteMoved'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isOldSite(window.location) ? (
      <SiteMovedPage />
    ) : (
      <AuthProvider>
        <EventsProvider>
          <RsvpsProvider>
            <App />
          </RsvpsProvider>
        </EventsProvider>
      </AuthProvider>
    )}
  </StrictMode>
)
