import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function ProductCard({ item }) {
  const { addToCart, favorites, toggleFavorite, theme } = useContext(AppContext);

  const isFavorite = favorites.some(f => f.id === item.id);

  const handleAdd = () => {
    addToCart(item);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Adicionado ao carrinho!', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.isDark ? '#FFF' : '#000' }]}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <TouchableOpacity style={styles.favoriteBtn} onPress={() => toggleFavorite(item)}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color={isFavorite ? theme.primary : "#FFF"} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.primary }]}>
          {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Ionicons name="add" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, padding: 10, marginRight: 15, width: 140, elevation: 2, marginBottom: 10 },
  imageContainer: { position: 'relative', marginBottom: 10 },
  image: { width: '100%', height: 100, borderRadius: 8, backgroundColor: '#F0F0F0' },
  favoriteBtn: { position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 15, padding: 4 },
  info: { marginBottom: 10 },
  name: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  price: { fontSize: 14, fontWeight: '900' },
  addButton: { backgroundColor: '#ED145B', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }
});