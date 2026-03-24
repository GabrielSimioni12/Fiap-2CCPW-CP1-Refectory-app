import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { MENU_DATA, CANTINAS } from '../data/menuData';
import ProductCard from '../components/ProductCard';
import OccupancyCard from '../components/OccupancyCard';
import TabBar from '../components/TabBar';

export default function Home() {
  const [cantinasStatus, setCantinasStatus] = useState(CANTINAS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCantinasStatus(prevStatus => prevStatus.map(cantina => {
        const variacao = Math.floor(Math.random() * 11) - 5; 
        let novaOcupacao = cantina.ocupacao + variacao;
        
        if (novaOcupacao > 100) novaOcupacao = 100;
        if (novaOcupacao < 0) novaOcupacao = 0;
        
        let novoStatus = cantina.statusDetalhado;
        let novoTempo = cantina.tempoEspera;
        
        if (novaOcupacao > 75) {
          novoStatus = "Pico de movimento. Fila extensa.";
          novoTempo = "15-20 min";
        } else if (novaOcupacao > 40) {
          novoStatus = "Movimento moderado. Fila aceitável.";
          novoTempo = "8-12 min";
        } else {
          novoStatus = "Movimento tranquilo. Retirada rápida.";
          novoTempo = "3-5 min";
        }

        return { ...cantina, ocupacao: novaOcupacao, statusDetalhado: novoStatus, tempoEspera: novoTempo };
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cantina FIAP</Text>
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
                {/* O componente agora recebe todas as propriedades necessárias */}
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
    height: 90, 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    paddingBottom: 15,
  },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '800', letterSpacing: 0.5 },
  bannerImage: { width: '100%', height: 140, backgroundColor: '#DDD' },
  scrollContent: { paddingBottom: 100 },
  section: { marginTop: 25, paddingHorizontal: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#555', marginBottom: 15, textTransform: 'uppercase' },
  occupancyContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  occupancyWrapper: { width: '48%' },
  categoryTitle: { fontSize: 22, fontWeight: '800', color: '#333', marginBottom: 15 },
  horizontalList: { paddingRight: 15 }
});