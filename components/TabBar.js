import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabBar() {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={24} color="#ED145B" />
        <Text style={[styles.navText, { color: '#ED145B' }]}>Início</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="restaurant-outline" size={24} color="#666" />
        <Text style={styles.navText}>Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="settings-outline" size={24} color="#666" />
        <Text style={styles.navText}>Ajustes</Text>
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
    paddingBottom: 15
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, fontWeight: '600', marginTop: 5, color: '#666' }
});