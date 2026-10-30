// Routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Rota do Dashboard usando SELECT
router.get('/dashboard', async (req, res) => {
  try {
    const queryProdutos = 'SELECT * FROM produtos;';
    const resultProdutos = await db.query(queryProdutos);
    const produtos = resultProdutos.rows;

    const valorTotalEstoque = produtos.reduce((acc, p) => acc + (parseFloat(p.preco) * p.estoque_atual), 0);
    const totalProdutos = produtos.length;
    const produtosBaixoEstoque = produtos.filter(p => p.estoque_atual <= p.estoque_minimo);

    res.render('admin/index', {
      valorTotalEstoque,
      totalProdutos,
      produtosBaixoEstoque
    });
  } catch (err) {
    console.error('Erro ao carregar o dashboard:', err);
    res.status(500).send('Erro no servidor ao consultar a base de dados.');
  }
});

module.exports = router;