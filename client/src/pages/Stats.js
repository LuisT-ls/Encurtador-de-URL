import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Stats() {
  const { shortId } = useParams()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/api/stats/${shortId}`)
        const data = await res.json()
        if (res.ok) setStats(data)
        else setError(data.error || 'Erro ao buscar estatísticas')
      } catch (e) {
        setError('Erro de conexão')
      }
      setLoading(false)
    }
    fetchStats()
  }, [shortId])

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="fw-bold mb-4">Estatísticas</h2>
      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {stats && (
        <div className="card p-3 shadow-sm mb-3">
          <div className="mb-2">
            <span className="fw-bold">URL original:</span>
            <br />
            <a
              href={stats.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {stats.originalUrl}
            </a>
          </div>
          <div className="mb-2">
            <span className="fw-bold">Encurtada:</span>
            <br />
            <a
              href={`/${stats.shortId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              /{stats.shortId}
            </a>
          </div>
          <div className="mb-2">
            <span className="fw-bold">Criada em:</span>{' '}
            {new Date(stats.createdAt).toLocaleString()}
          </div>
          <div className="mb-2">
            <span className="fw-bold">Cliques:</span> {stats.clicks}
          </div>
          <div>
            <span className="fw-bold">Acessos:</span>
            <ul className="list-group list-group-flush">
              {stats.stats.length === 0 && (
                <li className="list-group-item">
                  Nenhum acesso registrado ainda.
                </li>
              )}
              {stats.stats.map((s, i) => (
                <li className="list-group-item" key={i}>
                  <span className="me-2">
                    {new Date(s.date).toLocaleString()}
                  </span>
                  <span className="me-2">IP: {s.ip}</span>
                  <span className="me-2">Navegador: {s.userAgent}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Link to="/" className="btn btn-outline-primary mt-3">
        Voltar
      </Link>
    </div>
  )
}
