// Routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  res.render('login', { erro: null });
});

router.post('/autenticar', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const query = 'SELECT * FROM usuarios WHERE email = $1 AND senha = $2 AND ativo = true;';
    const resultado = await db.query(query, [email, senha]);

    if (resultado.rows.length > 0) {
      const usuario = resultado.rows[0];

      // Salva o usuário na sessão para as próximas rotas
      req.session.usuario = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      };

      // Vai direto para a tela de produtos/estoque
      return res.redirect('/produtos');
    } else {
      res.render('login', { erro: 'E-mail ou senha inválidos.' });
    }
  } catch (err) {
    console.error('Erro na autenticação:', err);
    res.render('login', { erro: 'Erro ao conectar à base de dados.' });
  }
});

module.exports = router;