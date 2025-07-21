import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import Home from './pages/Home'
import Stats from './pages/Stats'
import Landing from './pages/Landing';
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/encurtar" element={<Home />} />
          <Route path="/stats/:shortId" element={<Stats />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
