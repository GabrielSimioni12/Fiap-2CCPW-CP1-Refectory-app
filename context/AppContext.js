import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Novo estado para gerenciar a sessão do usuário
  const [user, setUser] = useState(null);

  // --- Funções de Autenticação ---
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setCart([]); // Regra de negócio: limpa o carrinho por segurança ao sair
  };

  // --- Funções do Carrinho ---
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

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

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, decreaseQuantity, removeFromCart, clearCart,
      user, login, logout // Novas funções expostas para o app
    }}>
      {children}
    </AppContext.Provider>
  );
};