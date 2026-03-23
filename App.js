import React from 'react';
import { StyleSheet, View, SectionList, SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Importando nossos arquivos internos
import { MENU_DATA, CANTINAS } from './src/data/menuData';
import OccupancyCard from './src/components/OccupancyCard';
import TabBar from './src/components/TabBar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FIAP GOURMET</Text>
      </View>

      {/* Lista Principal */}
      <SectionList
        sections={MENU_DATA}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        
        // Cabeçalho da Lista (Ocupação das Cantinas)
        ListHeaderComponent={() => (
          <View style={styles.occupancySection}>
            <Text style={styles.sectionLabel}>Status das Unidades</Text>
            <View style={styles.row}>
              {CANTINAS.map(c => (
                <OccupancyCard key={c.id} nome={c.nome} ocupacao={c.ocupacao} />
              ))}
            </View>
            <Text style={[styles.sectionLabel, { marginTop: 30 }]}>Cardápio do Dia</Text>
          </View>
        )}

        // Renderização das Categorias (Comidas/Bebidas)
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{title}</Text>
          </View>
        )}

        // Renderização dos Produtos
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>Disponível para retirada</Text>
            </View>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
        
        contentContainerStyle={styles.listContent}
      />

      {/* Menu Inferior Fixo */}
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    backgroundColor: '#ED145B', 
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 40 
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', letterSpacing: 1 },
  occupancySection: { padding: 20 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#999', marginBottom: 15, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  listContent: { paddingBottom: 100 },
  categoryContainer: { backgroundColor: '#F8F8F8', padding: 15, marginTop: 10 },
  categoryTitle: { fontSize: 18, fontWeight: 'bold', color: '#ED145B' },
  productItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  productName: { fontSize: 16, fontWeight: '500', color: '#333' },
  productDesc: { fontSize: 12, color: '#AAA', marginTop: 2 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#ED145B' }
});