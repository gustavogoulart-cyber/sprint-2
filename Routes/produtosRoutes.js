// Routes/produtosRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id, 
        p.nome, 
        p.preco, 
        p.estoque_atual AS "estoqueAtual", 
        p.estoque_minimo AS "estoqueMinimo",
        p.autonomia,
        p.velocidade_maxima AS "velocidadeMaxima",
        p.descricao,
        p.imagem,
        c.nome AS "categoriaNome"
      FROM produtos p
      JOIN categorias c ON p.categoria_id = c.id
      ORDER BY p.id;
    `;
    const resultado = await db.query(query);

    res.render('produtos', { produtos: resultado.rows });
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).send('Erro ao buscar a lista de produtos.');
  }
});

module.exports = router;