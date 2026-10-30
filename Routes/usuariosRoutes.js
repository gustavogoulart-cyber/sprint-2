// Routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../Dados/db');

router.get('/', (req, res) => {
  res.render('usuarios', { usuarios: db.usuarios });
});

module.exports = router;