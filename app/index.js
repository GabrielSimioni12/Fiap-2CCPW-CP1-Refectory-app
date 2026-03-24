import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { MENU_DATA, CANTINAS } from '../data/menuData';
import ProductCard from '../components/ProductCard';
import OccupancyCard from '../components/OccupancyCard';
import TabBar from '../components/TabBar';

export default function Home() {
  // Estado local para gerenciar a mutabilidade da ocupação
  const [cantinasStatus, setCantinasStatus] = useState(CANTINAS);

  // Simulação de Backend em Tempo Real
  useEffect(() => {
    const interval = setInterval(() => {
      setCantinasStatus(prevStatus => prevStatus.map(cantina => {
        // Variação aleatória entre -5% e +5%
        const variacao = Math.floor(Math.random() * 11) - 5; 
        let novaOcupacao = cantina.ocupacao + variacao;
        
        // Travas lógicas para manter entre 0 e 100%
        if (novaOcupacao > 100) novaOcupacao = 100;
        if (novaOcupacao < 0) novaOcupacao = 0;
        
        // Recálculo do status detalhado com base no novo número
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
    }, 10000); // Atualiza a cada 10 segundos

    return () => clearInterval(interval); // Limpeza de memória ao desmontar
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header e Banner */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Cantina FIAP</Text>
        </View>
        <Image 
          source={require('../assets/images/cantina.png')} 
          style={styles.bannerImage} 
        />

        {/* Módulo de Ocupação Dinâmica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status das Unidades</Text>
          <View style={styles.occupancyContainer}>
            {cantinasStatus.map(c => (
              <View key={c.id} style={styles.occupancyWrapper}>
                <OccupancyCard nome={c.nome} ocupacao={c.ocupacao} />
                <View style={styles.detailsBox}>
                  <Text style={styles.timeText}>Espera: {c.tempoEspera}</Text>
                  <Text style={styles.statusText}>{c.statusDetalhado}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Listagem Horizontal de Categorias (Estilo iFood) */}
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

      {/* Navegação Inferior */}
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
  bannerImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#DDD', // Fallback
  },
  scrollContent: { paddingBottom: 100 },
  section: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#555', marginBottom: 15, textTransform: 'uppercase' },
  occupancyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  occupancyWrapper: {
    width: '48%',
  },
  detailsBox: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 10,
    color: '#777',
    lineHeight: 14,
  },
  categoryTitle: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#333', 
    marginBottom: 15 
  },
  horizontalList: {
    paddingRight: 15, // Espaço extra no final da rolagem
  }
});