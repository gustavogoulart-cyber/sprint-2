-- ========================================================
-- ESTRUTURA DO BANCO DE DADOS (E-VOLT / MOTINHAS)
-- ========================================================

-- 1. Tabela de Categorias
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- 2. Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL DEFAULT 'operador',
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

-- 3. Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    categoria_id INT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    estoque_atual INT NOT NULL DEFAULT 0,
    estoque_minimo INT NOT NULL DEFAULT 0,
    autonomia VARCHAR(50),
    velocidade_maxima VARCHAR(50),
    descricao TEXT,
    imagem VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);

-- ========================================================
-- CARGA INICIAL DE DADOS (SEEDS)
-- ========================================================

-- Inserir Categorias
INSERT INTO categorias (id, nome, descricao) VALUES
(1, 'Scooter Elétrica', 'Modelos urbanos leves e práticos para deslocamento diário.'),
(2, 'Street / Urbana', 'Motos elétricas de maior potência para vias rápidas.'),
(3, 'Carga / Trabalhadora', 'Veículos equipados para logística e entregas pesadas.')
ON CONFLICT (id) DO NOTHING;

SELECT setval('categorias_id_seq', (SELECT MAX(id) FROM categorias));

-- Inserir Usuários
INSERT INTO usuarios (id, nome, email, senha, perfil, ativo) VALUES
(1, 'Administrador', 'admin@motinhas.com', '123', 'admin', true),
(2, 'Operador de Estoque', 'estoque@motinhas.com', '123', 'operador', true)
ON CONFLICT (id) DO NOTHING;

SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));

-- Inserir Produtos
INSERT INTO produtos (id, nome, categoria_id, preco, estoque_atual, estoque_minimo, autonomia, velocidade_maxima, descricao, imagem, ativo) VALUES
(1, 'Scooter Elétrica EcoVolt 1000W', 1, 7800.00, 12, 5, '45 km', '50 km/h', 'Ideal para o dia a dia urbano, com bateria removível de lítio.', '/IMG/scooter-ecovolt.jpg', true),
(2, 'Moto Elétrica Urban Run 3000W', 2, 15400.00, 3, 4, '80 km', '85 km/h', 'Alta potência para vias rápidas com design esportivo.', '/IMG/urban-run.jpg', true),
(3, 'Ciclomotor Cargo E-Delivery', 3, 9200.00, 2, 3, '60 km', '45 km/h', 'Equipada com baú de carga traseiro reforçado.', '/IMG/e-delivery.jpg', true)
ON CONFLICT (id) DO NOTHING;

SELECT setval('produtos_id_seq', (SELECT MAX(id) FROM produtos));