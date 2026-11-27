// Routes/categoriasRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar categorias
router.get('/', async (req, res) => {
  try {
    const resultado = await db.query('SELECT id, nome, descricao FROM categorias ORDER BY id ASC;');
    res.render('categorias', {
      categorias: resultado.rows,
      categoriaEdicao: null
    });
  } catch (err) {
    console.error('Erro ao buscar categorias:', err);
    res.status(500).send('Erro ao carregar categorias.');
  }
});

// Cadastrar nova categoria
router.post('/', async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    await db.query(
      'INSERT INTO categorias (nome, descricao) VALUES ($1, $2);',
      [nome, descricao || null]
    );

    res.redirect('/categorias');
  } catch (err) {
    console.error('Erro ao cadastrar categoria:', err);
    res.status(500).send('Erro ao cadastrar categoria.');
  }
});

// Abrir formulário de edição da categoria
router.get('/editar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultadoCategorias = await db.query('SELECT id, nome, descricao FROM categorias ORDER BY id ASC;');
    const resultadoEdicao = await db.query('SELECT id, nome, descricao FROM categorias WHERE id = $1;', [id]);

    if (resultadoEdicao.rows.length === 0) {
      return res.redirect('/categorias');
    }

    res.render('categorias', {
      categorias: resultadoCategorias.rows,
      categoriaEdicao: resultadoEdicao.rows[0]
    });
  } catch (err) {
    console.error('Erro ao buscar categoria para edição:', err);
    res.status(500).send('Erro ao carregar categoria para edição.');
  }
});

// Salvar alterações da categoria
router.post('/editar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    await db.query(
      'UPDATE categorias SET nome = $1, descricao = $2 WHERE id = $3;',
      [nome, descricao || null, id]
    );

    res.redirect('/categorias');
  } catch (err) {
    console.error('Erro ao atualizar categoria:', err);
    res.status(500).send('Erro ao atualizar categoria.');
  }
});

// Excluir categoria
router.post('/excluir/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM categorias WHERE id = $1;', [id]);

    res.redirect('/categorias');
  } catch (err) {
    console.error('Erro ao excluir categoria:', err);
    if (err.code === '23503') {
      return res.status(400).send('Não é possível excluir uma categoria que possui produtos vinculados.');
    }
    res.status(500).send('Erro ao excluir categoria.');
  }
});

module.exports = router;