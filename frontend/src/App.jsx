import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import MotionPolish from './components/MotionPolish'
import IOSTabBar from './components/IOSTabBar'
import BlurTextScroller from './components/BlurTextScroller'
import ScrollMotion from './components/ScrollMotion'
import MotionDirector from './components/MotionDirector'
import About from './pages/About'
import Services from './pages/Services'
import Work from './pages/Work'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

function App() {
  const location = useLocation()

  return (
    <div className="App">
      <ScrollToTop />
      <ScrollMotion />
      <MotionPolish />
      <MotionDirector />
      <Navbar />
      {/* keyed wrapper replays the page-enter transition on every route change */}
      <div key={location.pathname} className="page-shell">
        <Routes location={location}>
          <Route path="/" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <BlurTextScroller />
      <Footer />
      <IOSTabBar />
    </div>
  )
}

export default App
