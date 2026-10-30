// Routes/categoriasRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../Dados/db');

router.get('/', (req, res) => {
  res.render('categorias', { categorias: db.categorias });
});

module.exports = router;