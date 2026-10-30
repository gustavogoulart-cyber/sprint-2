// Routes/produtosRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../Dados/db');

// 1. Listagem / Relatório de Produtos (com Filtros e Ordenação)
router.get('/', (req, res) => {
  let lista = [...db.produtos];
  const { busca, ordenacao } = req.query;

  // Filtro de Busca por Nome
  if (busca) {
    lista = lista.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
  }

  // Ordenação do Relatório
  if (ordenacao === 'preco-asc') {
    lista.sort((a, b) => a.preco - b.preco);
  } else if (ordenacao === 'estoque-desc') {
    lista.sort((a, b) => b.estoqueAtual - a.estoqueAtual);
  } else if (ordenacao === 'baixo-estoque') {
    lista = lista.filter(p => p.estoqueAtual <= p.estoqueMinimo);
  }

  res.render('produtos', { 
    produtos: lista, 
    busca: busca || '', 
    ordenacao: ordenacao || '' 
  });
});

// 2. Registar Movimentação de Estoque (Entrada / Saída)
router.post('/movimentar', (req, res) => {
  const { produtoId, tipo, quantidade, descricao } = req.body;
  
  const produto = db.produtos.find(p => p.id === parseInt(produtoId));
  const qtd = parseInt(quantidade);

  if (produto && qtd > 0) {
    // Atualização automática da quantidade em stock
    if (tipo === 'entrada') {
      produto.estoqueAtual += qtd;
    } else if (tipo === 'saida') {
      // Impede que o stock fique negativo
      if (produto.estoqueAtual >= qtd) {
        produto.estoqueAtual -= qtd;
      }
    }

    // Registo do Histórico
    const novaMovimentacao = {
      id: db.movimentacoes.length + 1,
      produtoId: produto.id,
      tipo,
      quantidade: qtd,
      data: new Date().toLocaleString('pt-BR'),
      descricao,
      estoqueResultante: produto.estoqueAtual
    };

    db.movimentacoes.push(novaMovimentacao);
  }

  res.redirect('/produtos');
});

// OBRIGATÓRIO: Exportar o router para não dar erro no app.js!
module.exports = router;