import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import TabBar from '../components/TabBar';

export default function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart, user } = useContext(AppContext);
  const router = useRouter();
  const [selectedCantina, setSelectedCantina] = useState(null);

  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Lógica de Preço e Desconto
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const isProfessor = user?.perfil === 'professor';
  const desconto = isProfessor ? subtotal * 0.1 : 0;
  const total = subtotal - desconto;

  const handleCheckout = () => {
    if (!selectedCantina) {
      Alert.alert('Atenção', 'Selecione uma cantina para retirar seu pedido.');
      return;
    }
    
    Alert.alert(
      'Pedido Confirmado!',
      `Retirada na ${selectedCantina}\nTotal: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      [{ text: 'OK', onPress: () => { clearCart(); router.push('/home'); } }]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity style={styles.controlBtn} onPress={() => item.quantity === 1 ? removeFromCart(item.id) : decreaseQuantity(item.id)}>
          <Ionicons name={item.quantity === 1 ? "trash-outline" : "remove"} size={16} color="#ED145B" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.controlBtn} onPress={() => addToCart(item)}>
          <Ionicons name="add" size={16} color="#ED145B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Carrinho Vazio</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList data={groupedCart} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={{ padding: 15 }} />
          
          <View style={styles.checkoutSection}>
            <Text style={styles.sectionTitle}>Local de Retirada</Text>
            <View style={styles.cantinaSelector}>
              {['Cantina 5º Andar', 'Cantina 7º Andar'].map(c => (
                <TouchableOpacity key={c} style={[styles.cantinaOpt, selectedCantina === c && styles.cantinaOptActive]} onPress={() => setSelectedCantina(c)}>
                  <Text style={[styles.cantinaText, selectedCantina === c && styles.cantinaTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal:</Text>
              <Text>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>

            {isProfessor && (
              <View style={styles.priceRow}>
                <Text style={styles.discountLabel}>Desconto Professor (10%):</Text>
                <Text style={styles.discountLabel}>-{desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
              <Text style={styles.checkoutBtnText}>Finalizar Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: '#ED145B', height: 90, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  cartItem: { flexDirection: 'row', backgroundColor: '#FFF', padding: 10, borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  itemImage: { width: 50, height: 50, borderRadius: 8 },
  itemInfo: { flex: 1, marginLeft: 10 },
  itemName: { fontWeight: 'bold' },
  itemPrice: { color: '#ED145B' },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  controlBtn: { padding: 5, backgroundColor: '#F0F0F0', borderRadius: 5 },
  quantityText: { marginHorizontal: 10, fontWeight: 'bold' },
  checkoutSection: { backgroundColor: '#FFF', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#666', marginBottom: 10 },
  cantinaSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  cantinaOpt: { flex: 1, borderWeight: 1, borderColor: '#DDD', padding: 10, alignItems: 'center', borderRadius: 8, marginHorizontal: 2, borderWidth: 1 },
  cantinaOptActive: { backgroundColor: '#ED145B', borderColor: '#ED145B' },
  cantinaTextActive: { color: '#FFF' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  discountLabel: { color: '#2ecc71', fontWeight: 'bold' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 20, fontWeight: '900', color: '#ED145B' },
  checkoutBtn: { backgroundColor: '#ED145B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  checkoutBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#999' }
});