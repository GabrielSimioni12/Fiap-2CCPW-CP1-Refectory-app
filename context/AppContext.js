import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para evitar flash de tela de login

  // 1. CARREGAR DADOS AO INICIAR O APP
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@fiap_user');
        const storedOrders = await AsyncStorage.getItem('@fiap_orders');

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error("Erro ao carregar dados do storage", e);
      } finally {
        setLoading(false);
      }
    };
    loadStorageData();
  }, []);

  // 2. SALVAR DADOS AUTOMATICAMENTE QUANDO MUDAR O USER
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem('@fiap_user', JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem('@fiap_user');
        }
      } catch (e) { console.error(e); }
    };
    saveUser();
  }, [user]);

  // 3. SALVAR PEDIDOS AUTOMATICAMENTE QUANDO MUDAR O HISTÓRICO
  useEffect(() => {
    const saveOrders = async () => {
      try {
        await AsyncStorage.setItem('@fiap_orders', JSON.stringify(orders));
      } catch (e) { console.error(e); }
    };
    saveOrders();
  }, [orders]);

  const login = (userData) => setUser(userData);

  const logout = async () => {
    setUser(null);
    setCart([]);
    setOrders([]);
    try {
      await AsyncStorage.clear(); // Limpa tudo no logout por segurança
    } catch (e) { console.error(e); }
  };

  const addToCart = (item) => setCart((prev) => [...prev, item]);

  const decreaseQuantity = (id) => {
    setCart((prev) => {
      const index = prev.findIndex(item => item.id === id);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);
  const addOrder = (orderData) => setOrders((prev) => [orderData, ...prev]);

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, decreaseQuantity, removeFromCart, clearCart,
      user, login, logout,
      orders, addOrder,
      loading // Expondo o loading para o Layout se necessário
    }}>
      {children}
    </AppContext.Provider>
  );
};