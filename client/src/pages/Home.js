import React, { useState, useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import QRCode from 'qrcode.react'
import { useNavigate } from 'react-router-dom'

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
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Encurtador de URL</h1>
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
      <div className="mb-3">
        <input
          type="url"
          className="form-control form-control-lg"
          placeholder="Cole a URL aqui..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={loading}
        />
      </div>
      <button
        className="btn btn-primary w-100 mb-3"
        onClick={handleShorten}
        disabled={loading || !url}
      >
        {loading ? 'Encurtando...' : 'Encurtar'}
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      {shortUrl && (
        <div className="card text-center p-3 mb-3 shadow-sm">
          <div className="mb-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fw-bold fs-5"
            >
              {shortUrl}
            </a>
          </div>
          <div className="d-flex justify-content-center gap-2 mb-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleCopy}
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
            <button
              className="btn btn-outline-info btn-sm"
              onClick={() => navigate(`/stats/${shortId}`)}
            >
              Ver estatísticas
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <QRCode
              value={shortUrl}
              size={96}
              bgColor={darkMode ? '#222' : '#fff'}
              fgColor={darkMode ? '#fff' : '#222'}
            />
          </div>
        </div>
      )}
      <footer className="text-center mt-5 text-muted small">
        <span>Desenvolvido com React, Bootstrap 5 e Node.js</span>
      </footer>
    </div>
  )
}
