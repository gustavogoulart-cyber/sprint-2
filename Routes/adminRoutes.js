// Routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../Dados/db');

// Painel do Dashboard
router.get('/dashboard', (req, res) => {
  // Cálculo dos indicadores principais (Requisitos)
  const totalProdutos = db.produtos.length;
  
  const valorTotalEstoque = db.produtos.reduce((acc, item) => {
    return acc + (item.preco * item.estoqueAtual);
  }, 0);

  const produtosBaixoEstoque = db.produtos.filter(
    item => item.estoqueAtual <= item.estoqueMinimo
  );

  res.render('/dashboard', {
    totalProdutos,
    valorTotalEstoque,
    produtosBaixoEstoque,
    ultimasMovimentacoes: db.movimentacoes.slice(-5).reverse()
  });
});

module.exports = router;