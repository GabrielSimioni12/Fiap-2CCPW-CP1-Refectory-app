import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]); // Lista de usuários cadastrados
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR DADOS AO INICIAR O APP
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        // Carrega usuários registrados, usuário logado e histórico de pedidos
        const storedRegistered = await AsyncStorage.getItem('@fiap_registered_users');
        const storedUser = await AsyncStorage.getItem('@fiap_user');
        const storedOrders = await AsyncStorage.getItem('@fiap_orders');

        if (storedRegistered) setRegisteredUsers(JSON.parse(storedRegistered));
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

  // 2. SALVAR USUÁRIO LOGADO AUTOMATICAMENTE
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem('@fiap_user', JSON.stringify(user));
        } else {
          // No logout, removemos apenas o usuário logado, não os cadastrados
          await AsyncStorage.removeItem('@fiap_user');
        }
      } catch (e) { console.error(e); }
    };
    saveUser();
  }, [user]);

  // 3. SALVAR PEDIDOS AUTOMATICAMENTE
  useEffect(() => {
    const saveOrders = async () => {
      try {
        await AsyncStorage.setItem('@fiap_orders', JSON.stringify(orders));
      } catch (e) { console.error(e); }
    };
    saveOrders();
  }, [orders]);

  // --- FUNÇÕES DE AUTENTICAÇÃO ---

  const register = async (newUser) => {
    try {
      // Verifica se o e-mail já existe
      const userExists = registeredUsers.find(u => u.email === newUser.email);
      if (userExists) return { success: false, message: 'Este e-mail já está cadastrado.' };

      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      await AsyncStorage.setItem('@fiap_registered_users', JSON.stringify(updatedUsers));
      return { success: true };
    } catch (e) {
      return { success: false, message: 'Erro ao salvar cadastro.' };
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  // --- FUNÇÕES DO CARRINHO ---

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

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      cart, user, orders, registeredUsers, loading,
      login, logout, register, 
      addToCart, decreaseQuantity, removeFromCart, clearCart, addOrder 
    }}>
      {children}
    </AppContext.Provider>
  );
};