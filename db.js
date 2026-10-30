const {Pool} = require ("pg");

const BD = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistema_estoque',
    password: 'admin',
    port: 5432
});

module.exports = BD;