// Routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar usuários
router.get('/', async (req, res) => {
  try {
    const resultado = await db.query('SELECT id, nome, email, ativo FROM usuarios ORDER BY id ASC;');
    res.render('usuarios', {
      usuarios: resultado.rows,
      usuarioLogado: req.session?.usuario || null,
      usuarioEdicao: null
    });
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send('Erro ao carregar usuários.');
  }
});

// Cadastrar novo usuário
router.post('/', async (req, res) => {
  const { nome, email, senha, ativo } = req.body;
  const estaAtivo = ativo === 'true' || ativo === 'on' || ativo === true || ativo === undefined;

  try {
    await db.query(
      'INSERT INTO usuarios (nome, email, senha, ativo) VALUES ($1, $2, $3, $4);',
      [nome, email, senha, estaAtivo]
    );

    res.redirect('/usuarios');
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    res.status(500).send('Erro ao cadastrar usuário.');
  }
});

// Carregar formulário de edição de um usuário
router.get('/editar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todos = await db.query('SELECT id, nome, email, ativo FROM usuarios ORDER BY id ASC;');
    const buscado = await db.query('SELECT id, nome, email, ativo FROM usuarios WHERE id = $1;', [id]);

    if (buscado.rows.length === 0) {
      return res.redirect('/usuarios');
    }

    res.render('usuarios', {
      usuarios: todos.rows,
      usuarioLogado: req.session?.usuario || null,
      usuarioEdicao: buscado.rows[0]
    });
  } catch (err) {
    console.error('Erro ao buscar usuário para edição:', err);
    res.status(500).send('Erro ao carregar usuário para edição.');
  }
});

// Salvar alterações do usuário
router.post('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, ativo } = req.body;
  const estaAtivo = ativo === 'true' || ativo === 'on' || ativo === true;

  try {
    if (senha && senha.trim() !== '') {
      await db.query(
        'UPDATE usuarios SET nome = $1, email = $2, senha = $3, ativo = $4 WHERE id = $5;',
        [nome, email, senha, estaAtivo, id]
      );
    } else {
      await db.query(
        'UPDATE usuarios SET nome = $1, email = $2, ativo = $3 WHERE id = $4;',
        [nome, email, estaAtivo, id]
      );
    }

    res.redirect('/usuarios');
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).send('Erro ao atualizar usuário.');
  }
});

// Excluir usuário
router.post('/excluir/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM usuarios WHERE id = $1;', [id]);
    res.redirect('/usuarios');
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).send('Erro ao excluir usuário.');
  }
});

module.exports = router;