import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Adiciona um item ao carrinho
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove apenas UMA unidade do item (encontra o primeiro índice e corta)
  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(item => item.id === id);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  // Remove TODAS as unidades do item selecionado (filtra fora do array)
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  // Esvazia o carrinho completamente
  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};