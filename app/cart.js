import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import TabBar from '../components/TabBar';

export default function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart, user, addOrder, addXp, xp, theme } = useContext(AppContext);
  const router = useRouter();
  const [selectedCantina, setSelectedCantina] = useState(null);

  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) existingItem.quantity += 1;
    else acc.push({ ...item, quantity: 1 });
    return acc;
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const isProfessor = user?.perfil === 'professor';
  const isPlatina = xp >= 15000;
  const temDesconto = isProfessor || isPlatina; 
  const desconto = temDesconto ? subtotal * 0.1 : 0;
  const total = subtotal - desconto;

  const handleCheckout = () => {
    if (!selectedCantina) {
      Alert.alert('Atenção', 'Selecione uma cantina para retirar seu pedido.');
      return;
    }
    const newOrder = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      items: groupedCart,
      total: total,
      location: selectedCantina
    };
    addOrder(newOrder);
    addXp(total); 
    Alert.alert('Pedido Confirmado!', `Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, [{ text: 'OK', onPress: () => { clearCart(); router.push('/home'); } }]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.cartItem, { backgroundColor: theme.card }]}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
        <Text style={{ color: theme.primary }}>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity style={[styles.controlBtn, { backgroundColor: theme.border }]} onPress={() => item.quantity === 1 ? removeFromCart(item.id) : decreaseQuantity(item.id)}>
          <Ionicons name={item.quantity === 1 ? "trash-outline" : "remove"} size={16} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.quantityText, { color: theme.text }]}>{item.quantity}</Text>
        <TouchableOpacity style={[styles.controlBtn, { backgroundColor: theme.border }]} onPress={() => addToCart(item)}>
          <Ionicons name="add" size={16} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="light" />
      <View style={styles.header}><Text style={styles.headerTitle}>Meu Carrinho</Text></View>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}><Text style={{ color: theme.subText }}>Carrinho Vazio</Text></View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList data={groupedCart} keyExtractor={(item) => item.id.toString()} renderItem={renderItem} contentContainerStyle={{ padding: 15 }} />
          <View style={[styles.checkoutSection, { backgroundColor: theme.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.subText }]}>Local de Retirada</Text>
            <View style={styles.cantinaSelector}>
              {['Cantina 5º Andar', 'Cantina 7º Andar'].map(c => (
                <TouchableOpacity key={c} style={[styles.cantinaOpt, { borderColor: theme.border }, selectedCantina === c && { backgroundColor: theme.primary }]} onPress={() => setSelectedCantina(c)}>
                  <Text style={{ color: selectedCantina === c ? '#FFF' : theme.text }}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.priceRow}><Text style={{ color: theme.text }}>Subtotal:</Text><Text style={{ color: theme.text }}>{subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text></View>
            {temDesconto && (
              <View style={styles.priceRow}>
                <Text style={styles.discountLabel}>Desconto {isPlatina && !isProfessor ? 'Platina' : 'Professor'}:</Text>
                <Text style={styles.discountLabel}>-{desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
              </View>
            )}
            <View style={[styles.totalRow, { borderTopColor: theme.border }]}><Text style={[styles.totalLabel, { color: theme.text }]}>Total:</Text><Text style={styles.totalValue}>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text></View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}><Text style={styles.checkoutBtnText}>Finalizar Pedido</Text></TouchableOpacity>
          </View>
        </View>
      )}
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { backgroundColor: '#ED145B', height: 90, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  cartItem: { flexDirection: 'row', padding: 10, borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  itemImage: { width: 50, height: 50, borderRadius: 8 },
  itemInfo: { flex: 1, marginLeft: 10 },
  itemName: { fontWeight: 'bold' },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  controlBtn: { padding: 5, borderRadius: 5 },
  quantityText: { marginHorizontal: 10, fontWeight: 'bold' },
  checkoutSection: { padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  cantinaSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  cantinaOpt: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8, marginHorizontal: 2, borderWidth: 1 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  discountLabel: { color: '#2ecc71', fontWeight: 'bold' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderTopWidth: 1, paddingTop: 10 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 20, fontWeight: '900', color: '#ED145B' },
  checkoutBtn: { backgroundColor: '#ED145B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  checkoutBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});