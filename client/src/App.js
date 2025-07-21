import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    document.body.classList.toggle('bg-dark', darkMode)
    document.body.classList.toggle('text-light', darkMode)
    document.body.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Encurtador de URL</h1>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            {darkMode ? 'Modo Escuro' : 'Modo Claro'}
          </label>
        </div>
      </div>
      {/* Formulário e listagem de URLs serão implementados aqui */}
      <div className="alert alert-info">
        Interface inicial pronta. Implemente o formulário e a listagem de URLs.
      </div>
    </div>
  )
}

export default App
