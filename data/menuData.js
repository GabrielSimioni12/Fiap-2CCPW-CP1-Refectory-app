export const MENU_DATA = [
  {
    title: "Comidas",
    data: [
      { id: "1", name: "Coxinha de Frango", price: 8.50, image: require('../assets/images/coxinha.png'), description: "Massa crocante e recheio cremoso" },
      { id: "2", name: "Pão de Queijo", price: 6.00, image: require('../assets/images/coxinha.png'), description: "Tradicional e quentinho" },
      { id: "3", name: "Misto Quente", price: 12.00, image: require('../assets/images/hamburguer.png'), description: "Pão de forma, presunto e queijo" },
      { id: "4", name: "Hambúrguer FIAP", price: 18.50, image: require('../assets/images/hamburguer.png'), description: "Blend bovino, queijo e salada" },
    ],
  },
  {
    title: "Bebidas",
    data: [
      { id: "5", name: "Suco de Laranja 500ml", price: 10.00, image: require('../assets/images/sucos.png'), description: "Feito na hora" },
      { id: "6", name: "Refrigerante Lata", price: 7.50, image: require('../assets/images/sucos.png'), description: "Lata 350ml gelada" },
      { id: "7", name: "Café Expresso", price: 5.00, image: require('../assets/images/sucos.png'), description: "Grãos selecionados" },
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