import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  
  // Novo estado para armazenar o histórico de pedidos
  const [orders, setOrders] = useState([]); 

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setOrders([]); // Purga o histórico de pedidos local ao encerrar a sessão
  };

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

  // Função para injetar um pedido finalizado no início do vetor
  const addOrder = (orderData) => {
    setOrders((prevOrders) => [orderData, ...prevOrders]);
  };

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, decreaseQuantity, removeFromCart, clearCart,
      user, login, logout,
      orders, addOrder // Expondo as novas estruturas para o restante do sistema
    }}>
      {children}
    </AppContext.Provider>
  );
};