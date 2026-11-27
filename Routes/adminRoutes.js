const express = require('express');
const router = express.Router();
const BD = require('../db');

router.get('/dashboard', async (req, res) => {
    try {
        const resultadoCategorias = await BD.query('SELECT * FROM categorias ORDER BY nome');
        const queryProdutos = 'SELECT * FROM produtos;';
        const resultProdutos = await BD.query(queryProdutos); // <--- Corrigido para BD
        const produtos = resultProdutos.rows;

        const valorTotalEstoque = produtos.reduce((acc, p) => acc + (parseFloat(p.preco) * p.estoque_atual), 0);
        const totalProdutos = produtos.length;
        const produtosBaixoEstoque = produtos.filter(p => p.estoque_atual <= p.estoque_minimo);

res.render('admin/dashboard', {
    categorias: resultadoCategorias.rows,
    produtos: produtos,
    valorTotalEstoque,
    totalProdutos,
    produtosBaixoEstoque,
    ultimasMovimentacoes: [],
    usuario: req.session.usuario
});
    } catch (erro) {
        console.log('Erro ao carregar dashboard: ' + erro);
        res.status(500).send('Erro ao carregar dashboard');
    }
});

module.exports = router;