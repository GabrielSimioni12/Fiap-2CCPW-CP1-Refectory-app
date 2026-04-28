import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { AppContext } from '../context/AppContext';

export default function TabBar() {
  const { cart, theme } = useContext(AppContext); // Lendo o tema!
  const router = useRouter();
  const pathname = usePathname(); 

  const cartCount = cart.length;

  return (
    <View style={[styles.navBar, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')} activeOpacity={0.7}>
        <Ionicons name="home" size={24} color={pathname === '/' ? theme.primary : theme.subText} />
        <Text style={[styles.navText, { color: pathname === '/' ? theme.primary : theme.subText }]}>Início</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/cart')} activeOpacity={0.7}>
        <View>
          <Ionicons name="cart-outline" size={24} color={pathname === '/cart' ? theme.primary : theme.subText} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.navText, { color: pathname === '/cart' ? theme.primary : theme.subText }]}>Carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/settings')} activeOpacity={0.7}>
        <Ionicons name="settings-outline" size={24} color={pathname === '/settings' ? theme.primary : theme.subText} />
        <Text style={[styles.navText, { color: pathname === '/settings' ? theme.primary : theme.subText }]}>Ajustes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: { position: 'absolute', bottom: 0, width: '100%', height: 85, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, paddingBottom: 15, elevation: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, fontWeight: '600', marginTop: 5 },
  badge: { position: 'absolute', right: -10, top: -5, backgroundColor: '#ED145B', borderRadius: 10, minWidth: 18, height: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFF', paddingHorizontal: 2 },
  badgeText: { color: '#FFF', fontSize: 9, fontWeight: 'bold' }
});