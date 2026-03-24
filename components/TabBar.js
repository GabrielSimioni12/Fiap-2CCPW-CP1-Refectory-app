import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { AppContext } from '../context/AppContext';

export default function TabBar() {
  const { cart } = useContext(AppContext);
  const router = useRouter();
  const pathname = usePathname(); // Identifica a rota atual para colorir o ícone ativo

  const cartCount = cart.length;

  return (
    <View style={styles.navBar}>
      {/* Botão Início */}
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => router.push('/')}
        activeOpacity={0.7}
      >
        <Ionicons name="home" size={24} color={pathname === '/' ? "#ED145B" : "#666"} />
        <Text style={[styles.navText, { color: pathname === '/' ? '#ED145B' : '#666' }]}>Início</Text>
      </TouchableOpacity>
      
      {/* Botão Carrinho */}
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => router.push('/cart')}
        activeOpacity={0.7}
      >
        <View>
          <Ionicons name="cart-outline" size={24} color={pathname === '/cart' ? "#ED145B" : "#666"} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.navText, { color: pathname === '/cart' ? '#ED145B' : '#666' }]}>Carrinho</Text>
      </TouchableOpacity>

      {/* Botão Ajustes */}
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => router.push('/settings')}
        activeOpacity={0.7}
      >
        <Ionicons name="settings-outline" size={24} color={pathname === '/settings' ? "#ED145B" : "#666"} />
        <Text style={[styles.navText, { color: pathname === '/settings' ? '#ED145B' : '#666' }]}>Ajustes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    height: 85, 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingBottom: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, fontWeight: '600', marginTop: 5 },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: '#ED145B',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  }
});