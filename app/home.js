import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router'; // Importar o roteador

import { MENU_DATA, CANTINAS } from '../data/menuData';
import { AppContext } from '../context/AppContext'; // Importar o contexto
import ProductCard from '../components/ProductCard';
import OccupancyCard from '../components/OccupancyCard';
import TabBar from '../components/TabBar';

export default function Home() {
  const { user } = useContext(AppContext);
  const router = useRouter();
  const [cantinasStatus, setCantinasStatus] = useState(CANTINAS);

  // LOGICA DE PROTEÇÃO: Se não houver usuário logado, expulsa para o Login
  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);

  // Atualização simulada de ocupação
  useEffect(() => {
    const interval = setInterval(() => {
      setCantinasStatus(prevStatus => prevStatus.map(cantina => {
        const variacao = Math.floor(Math.random() * 11) - 5; 
        let novaOcupacao = Math.min(Math.max(cantina.ocupacao + variacao, 0), 100);
        
        let novoStatus = "Movimento tranquilo. Retirada rápida.";
        let novoTempo = "3-5 min";
        
        if (novaOcupacao > 75) {
          novoStatus = "Pico de movimento. Fila extensa.";
          novoTempo = "15-20 min";
        } else if (novaOcupacao > 40) {
          novoStatus = "Movimento moderado. Fila aceitável.";
          novoTempo = "8-12 min";
        }

        return { ...cantina, ocupacao: novaOcupacao, statusDetalhado: novoStatus, tempoEspera: novoTempo };
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Se o user for null, não renderiza nada enquanto o useEffect faz o redirect
  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cantina FIAP</Text>
          <Text style={styles.welcomeText}>Olá, {user.nome.split(' ')[0]}!</Text>
        </View>

        <Image 
          source={require('../assets/images/cantina.png')} 
          style={styles.bannerImage} 
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status das Unidades</Text>
          <View style={styles.occupancyContainer}>
            {cantinasStatus.map(c => (
              <View key={c.id} style={styles.occupancyWrapper}>
                <OccupancyCard 
                  nome={c.nome} 
                  ocupacao={c.ocupacao} 
                  tempoEspera={c.tempoEspera}
                  statusDetalhado={c.statusDetalhado}
                />
              </View>
            ))}
          </View>
        </View>

        {MENU_DATA.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.categoryTitle}>{section.title}</Text>
            <FlatList
              data={section.data}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <ProductCard item={item} />}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        ))}
        
      </ScrollView>

      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { 
    backgroundColor: '#ED145B', 
    height: 110, 
    justifyContent: 'flex-end', 
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  welcomeText: { color: '#FFF', fontSize: 14, opacity: 0.9 },
  bannerImage: { width: '100%', height: 140, backgroundColor: '#DDD' },
  scrollContent: { paddingBottom: 100 },
  section: { marginTop: 25, paddingHorizontal: 15 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#555', marginBottom: 15, textTransform: 'uppercase' },
  occupancyContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  occupancyWrapper: { width: '48%' },
  categoryTitle: { fontSize: 22, fontWeight: '800', color: '#333', marginBottom: 15 },
  horizontalList: { paddingRight: 15 }
});