import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import HomePage from './pages/HomePage'
import BoardPage from './pages/BoardPage'
import GetInvolvedPage from './pages/GetInvolvedPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
