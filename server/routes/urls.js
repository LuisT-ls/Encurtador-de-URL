const express = require('express');
const router = express.Router();

// Modelo e lógica serão implementados depois

// POST /api/shorten - encurtar URL
router.post('/shorten', (req, res) => {
  // lógica de encurtamento
  res.json({ message: 'Encurtar URL' });
});

// GET /:shortId - redirecionar
router.get('/:shortId', (req, res) => {
  // lógica de redirecionamento
  res.json({ message: 'Redirecionar para URL original' });
});

// GET /api/urls - visualizar todas as URLs
router.get('/api/urls', (req, res) => {
  // lógica de listagem
  res.json({ message: 'Listar URLs' });
});

module.exports = router; 