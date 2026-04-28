import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { MENU_DATA, CANTINAS } from '../data/menuData';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import OccupancyCard from '../components/OccupancyCard';
import TabBar from '../components/TabBar';

export default function Home() {
  const { user, favorites, theme } = useContext(AppContext); // Lendo o tema!
  const router = useRouter();
  const [cantinasStatus, setCantinasStatus] = useState(CANTINAS);
  const [search, setSearch] = useState('');

  useEffect(() => { if (!user) router.replace('/'); }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCantinasStatus(prevStatus => prevStatus.map(cantina => {
        const variacao = Math.floor(Math.random() * 11) - 5; 
        let novaOcupacao = Math.min(Math.max(cantina.ocupacao + variacao, 0), 100);
        let novoStatus = "Movimento tranquilo. Retirada rápida.";
        let novoTempo = "3-5 min";
        if (novaOcupacao > 75) { novoStatus = "Pico de movimento. Fila extensa."; novoTempo = "15-20 min"; } 
        else if (novaOcupacao > 40) { novoStatus = "Movimento moderado. Fila aceitável."; novoTempo = "8-12 min"; }
        return { ...cantina, ocupacao: novaOcupacao, statusDetalhado: novoStatus, tempoEspera: novoTempo };
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredMenu = MENU_DATA.map(section => ({
    ...section, data: section.data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  })).filter(section => section.data.length > 0);

  if (!user) return null;

  return (
    // Fundo da tela principal adaptável
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style="light" /> 
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cantina FIAP</Text>
          <Text style={styles.welcomeText}>Olá, {user.nome.split(' ')[0]}!</Text>
        </View>

        <View style={styles.searchSection}>
          {/* Fundo da barra de pesquisa adaptável */}
          <View style={[styles.searchContainer, { backgroundColor: theme.card, shadowColor: theme.theme === 'dark' ? '#FFF' : '#000' }]}>
            <Ionicons name="search" size={20} color={theme.subText} style={styles.searchIcon} />
            <TextInput 
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Buscar salgados, bebidas..."
              placeholderTextColor={theme.subText}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={20} color={theme.subText} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {search.length === 0 && (
          <>
            <Image source={require('../assets/images/cantina.png')} style={styles.bannerImage} />
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.subText }]}>Status das Unidades</Text>
              <View style={styles.occupancyContainer}>
                {cantinasStatus.map(c => (
                  <View key={c.id} style={styles.occupancyWrapper}>
                    <OccupancyCard nome={c.nome} ocupacao={c.ocupacao} tempoEspera={c.tempoEspera} statusDetalhado={c.statusDetalhado} />
                  </View>
                ))}
              </View>
            </View>

            {favorites.length > 0 && (
              <View style={styles.section}>
                <View style={styles.favoriteHeader}>
                  <Ionicons name="heart" size={20} color="#ED145B" />
                  <Text style={[styles.categoryTitleFav, { color: theme.text }]}>Meus Favoritos</Text>
                </View>
                <FlatList data={favorites} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} renderItem={({ item }) => <ProductCard item={item} />} contentContainerStyle={styles.horizontalList} />
              </View>
            )}
          </>
        )}

        {filteredMenu.length > 0 ? (
          filteredMenu.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={[styles.categoryTitle, { color: theme.text }]}>{section.title}</Text>
              <FlatList data={section.data} keyExtractor={(item) => item.id} horizontal showsHorizontalScrollIndicator={false} renderItem={({ item }) => <ProductCard item={item} />} contentContainerStyle={styles.horizontalList} />
            </View>
          ))
        ) : (
          <View style={styles.emptySearch}>
            <Ionicons name="fast-food-outline" size={50} color={theme.border} />
            <Text style={[styles.emptySearchText, { color: theme.subText }]}>Nenhum produto encontrado.</Text>
          </View>
        )}
      </ScrollView>
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { backgroundColor: '#ED145B', height: 110, justifyContent: 'flex-end', paddingHorizontal: 20, paddingBottom: 25 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  welcomeText: { color: '#FFF', fontSize: 14, opacity: 0.9 },
  searchSection: { paddingHorizontal: 15, marginTop: -20 },
  searchContainer: { flexDirection: 'row', borderRadius: 12, paddingHorizontal: 15, height: 50, alignItems: 'center', elevation: 4, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  emptySearch: { alignItems: 'center', marginTop: 50 },
  emptySearchText: { marginTop: 10, fontSize: 16 },
  bannerImage: { width: '100%', height: 140, backgroundColor: '#DDD', marginTop: 15 },
  scrollContent: { paddingBottom: 100 },
  section: { marginTop: 25, paddingHorizontal: 15 },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 15, textTransform: 'uppercase' },
  occupancyContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  occupancyWrapper: { width: '48%' },
  categoryTitle: { fontSize: 22, fontWeight: '800', marginBottom: 15 },
  favoriteHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  categoryTitleFav: { fontSize: 22, fontWeight: '800', marginLeft: 8 },
  horizontalList: { paddingRight: 15 }
});