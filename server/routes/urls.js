const express = require('express')
const router = express.Router()
const Url = require('../models/Url')
const crypto = require('crypto')

// Função para gerar shortId único de 6 caracteres
function generateShortId() {
  return crypto.randomBytes(4).toString('base64url').slice(0, 6)
}

// POST /api/shorten - encurtar URL
router.post('/shorten', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'URL obrigatória' })

  let shortId
  let exists = true
  // Garante shortId único
  while (exists) {
    shortId = generateShortId()
    exists = await Url.findOne({ shortId })
  }

  const newUrl = new Url({
    originalUrl: url,
    shortId
  })
  await newUrl.save()
  res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` })
})

// GET /:shortId - redirecionar e gravar estatísticas
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params
  const urlDoc = await Url.findOne({ shortId })
  if (!urlDoc) return res.status(404).json({ error: 'URL não encontrada' })

  // Grava estatísticas
  urlDoc.clicks++
  urlDoc.stats.push({
    date: new Date(),
    ip: req.ip,
    userAgent: req.headers['user-agent'] || ''
  })
  await urlDoc.save()
  res.redirect(urlDoc.originalUrl)
})

// GET /api/stats/:shortId - estatísticas de acesso
router.get('/stats/:shortId', async (req, res) => {
  const { shortId } = req.params
  const urlDoc = await Url.findOne({ shortId })
  if (!urlDoc) return res.status(404).json({ error: 'URL não encontrada' })
  res.json({
    originalUrl: urlDoc.originalUrl,
    shortId: urlDoc.shortId,
    createdAt: urlDoc.createdAt,
    clicks: urlDoc.clicks,
    stats: urlDoc.stats
  })
})

module.exports = router
