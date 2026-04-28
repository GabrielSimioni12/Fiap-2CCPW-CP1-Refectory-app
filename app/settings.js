import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Alert, ToastAndroid, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import TabBar from '../components/TabBar';

export default function Settings() {
  const { user, logout, orders, addToCart } = useContext(AppContext);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja encerrar a sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: () => {
            logout();
            router.replace('/');
          } 
        }
      ]
    );
  };

  // NOVA FUNÇÃO: Repetir Pedido
  const handleReorder = (orderItems) => {
    // Adiciona cada item do pedido antigo de volta ao carrinho
    orderItems.forEach(orderItem => {
      // Como o orderItem tem uma propriedade 'quantity', fazemos um loop para adicionar a quantidade certa
      for (let i = 0; i < orderItem.quantity; i++) {
        addToCart(orderItem);
      }
    });

    if (Platform.OS === 'android') {
      ToastAndroid.show('Itens adicionados ao carrinho!', ToastAndroid.SHORT);
    }
    
    // Leva o usuário direto para o carrinho
    router.push('/cart');
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options).replace(',', ' às');
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Pedido #{item.id}</Text>
        <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
      </View>
      
      <View style={styles.orderBody}>
        <View style={styles.orderRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.orderText}>{item.location}</Text>
        </View>
        <View style={styles.orderRow}>
          <Ionicons name="fast-food-outline" size={14} color="#666" />
          <Text style={styles.orderText}>
            {item.items.reduce((acc, curr) => acc + curr.quantity, 0)} iten(s)
          </Text>
        </View>
      </View>

      <View style={styles.orderFooter}>
        <View>
          <Text style={styles.orderTotalLabel}>Total Pago:</Text>
          <Text style={styles.orderTotalValue}>
            {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
        
        {/* NOVO BOTÃO DE REORDER */}
        <TouchableOpacity 
          style={styles.reorderBtn} 
          onPress={() => handleReorder(item.items)}
        >
          <Ionicons name="reload-outline" size={16} color="#FFF" />
          <Text style={styles.reorderText}>Pedir de Novo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil e Ajustes</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user?.nome?.substring(0, 2).toUpperCase() || 'UX'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{user?.nome || 'Usuário'}</Text>
                <Text style={styles.subText}>{user?.email || 'Sem e-mail cadastrado'}</Text>
                <View style={[styles.badge, { backgroundColor: user?.perfil === 'professor' ? '#2ecc71' : '#ED145B', marginTop: 8 }]}>
                  <Text style={styles.badgeText}>{user?.perfil?.toUpperCase() || 'ALUNO'}</Text>
                </View>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
              <Text style={styles.orderCount}>{orders.length} pedido(s)</Text>
            </View>

            {orders.length === 0 && (
              <View style={styles.emptyHistory}>
                <Ionicons name="receipt-outline" size={40} color="#DDD" />
                <Text style={styles.emptyHistoryText}>Nenhum pedido realizado nesta sessão.</Text>
              </View>
            )}
          </>
        }
        renderItem={renderOrderItem}
        ListFooterComponent={
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#FFF" />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        }
      />
      
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { height: 90, backgroundColor: '#FFF', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  profileCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, flexDirection: 'row', alignItems: 'center', elevation: 2, marginBottom: 25 },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#ED145B', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  info: { marginLeft: 20, flex: 1 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  subText: { color: '#777', fontSize: 14, marginTop: 2 },
  badge: { marginTop: 6, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', textTransform: 'uppercase' },
  orderCount: { fontSize: 13, color: '#999', fontWeight: 'bold' },
  emptyHistory: { backgroundColor: '#FFF', padding: 30, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EEE', borderStyle: 'dashed' },
  emptyHistoryText: { color: '#999', marginTop: 10, fontSize: 14 },
  orderCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 1, borderWidth: 1, borderColor: '#F0F0F0' },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F5F5F5', paddingBottom: 10, marginBottom: 10 },
  orderId: { fontWeight: 'bold', color: '#333', fontSize: 14 },
  orderDate: { color: '#888', fontSize: 12 },
  orderBody: { marginBottom: 12 },
  orderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  orderText: { color: '#555', fontSize: 13, marginLeft: 6 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8F9FA', padding: 10, borderRadius: 8 },
  orderTotalLabel: { fontSize: 13, fontWeight: 'bold', color: '#666' },
  orderTotalValue: { fontSize: 16, fontWeight: '900', color: '#ED145B' },
  
  // Estilo do novo botão
  reorderBtn: { backgroundColor: '#2ecc71', flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  reorderText: { color: '#FFF', fontWeight: 'bold', fontSize: 12, marginLeft: 5 },
  
  logoutBtn: { backgroundColor: '#ED145B', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 10, marginTop: 15, elevation: 2 },
  logoutText: { color: '#FFF', fontWeight: 'bold', marginLeft: 10, fontSize: 16 }
});