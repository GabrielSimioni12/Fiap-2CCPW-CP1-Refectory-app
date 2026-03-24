import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Função para adicionar itens ao carrinho
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ cart, addToCart, isDarkMode, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};