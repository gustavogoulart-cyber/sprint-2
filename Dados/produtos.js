// Dados/produtos.js

const produtos = [
  {
    id: 1,
    nome: "Scooter Elétrica EcoVolt 1000W",
    categoriaId: 1, // Ex: Scooters
    categoriaNome: "Scooter Elétrica",
    preco: 7800.00,
    estoqueAtual: 12,
    estoqueMinimo: 5,
    autonomia: "45 km",
    velocidadeMaxima: "50 km/h",
    descricao: "Ideal para o dia a dia urbano, com bateria removível e carregamento rápido.",
    imagem: "/IMG/scooter-ecovolt.jpg",
    ativo: true
  },
  {
    id: 2,
    nome: "Moto Elétrica potente Run 3000W",
    categoriaId: 2, // Ex: Street / Esportiva
    categoriaNome: "Street / Urbana",
    preco: 15400.00,
    estoqueAtual: 3, // Abaixo do estoque mínimo!
    estoqueMinimo: 4,
    autonomia: "80 km",
    velocidadeMaxima: "85 km/h",
    descricao: "Alta potência para vias rápidas com design moderno e freios CBS.",
    imagem: "/IMG/urban-run.jpg",
    ativo: true
  },
  {
    id: 3,
    nome: "Ciclomotor Elétrico Cargo E-Delivery 1500W",
    categoriaId: 3, // Ex: Utilitária / Carga
    categoriaNome: "Carga / Trabalhadora",
    preco: 9200.00,
    estoqueAtual: 2, // Abaixo do estoque mínimo!
    estoqueMinimo: 3,
    autonomia: "60 km",
    velocidadeMaxima: "45 km/h",
    descricao: "Equipada com baú de carga traseiro, perfeita para entregas urbanas.",
    imagem: "/IMG/e-delivery.jpg",
    ativo: true
  }
];

// Registro de Movimentações de Estoque (Requisito Funcional)
const movimentacoes = [
  {
    id: 1,
    produtoId: 1,
    tipo: "entrada", // "entrada" (compra) ou "saida" (venda/uso)
    quantidade: 5,
    data: "2026-10-25 14:30",
    descricao: "Compra de lote com fornecedor VoltMotores",
    estoqueResultante: 12
  },
  {
    id: 2,
    produtoId: 2,
    tipo: "saida",
    quantidade: 1,
    data: "2026-10-26 10:15",
    descricao: "Venda realizada - Pedido #1042",
    estoqueResultante: 3
  }
];

module.exports = { produtos, movimentacoes };