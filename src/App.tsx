import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ui/ScrollToTop'
import TelemetryRouteTracker from './telemetry/TelemetryRouteTracker'
import WildcardRedirect from './telemetry/WildcardRedirect'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import BoardPage from './pages/BoardPage'
import InitiativesPage from './pages/InitiativesPage'
import PantrySwapPage from './pages/PantrySwapPage'
import PreserveGardenPage from './pages/PreserveGardenPage'
import ArkOfTastePage from './pages/ArkOfTastePage'
import SnailOfApprovalPage from './pages/SnailOfApprovalPage'
import CalendarPage from './pages/CalendarPage'
import DesignSystemPage from './pages/DesignSystemPage'

export default function App() {
  return (
    <BrowserRouter>
      <TelemetryRouteTracker />
      <ScrollToTop />
      <div className="site-shell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leadership" element={<BoardPage />} />
          <Route path="/board" element={<Navigate to="/leadership" replace />} />
          <Route path="/initiatives" element={<InitiativesPage />} />
          <Route path="/initiatives/pantry-swap" element={<PantrySwapPage />} />
          <Route path="/initiatives/preserve-garden" element={<PreserveGardenPage />} />
          <Route path="/initiatives/ark-of-taste" element={<ArkOfTastePage />} />
          <Route path="/ark-of-taste" element={<ArkOfTastePage />} />
          <Route path="/initiatives/snail-of-approval" element={<SnailOfApprovalPage />} />
          <Route path="/snail-of-approval" element={<SnailOfApprovalPage />} />
          <Route path="/events" element={<CalendarPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<WildcardRedirect to="/" />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
