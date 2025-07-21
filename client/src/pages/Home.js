import React, { useState, useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import QRCode from 'qrcode.react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [shortId, setShortId] = useState('')
  const navigate = useNavigate()

  const handleShorten = async () => {
    setLoading(true)
    setError('')
    setShortUrl('')
    setCopied(false)
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      if (res.ok) {
        setShortUrl(data.shortUrl)
        setShortId(data.shortUrl.split('/').pop())
      } else {
        setError(data.error || 'Erro ao encurtar URL')
      }
    } catch (e) {
      setError('Erro de conexão')
    }
    setLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.div
      className="main-content"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0" style={{ letterSpacing: '-1px' }}>
          <i className="bi bi-link-45deg text-primary me-2"></i>Encurtar URL
        </h1>
        <motion.button
          className={`btn btn-light border-0 p-2 rounded-circle d-flex align-items-center shadow-sm position-relative ${
            darkMode ? 'bg-dark' : 'bg-white'
          }`}
          style={{ transition: 'background 0.3s' }}
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Alternar tema"
          whileTap={{ scale: 0.85, rotate: 20 }}
          animate={{ rotate: darkMode ? 180 : 0 }}
        >
          <i
            className={`bi ${
              darkMode
                ? 'bi-moon-stars-fill text-warning'
                : 'bi-sun-fill text-primary'
            }`}
            style={{ fontSize: 22, transition: 'color 0.3s' }}
          ></i>
        </motion.button>
      </div>
      <div className="section-spacing">
        <input
          type="url"
          className="form-control form-control-lg shadow-sm"
          placeholder="Cole a URL aqui..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={loading}
          autoFocus
        />
      </div>
      <motion.button
        className="btn btn-primary w-100 mb-3 py-2 fs-5 d-flex align-items-center justify-content-center gap-2"
        onClick={handleShorten}
        disabled={loading || !url}
        whileTap={{ scale: 0.97 }}
      >
        <i className="bi bi-lightning-charge-fill"></i>
        {loading ? 'Encurtando...' : 'Encurtar'}
      </motion.button>
      {error && (
        <motion.div
          className="alert alert-danger"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}
      {shortUrl && (
        <motion.div
          className="card text-center p-3 mb-3 shadow-sm"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180 }}
        >
          <div className="mb-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fw-bold fs-5 text-decoration-none"
            >
              <i className="bi bi-link-45deg me-1"></i>
              {shortUrl}
            </a>
          </div>
          <div className="d-flex justify-content-center gap-2 mb-2">
            <motion.button
              className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
              onClick={handleCopy}
              whileTap={{ scale: 0.92 }}
            >
              <i
                className={`bi ${
                  copied ? 'bi-clipboard-check-fill' : 'bi-clipboard'
                } fs-6`}
              ></i>
              {copied ? 'Copiado!' : 'Copiar'}
            </motion.button>
            <motion.button
              className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
              onClick={() => navigate(`/stats/${shortId}`)}
              whileTap={{ scale: 0.92 }}
            >
              <i className="bi bi-bar-chart-line"></i> Estatísticas
            </motion.button>
          </div>
          <div className="d-flex justify-content-center">
            <QRCode
              value={shortUrl}
              size={96}
              bgColor={darkMode ? '#222' : '#fff'}
              fgColor={darkMode ? '#fff' : '#222'}
            />
          </div>
        </motion.div>
      )}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="toast-copy"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <i className="bi bi-clipboard-check-fill fs-5"></i> Copiado para a
            área de transferência!
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="text-center mt-5 text-muted small">
        <span>
          Desenvolvido com <i className="bi bi-heart-fill text-danger"></i>{' '}
          React, Bootstrap 5 e Node.js
        </span>
      </footer>
    </motion.div>
  )
}
