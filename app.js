const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração da sessão
app.use(session({
    secret: 'chave-secreta-do-sistema',
    resave: false,
    saveUninitialized: false
}));

// Importação das rotas
const landingRoutes = require('./Routes/landingRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const produtosRoutes = require('./Routes/produtosRoutes');
const categoriasRoutes = require('./Routes/categoriasRoutes');
const usuariosRoutes = require('./Routes/usuariosRoutes');
const loginRoutes = require('./Routes/loginRoutes');

// Rota de teste do dashboard
app.get('/teste-dashboard', (req, res) => {
    res.send('O servidor está funcionando corretamente!');
});

// Mapeamento das rotas
app.use('/', landingRoutes);
app.use('/admin', adminRoutes);
app.use('/produtos', produtosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
