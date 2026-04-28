import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [xp, setXp] = useState(0); 
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true);

  // --- LÓGICA DO TEMA MANUAL E AUTOMÁTICO ---
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemTheme === 'dark');

  const theme = {
    background: isDark ? '#121212' : '#F8F9FA',
    card: isDark ? '#1E1E1E' : '#FFF',
    text: isDark ? '#FFFFFF' : '#333333',
    subText: isDark ? '#AAAAAA' : '#555555',
    border: isDark ? '#333333' : '#EEEEEE',
    primary: '#ED145B',
    success: '#2ecc71',
    isDark
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('@fiap_theme', newTheme ? 'dark' : 'light');
  };

  // 1. CARREGAR DADOS AO INICIAR A APLICAÇÃO
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedRegistered = await AsyncStorage.getItem('@fiap_registered_users');
        const storedUser = await AsyncStorage.getItem('@fiap_user');
        const storedOrders = await AsyncStorage.getItem('@fiap_orders');
        const storedXp = await AsyncStorage.getItem('@fiap_xp');
        const storedFavs = await AsyncStorage.getItem('@fiap_favorites'); 
        const storedTheme = await AsyncStorage.getItem('@fiap_theme'); 

        if (storedRegistered) setRegisteredUsers(JSON.parse(storedRegistered));
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
        if (storedXp) setXp(parseInt(storedXp) || 0);
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
        
        // Se já guardou um tema antes, usa-o. Senão, usa o do sistema.
        if (storedTheme) setIsDark(storedTheme === 'dark');
      } catch (e) {
        console.error("Erro ao carregar", e);
      } finally {
        setLoading(false);
      }
    };
    loadStorageData();
  }, []);

  // 2. GUARDAR DADOS COM PROTEÇÃO (!loading evita apagar os dados existentes)
  useEffect(() => {
    const saveUser = async () => {
      if (!loading) {
        if (user) await AsyncStorage.setItem('@fiap_user', JSON.stringify(user));
        else await AsyncStorage.removeItem('@fiap_user');
      }
    };
    saveUser();
  }, [user, loading]);

  useEffect(() => {
    if (!loading) AsyncStorage.setItem('@fiap_orders', JSON.stringify(orders));
  }, [orders, loading]);

  useEffect(() => {
    if (!loading) AsyncStorage.setItem('@fiap_xp', xp.toString());
  }, [xp, loading]);

  useEffect(() => {
    if (!loading) AsyncStorage.setItem('@fiap_favorites', JSON.stringify(favorites));
  }, [favorites, loading]);

  // --- FUNÇÕES GERAIS ---
  const addXp = (amount) => setXp(prev => prev + Math.floor(amount * 10));

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const isFav = prev.find(f => f.id === item.id);
      if (isFav) return prev.filter(f => f.id !== item.id);
      return [...prev, item]; 
    });
  };

  const register = async (newUser) => {
    try {
      const userExists = registeredUsers.find(u => u.email === newUser.email);
      if (userExists) return { success: false, message: 'Este e-mail já está cadastrado.' };
      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      await AsyncStorage.setItem('@fiap_registered_users', JSON.stringify(updatedUsers));
      return { success: true };
    } catch (e) { return { success: false, message: 'Erro.' }; }
  };

  const login = (userData) => setUser(userData);
  const logout = () => { setUser(null); setCart([]); };
  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const decreaseQuantity = (id) => {
    setCart((prev) => {
      const index = prev.findIndex(item => item.id === id);
      if (index !== -1) { const newCart = [...prev]; newCart.splice(index, 1); return newCart; }
      return prev;
    });
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);
  const addOrder = (newOrder) => setOrders((prev) => [newOrder, ...prev]);

  return (
    <AppContext.Provider value={{ 
      cart, user, orders, registeredUsers, loading, xp, favorites, theme,
      login, logout, register, addXp, toggleFavorite, toggleTheme,
      addToCart, decreaseQuantity, removeFromCart, clearCart, addOrder 
    }}>
      {children}
    </AppContext.Provider>
  );
};