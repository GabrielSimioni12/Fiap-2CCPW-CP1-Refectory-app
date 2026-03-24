import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function ProductCard({ item }) {
  const { addToCart } = useContext(AppContext);

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {/* Formatação nativa do JavaScript para Real Brasileiro */}
            {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => addToCart(item)}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra nativa para Android
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 100,
    backgroundColor: '#F0F0F0', // Fallback enquanto a imagem carrega
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#777',
    marginBottom: 10,
    height: 30, // Altura fixa para evitar quebra de alinhamento entre cards
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ED145B',
  },
  addButton: {
    backgroundColor: '#ED145B',
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});