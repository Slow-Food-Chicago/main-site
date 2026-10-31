import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ui/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import BoardPage from './pages/BoardPage'
import InitiativesPage from './pages/InitiativesPage'
import PantrySwapPage from './pages/PantrySwapPage'
import PreserveGardenPage from './pages/PreserveGardenPage'
import CalendarPage from './pages/CalendarPage'
import DesignSystemPage from './pages/DesignSystemPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-shell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/initiatives" element={<InitiativesPage />} />
          <Route path="/initiatives/pantry-swap" element={<PantrySwapPage />} />
          <Route path="/initiatives/preserve-garden" element={<PreserveGardenPage />} />
          <Route path="/events" element={<CalendarPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
