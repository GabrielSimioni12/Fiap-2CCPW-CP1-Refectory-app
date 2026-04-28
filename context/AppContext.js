import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [xp, setXp] = useState(0); // Estado de XP persistente
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR DADOS AO INICIAR O APP
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedRegistered = await AsyncStorage.getItem('@fiap_registered_users');
        const storedUser = await AsyncStorage.getItem('@fiap_user');
        const storedOrders = await AsyncStorage.getItem('@fiap_orders');
        const storedXp = await AsyncStorage.getItem('@fiap_xp');

        if (storedRegistered) setRegisteredUsers(JSON.parse(storedRegistered));
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
        if (storedXp) setXp(parseInt(storedXp) || 0);
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
        if (user) await AsyncStorage.setItem('@fiap_user', JSON.stringify(user));
        else await AsyncStorage.removeItem('@fiap_user');
      } catch (e) { console.error(e); }
    };
    saveUser();
  }, [user]);

  // 3. SALVAR PEDIDOS AUTOMATICAMENTE
  useEffect(() => {
    const saveOrders = async () => {
      try { await AsyncStorage.setItem('@fiap_orders', JSON.stringify(orders)); } 
      catch (e) { console.error(e); }
    };
    saveOrders();
  }, [orders]);

  // 4. SALVAR XP AUTOMATICAMENTE
  useEffect(() => {
    const saveXp = async () => {
      try { await AsyncStorage.setItem('@fiap_xp', xp.toString()); } 
      catch (e) { console.error(e); }
    };
    saveXp();
  }, [xp]);

  // --- LÓGICA DE GAMIFICAÇÃO ---
  const addXp = (amount) => setXp(prev => prev + Math.floor(amount * 10));

  // --- FUNÇÕES DE AUTENTICAÇÃO ---
  const register = async (newUser) => {
    try {
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

  const login = (userData) => setUser(userData);
  const logout = () => { setUser(null); setCart([]); };

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
  const addOrder = (newOrder) => setOrders((prev) => [newOrder, ...prev]);

  return (
    <AppContext.Provider value={{ 
      cart, user, orders, registeredUsers, loading, xp,
      login, logout, register, addXp,
      addToCart, decreaseQuantity, removeFromCart, clearCart, addOrder 
    }}>
      {children}
    </AppContext.Provider>
  );
};