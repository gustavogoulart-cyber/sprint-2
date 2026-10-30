// Dados/db.js

const categorias = require('./categorias');
const usuarios = require('./usuarios');
const { produtos, movimentacoes } = require('./produtos');

module.exports = {
  categorias,
  usuarios,
  produtos,
  movimentacoes
};