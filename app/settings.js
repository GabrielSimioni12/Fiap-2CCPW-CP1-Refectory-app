import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Alert, ToastAndroid, Platform, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import TabBar from '../components/TabBar';

export default function Settings() {
  // Puxamos as ferramentas do tema e o toggleTheme
  const { user, logout, orders, addToCart, xp, theme, toggleTheme } = useContext(AppContext);
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

  const handleReorder = (orderItems) => {
    orderItems.forEach(orderItem => {
      for (let i = 0; i < orderItem.quantity; i++) {
        addToCart(orderItem);
      }
    });
    
    if (Platform.OS === 'android') {
      ToastAndroid.show('Itens adicionados ao carrinho!', ToastAndroid.SHORT);
    }
    router.push('/cart');
  };

  const getRank = (currentXp) => {
    if (currentXp < 1000) return { name: 'Ferro', color: '#717171', next: 1000 };
    if (currentXp < 3000) return { name: 'Bronze', color: '#cd7f32', next: 3000 };
    if (currentXp < 7000) return { name: 'Prata', color: '#c0c0c0', next: 7000 };
    if (currentXp < 15000) return { name: 'Ouro', color: '#ffd700', next: 15000 };
    return { name: 'Platina', color: '#00ced1', next: null };
  };

  const rank = getRank(xp);
  const progress = rank.next ? (xp / rank.next) * 100 : 100;

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options).replace(',', ' às');
  };

  const renderOrderItem = ({ item }) => (
    <View style={[styles.orderCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.orderHeader, { borderBottomColor: theme.border }]}>
        <Text style={[styles.orderId, { color: theme.text }]}>Pedido #{item.id}</Text>
        <Text style={styles.orderDate}>{formatDate(item.date)}</Text>
      </View>
      
      <View style={styles.orderBody}>
        <View style={styles.orderRow}>
          <Ionicons name="location-outline" size={14} color={theme.subText} />
          <Text style={[styles.orderText, { color: theme.subText }]}>{item.location}</Text>
        </View>
        <View style={styles.orderRow}>
          <Ionicons name="fast-food-outline" size={14} color={theme.subText} />
          <Text style={[styles.orderText, { color: theme.subText }]}>
            {item.items.reduce((acc, curr) => acc + curr.quantity, 0)} iten(s)
          </Text>
        </View>
      </View>

      <View style={[styles.orderFooter, { backgroundColor: theme.background }]}>
        <View>
          <Text style={[styles.orderTotalLabel, { color: theme.subText }]}>Total Pago:</Text>
          <Text style={styles.orderTotalValue}>
            {item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.reorderBtn} onPress={() => handleReorder(item.items)}>
          <Ionicons name="reload-outline" size={16} color="#FFF" />
          <Text style={styles.reorderText}>Pedir de Novo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Perfil e Ajustes</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user?.nome?.substring(0, 2).toUpperCase() || 'UX'}</Text>
                </View>
                <View style={[styles.rankBadge, { backgroundColor: rank.color, borderColor: theme.card }]}>
                  <Text style={styles.rankBadgeText}>{rank.name}</Text>
                </View>
              </View>
              
              <View style={styles.info}>
                <Text style={[styles.name, { color: theme.text }]}>{user?.nome || 'Usuário'}</Text>
                <Text style={[styles.subText, { color: theme.subText }]}>{xp} XP Acumulados</Text>
                
                <View style={[styles.xpBarBackground, { backgroundColor: theme.border }]}>
                  <View style={[styles.xpBarFill, { width: `${Math.min(progress, 100)}%`, backgroundColor: rank.color }]} />
                </View>
                
                <Text style={[styles.nextLevelText, { color: theme.subText }]}>
                  {rank.next ? `Próximo Rank: ${rank.next} XP` : '🏆 RANK MÁXIMO ATINGIDO!'}
                </Text>
              </View>
            </View>

            {/* BOTÃO MODO ESCURO */}
            <View style={[styles.themeCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={theme.isDark ? "moon" : "sunny"} size={22} color={theme.text} />
                <Text style={[styles.themeTitle, { color: theme.text }]}>Modo Escuro</Text>
              </View>
              <Switch
                value={theme.isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#ED145B' }}
                thumbColor={theme.isDark ? '#FFF' : '#f4f3f4'}
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.subText }]}>Histórico de Pedidos</Text>
              <Text style={[styles.orderCount, { color: theme.subText }]}>{orders.length} pedido(s)</Text>
            </View>

            {orders.length === 0 && (
              <View style={[styles.emptyHistory, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Ionicons name="receipt-outline" size={40} color={theme.border} />
                <Text style={[styles.emptyHistoryText, { color: theme.subText }]}>Nenhum pedido realizado nesta sessão.</Text>
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
  container: { flex: 1 },
  header: { height: 90, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  
  profileCard: { padding: 20, borderRadius: 15, flexDirection: 'row', alignItems: 'center', elevation: 2, marginBottom: 15, borderWidth: 1 },
  avatarContainer: { alignItems: 'center' },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  rankBadge: { marginTop: -15, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, borderWidth: 2 },
  rankBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  info: { marginLeft: 20, flex: 1 },
  name: { fontSize: 20, fontWeight: 'bold' },
  subText: { fontSize: 13, marginTop: 2, fontWeight: 'bold' },
  xpBarBackground: { height: 6, borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  xpBarFill: { height: '100%' },
  nextLevelText: { fontSize: 10, marginTop: 4, fontWeight: 'bold' },

  // Estilo do cartão de Tema
  themeCard: { padding: 15, borderRadius: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 2, marginBottom: 25, borderWidth: 1 },
  themeTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
  orderCount: { fontSize: 13, fontWeight: 'bold' },
  emptyHistory: { padding: 30, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderStyle: 'dashed' },
  emptyHistoryText: { marginTop: 10, fontSize: 14 },
  
  orderCard: { borderRadius: 12, padding: 15, marginBottom: 15, elevation: 1, borderWidth: 1 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 },
  orderId: { fontWeight: 'bold', fontSize: 14 },
  orderDate: { fontSize: 12, color: '#888' },
  orderBody: { marginBottom: 12 },
  orderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  orderText: { fontSize: 13, marginLeft: 6 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 8 },
  orderTotalLabel: { fontSize: 13, fontWeight: 'bold' },
  orderTotalValue: { fontSize: 16, fontWeight: '900', color: '#ED145B' },
  reorderBtn: { backgroundColor: '#2ecc71', flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, elevation: 1 },
  reorderText: { color: '#FFF', fontWeight: 'bold', fontSize: 12, marginLeft: 5 },
  logoutBtn: { backgroundColor: '#ED145B', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 10, marginTop: 15, elevation: 2 },
  logoutText: { color: '#FFF', fontWeight: 'bold', marginLeft: 10, fontSize: 16 }
});