import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import TabBar from '../components/TabBar';

export default function Cart() {
  const { cart } = useContext(AppContext);
  const router = useRouter();
  const [selectedCantina, setSelectedCantina] = useState(null);

  // Lógica para agrupar itens repetidos e somar quantidades
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Cálculo do valor total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!selectedCantina) {
      alert('Por favor, selecione uma cantina para retirar seu pedido.');
      return;
    }
    alert(`Pedido confirmado para retirada na ${selectedCantina}!\nTotal: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
      <View style={styles.quantityBox}>
        <Text style={styles.quantityText}>x{item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
      </View>

      {/* Renderização Condicional: Carrinho Vazio vs Com Itens */}
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#DDD" />
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <TouchableOpacity style={styles.returnButton} onPress={() => router.push('/')}>
            <Text style={styles.returnButtonText}>Ver Cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={groupedCart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          
          <View style={styles.checkoutSection}>
            <Text style={styles.sectionTitle}>Local de Retirada</Text>
            <View style={styles.cantinaSelector}>
              <TouchableOpacity 
                style={[styles.cantinaOption, selectedCantina === 'Cantina 5º Andar' && styles.cantinaOptionActive]}
                onPress={() => setSelectedCantina('Cantina 5º Andar')}
              >
                <Text style={[styles.cantinaText, selectedCantina === 'Cantina 5º Andar' && styles.cantinaTextActive]}>5º Andar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.cantinaOption, selectedCantina === 'Cantina 7º Andar' && styles.cantinaOptionActive]}
                onPress={() => setSelectedCantina('Cantina 7º Andar')}
              >
                <Text style={[styles.cantinaText, selectedCantina === 'Cantina 7º Andar' && styles.cantinaTextActive]}>7º Andar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
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
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#999', marginTop: 15, marginBottom: 25 },
  returnButton: { backgroundColor: '#ED145B', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 25 },
  returnButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  listContent: { padding: 15, paddingBottom: 20 },
  cartItem: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 10, marginBottom: 15, alignItems: 'center', elevation: 2 },
  itemImage: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#EEE' },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemPrice: { fontSize: 15, color: '#ED145B', marginTop: 5, fontWeight: '600' },
  quantityBox: { backgroundColor: '#F0F0F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  quantityText: { fontSize: 14, fontWeight: 'bold', color: '#555' },
  checkoutSection: { backgroundColor: '#FFF', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 15, paddingBottom: 110 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 10, textTransform: 'uppercase' },
  cantinaSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  cantinaOption: { flex: 1, borderWidth: 1, borderColor: '#DDD', paddingVertical: 12, alignItems: 'center', borderRadius: 8, marginHorizontal: 5 },
  cantinaOptionActive: { backgroundColor: '#ED145B', borderColor: '#ED145B' },
  cantinaText: { fontSize: 14, fontWeight: '600', color: '#777' },
  cantinaTextActive: { color: '#FFF' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 15 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 24, fontWeight: '900', color: '#ED145B' },
  checkoutButton: { backgroundColor: '#ED145B', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  checkoutButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});