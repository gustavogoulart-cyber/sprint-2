// Routes/landingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../Dados/db');

// Rota principal da Landing Page
router.get('/', (req, res) => {
  const categoriaId = req.query.categoria;
  
  let produtosFiltrados = db.produtos.filter(p => p.ativo);

  if (categoriaId) {
    produtosFiltrados = produtosFiltrados.filter(
      p => p.categoriaId === parseInt(categoriaId)
    );
  }

  res.render('admin/index', {
    produtos: produtosFiltrados,
    categorias: db.categorias,
    categoriaSelecionada: categoriaId || ''
  });
});

module.exports = router;