export const MENU_DATA = [
  {
    title: "Salgados",
    data: [
      { id: "1", name: "Coxinha de Frango", price: 8.50, image: require('../assets/images/coxinha.png'), description: "Massa crocante e recheio cremoso" },
      { id: "2", name: "Pão de Queijo", price: 6.00, image: require('../assets/images/coxinha.png'), description: "Tradicional, assado na hora" }, // Mantido fallback da coxinha por não haver pao_queijo.png
      { id: "3", name: "Esfiha de Carne", price: 7.50, image: require('../assets/images/esfirra.png'), description: "Massa leve e recheio temperado" },
      { id: "4", name: "Enroladinho de Salsicha", price: 7.00, image: require('../assets/images/enroladinho.png'), description: "Assado e macio" },
      { id: "5", name: "Kibe Frito", price: 8.50, image: require('../assets/images/kibe.png'), description: "Com hortelã e carne moída" },
    ],
  },
  {
    title: "Lanches Quentes",
    data: [
      { id: "6", name: "Hambúrguer Clássico", price: 18.50, image: require('../assets/images/hamburguer.png'), description: "Blend bovino, queijo e salada" },
      { id: "7", name: "Misto Quente", price: 12.00, image: require('../assets/images/hamburguer.png'), description: "Pão de forma, presunto e queijo" }, // Fallback
      { id: "8", name: "Bauru", price: 14.00, image: require('../assets/images/bauru.png'), description: "Pão francês, rosbife, tomate e queijo" },
      { id: "9", name: "Sanduíche Natural", price: 15.00, image: require('../assets/images/sanduiche_natural.png'), description: "Pão integral, frango desfiado e cenoura" },
    ],
  },
  {
    title: "Snacks e Fitness",
    data: [
      { id: "10", name: "Barra de Proteína (Chocolate)", price: 12.50, image: require('../assets/images/barra_proteina_choc.png'), description: "15g de proteína" },
      { id: "11", name: "Barra de Proteína (Morango)", price: 12.50, image: require('../assets/images/barra_proteina_morango.png'), description: "15g de proteína" },
      { id: "12", name: "Barra de Whey (Cookies)", price: 16.00, image: require('../assets/images/barra_whey.png'), description: "Alta absorção, zero açúcar" },
      { id: "13", name: "Salada de Frutas", price: 10.00, image: require('../assets/images/salada_frutas.png'), description: "Frutas da estação com suco de laranja" },
      { id: "14", name: "Amendoim Japonês", price: 5.50, image: require('../assets/images/amendoim.png'), description: "Pacote 100g" },
    ],
  },
  {
    title: "Doces",
    data: [
      { id: "15", name: "Brigadeiro", price: 4.50, image: require('../assets/images/brigadeiro.png'), description: "Tradicional com granulado" },
      { id: "16", name: "Bolo de Cenoura", price: 9.00, image: require('../assets/images/bolo_cenoura.png'), description: "Com cobertura de chocolate" },
      { id: "17", name: "Brownie", price: 11.00, image: require('../assets/images/brownie.png'), description: "Com nozes, textura úmida" },
    ],
  },
  {
    title: "Bebidas Frias",
    data: [
      { id: "18", name: "Suco de Laranja 500ml", price: 10.00, image: require('../assets/images/sucos.png'), description: "Natural, feito na hora" },
      { id: "19", name: "Suco de Uva Integral", price: 12.00, image: require('../assets/images/suco_uva.png'), description: "Garrafa 300ml" },
      { id: "20", name: "Refrigerante Lata", price: 7.50, image: require('../assets/images/sucos.png'), description: "Cola, Guaraná ou Laranja" }, // Fallback
      { id: "21", name: "Água Mineral Sem Gás", price: 4.00, image: require('../assets/images/agua.png'), description: "Garrafa 500ml" },
      { id: "22", name: "Nescau Prontinho", price: 6.50, image: require('../assets/images/nescau.png'), description: "Caixinha 200ml" },
      { id: "23", name: "Energético", price: 15.00, image: require('../assets/images/energetico.png'), description: "Lata 250ml" },
    ],
  },
  {
    title: "Bebidas Quentes",
    data: [
      { id: "24", name: "Café Expresso", price: 5.00, image: require('../assets/images/cafe_leite.png'), description: "Grãos selecionados" }, // Fallback
      { id: "25", name: "Café com Leite", price: 6.50, image: require('../assets/images/cafe_leite.png'), description: "Copo médio" },
      { id: "26", name: "Cappuccino", price: 8.50, image: require('../assets/images/cappuccino.png'), description: "Com toque de canela e chocolate" },
    ],
  },
];

export const CANTINAS = [
  { 
    id: "1", 
    nome: "Cantina 5º Andar", 
    ocupacao: 85, 
    tempoEspera: "15-20 min", 
    statusDetalhado: "Pico de movimento. Fila extensa no momento." 
  },
  { 
    id: "2", 
    nome: "Cantina 7º Andar", 
    ocupacao: 25, 
    tempoEspera: "3-5 min", 
    statusDetalhado: "Movimento tranquilo. Ideal para retirada rápida." 
  },
];