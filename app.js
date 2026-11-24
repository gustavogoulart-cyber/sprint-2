// app.js
const express = require('express');
const session = require('express-session'); // <--- 1. Importe o express-session
const path = require('path');
const app = express();
const PORT = 3000;
const db = require('./db');

// Configuração do motor de visualização (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Middlewares para ficheiros estáticos e dados de formulários (POST)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// <--- 2. Configure a sessão ANTES das rotas
app.use(session({
    secret: 'chave-secreta-do-sistema',
    resave: false,
    saveUninitialized: false
}));

// Importação das Rotas
const landingRoutes = require('./Routes/landingRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const produtosRoutes = require('./Routes/produtosRoutes');
const categoriasRoutes = require('./Routes/categoriasRoutes');
const usuariosRoutes = require('./Routes/usuariosRoutes');
const loginRoutes = require('./Routes/loginRoutes');

// Mapeamento das Rotas
app.use('/', landingRoutes);
app.use('/admin', adminRoutes);
app.use('/produtos', produtosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);

app.get('/dashboard', (req, res) => {
    res.send('Página do Dashboard');
});

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`⚡ Servidor a rodar em http://localhost:${PORT}`);
});