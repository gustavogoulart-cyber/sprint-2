// Dados/usuarios.js

const usuarios = [
  {
    id: 1,
    nome: "Administrador",
    email: "admin@motinhas.com",
    senha: "1234", // Em ambiente de produção, utilize encriptação (ex: bcrypt)
    perfil: "admin"
  },
  {
    id: 2,
    nome: "Gestor de Estoque",
    email: "estoque@motinhas.com",
    senha: "1234",
    perfil: "operador"
  }
];

module.exports = usuarios;