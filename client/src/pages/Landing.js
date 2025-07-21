import React from 'react'
import { motion } from 'framer-motion'

export default function Landing() {
  return (
    <motion.div
      className="main-content text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mb-4">
        <i
          className="bi bi-lightning-charge-fill text-warning"
          style={{ fontSize: 48 }}
        ></i>
      </div>
      <h1 className="fw-bold mb-3">Encurtador de URL</h1>
      <p className="fs-5 mb-4">
        ⚡ Encurte suas URLs com rapidez, estilo e segurança.
      </p>
      <div className="d-flex justify-content-center">
        <a href="/" className="btn btn-primary btn-lg px-4 shadow-sm">
          Começar agora <i className="bi bi-arrow-right ms-2"></i>
        </a>
      </div>
    </motion.div>
  )
}
