// Routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../Dados/db');

// Rota GET - Mostra a página de login
router.get('/', (req, res) => {
  res.render('login', { erro: null });
});

// Rota POST - Valida o login
router.post('/autenticar', (req, res) => {
  const { email, senha } = req.body;
  const usuario = db.usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    // 🔴 ATENÇÃO AQUI: Tem de ter a barra '/' no início!
    res.redirect('/dashboard'); 
  } else {
    res.render('login', { erro: 'E-mail ou senha inválidos.' });
  }
});

module.exports = router;