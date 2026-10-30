// Routes/landingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/', async (req, res) => {
  try {
    const produtosQuery = `
      SELECT p.*, c.nome AS "categoriaNome"
      FROM produtos p
      JOIN categorias c ON p.categoria_id = c.id
      WHERE p.ativo = true
      ORDER BY p.id;
    `;
    const produtosRes = await db.query(produtosQuery);
    const categoriasRes = await db.query('SELECT * FROM categorias ORDER BY nome;');

    res.render('admin/index', { 
      produtos: produtosRes.rows,
      categorias: categoriasRes.rows
    });
  } catch (err) {
    console.error('Erro ao carregar landing page:', err);
    res.status(500).send('Erro ao carregar a página inicial.');
  }
});

module.exports = router;