import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function ProductCard({ item }) {
  const { addToCart } = useContext(AppContext);

  // Função encapsulada para adicionar ao carrinho e disparar o alerta
  const handleAdd = () => {
    addToCart(item);
    
    // Trava de segurança: O Toast nativo só existe no Android.
    // Isso evita que o app quebre se você testar no navegador (Web).
    if (Platform.OS === 'android') {
      ToastAndroid.show('Adicionado ao carrinho!', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>
          {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

      {/* O botão agora chama a nossa função handleAdd */}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Ionicons name="add" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    width: 140,
    elevation: 2, // Sombra para Android
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#F0F0F0', // Fundo caso a imagem demore a carregar
  },
  info: {
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#ED145B',
    fontWeight: '900',
  },
  addButton: {
    backgroundColor: '#ED145B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  }
});