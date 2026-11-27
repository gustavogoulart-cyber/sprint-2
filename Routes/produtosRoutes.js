// Routes/produtosRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

const QUERY_PRODUTOS = `
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
    p.categoria_id AS "categoriaId",
    c.nome AS "categoriaNome"
  FROM produtos p
  LEFT JOIN categorias c ON p.categoria_id = c.id
  ORDER BY p.id;
`;

// Listar produtos e estoque
router.get('/', async (req, res) => {
  try {
    const resultado = await db.query(QUERY_PRODUTOS);
    const categorias = await db.query('SELECT id, nome FROM categorias ORDER BY nome;');

    res.render('produtos', {
      produtos: resultado.rows,
      categorias: categorias.rows,
      produtoEdicao: null,
      usuarioLogado: req.session?.usuario || null
    });
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).send('Erro ao buscar a lista de produtos.');
  }
});

// Cadastrar novo produto
router.post('/', async (req, res) => {
  const {
    nome,
    preco,
    estoque_atual,
    estoque_minimo,
    autonomia,
    velocidade_maxima,
    descricao,
    imagem,
    categoria_id
  } = req.body;

  try {
    await db.query(
      `
      INSERT INTO produtos (
        nome,
        preco,
        estoque_atual,
        estoque_minimo,
        autonomia,
        velocidade_maxima,
        descricao,
        imagem,
        categoria_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
      `,
      [
        nome,
        parseFloat(preco),
        parseInt(estoque_atual, 10) || 0,
        parseInt(estoque_minimo, 10) || 0,
        autonomia || null,
        velocidade_maxima || null,
        descricao || null,
        imagem || null,
        parseInt(categoria_id, 10)
      ]
    );

    res.redirect('/produtos');
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err);
    res.status(500).send('Erro ao cadastrar produto.');
  }
});

// Carregar produto para edição (estoque, preço, dados)
router.get('/editar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todos = await db.query(QUERY_PRODUTOS);
    const categorias = await db.query('SELECT id, nome FROM categorias ORDER BY nome;');
    const buscado = await db.query(
      `
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
        p.categoria_id AS "categoriaId"
      FROM produtos p
      WHERE p.id = $1;
      `,
      [id]
    );

    if (buscado.rows.length === 0) {
      return res.redirect('/produtos');
    }

    res.render('produtos', {
      produtos: todos.rows,
      categorias: categorias.rows,
      produtoEdicao: buscado.rows[0],
      usuarioLogado: req.session?.usuario || null
    });
  } catch (err) {
    console.error('Erro ao buscar produto para edição:', err);
    res.status(500).send('Erro ao carregar produto para edição.');
  }
});

// Salvar alterações do produto e do estoque
router.post('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    preco,
    estoque_atual,
    estoque_minimo,
    autonomia,
    velocidade_maxima,
    descricao,
    categoria_id
  } = req.body;

  try {
    await db.query(
      `
      UPDATE produtos
      SET
        nome = $1,
        preco = $2,
        estoque_atual = $3,
        estoque_minimo = $4,
        autonomia = $5,
        velocidade_maxima = $6,
        descricao = $7,
        categoria_id = $8
      WHERE id = $9;
      `,
      [
        nome,
        parseFloat(preco),
        parseInt(estoque_atual, 10),
        parseInt(estoque_minimo, 10),
        autonomia,
        velocidade_maxima,
        descricao,
        parseInt(categoria_id, 10),
        id
      ]
    );

    res.redirect('/produtos');
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).send('Erro ao atualizar produto.');
  }
});

// Excluir produto
router.post('/excluir/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM produtos WHERE id = $1;', [id]);
    res.redirect('/produtos');
  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    res.status(500).send('Erro ao excluir produto.');
  }
});

module.exports = router;